import type { Request, Response } from "express";
import prisma from "../config/database.ts";
import { buildFilterQuery, resolveIndexColumn, getRiskLevel } from "../utils/filterQueryBuilder.ts";

export const fetchHeatmapData = async (filters: any) => {
    let where = buildFilterQuery(filters);

    // 🔹 STEP 1: Latest snapshot default
    if (!filters.year || !filters.month) {
        const latest = await prisma.derivedMetrics.findFirst({
            orderBy: [{ year: "desc" }, { month: "desc" }],
            select: { year: true, month: true }
        });

        if (latest) {
            where.year = latest.year;
            where.month = latest.month;
        }
    } 

    // 🔹 STEP 2: Resolve index column
    const indexColumn = resolveIndexColumn(filters.indexType);

    // 🔹 STEP 3: Group by district
    const rows = await prisma.derivedMetrics.groupBy({
        by: ["state", "district"],
        where,
        _avg: {
            [indexColumn]: true
        }
    });

    // 🔹 STEP 4: Shape response
    return rows.map(r => {
        const value = Number((r._avg as any)[indexColumn] || 0);

        return {
            state: r.state,
            district: r.district,
            value: Number(value.toFixed(3)),
            riskLevel: getRiskLevel(value)
        };
    });
};

export const getHeatmapData = async (req: Request, res: Response) => {
    const filters = req.query;

    const data = await fetchHeatmapData(filters);

    res.json({
        success: true,
        count: data.length,
        data
    });
};

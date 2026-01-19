import type { Request, Response } from "express";
import prisma from "../config/database.ts";
import { buildFilterQuery, resolveIndexColumn } from "../utils/filterQueryBuilder.ts";
import { resolveChartPreset } from "../utils/chartPresetResolver.ts";

interface VisualRequest {
  chartType: "line" | "bar" | "pie";
  context: "trend" | "comparison" | "distribution";
  filters: any;
}


export const generateVisualData = async ({
  chartType,
  context, 
  filters,
}: VisualRequest) => {

  // 🔵 STEP 3A — TREND (already added)
  if (context === "trend") {
    const where = buildFilterQuery(filters);

    const indexes = filters.indexes || [
      "demand_pressure",
      "operational_stress",
    ];

    const rows = await prisma.derivedMetrics.groupBy({
      by: ["year", "month"],
      where,
      _avg: indexes.reduce((acc: any, idx: string) => {
        acc[resolveIndexColumn(idx)] = true;
        return acc;
      }, {}),
      orderBy: [{ year: "asc" }, { month: "asc" }],
    });

    const labels = rows.map(r => `${r.month}/${r.year}`);

    const datasets = indexes.map((idx: string) => {
      const col = resolveIndexColumn(idx);
      return {
        label: idx.replace("_", " "),
        data: rows.map(r => Number((r._avg as any)[col] || 0)),
      };
    });

    return { labels, datasets };
  }

  // 🔵 STEP 3B — DISTRIBUTION (ADD THIS HERE)
  if (context === "distribution") {
    const where = buildFilterQuery(filters);

    const rows = await prisma.derivedMetrics.findMany({
      where,
      select: {
        compositeRiskScore: true,
      },
    });

    let normal = 0;
    let watch = 0;
    let critical = 0;

    rows.forEach(r => {
      if (r.compositeRiskScore >= 0.75) critical++;
      else if (r.compositeRiskScore >= 0.5) watch++;
      else normal++;
    });

    return {
      labels: ["Normal", "Watch", "Critical"],
      datasets: [
        {
          data: [normal, watch, critical],
        },
      ],
    };
  }

  // 🛑 Future contexts
  throw new Error(`Unsupported context: ${context}`);
};

export const getVisualAnalytics = async (req: Request, res: Response) => {
  const { chartType, context, filters } = req.body;

  if (!chartType || !context) {
    return res.status(400).json({
      success: false,
      message: "chartType and context are required",
    });
  }

  const chartData = await generateVisualData({
    chartType,
    context,
    filters,
  });

  const preset = resolveChartPreset(context);

  res.json({
    success: true,
    chartType,
    context,
    preset,
    data: chartData,
  });
};

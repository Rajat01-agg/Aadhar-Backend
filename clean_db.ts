
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function clean() {
    console.log("Cleaning database...");
    await prisma.alerts.deleteMany();
    await prisma.solutionFrameworks.deleteMany();
    await prisma.predictiveIndicators.deleteMany();
    await prisma.patternResults.deleteMany();
    await prisma.trendResults.deleteMany();
    await prisma.anomalyResults.deleteMany();
    await prisma.derivedMetrics.deleteMany();
    await prisma.baselineData.deleteMany();
    await prisma.aggregatedAadhaarMetric.deleteMany();
    await prisma.cleanedAadhaarRawData.deleteMany();
    await prisma.user.deleteMany();
    console.log("Database cleaned.");
}

clean()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

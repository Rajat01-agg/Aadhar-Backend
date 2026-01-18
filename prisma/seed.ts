import { PrismaClient, AlertType } from "@prisma/client";

const prisma = new PrismaClient();

async function seedUsers() {
    await prisma.user.createMany({
        data: [
            {
                email: "rajataggarwal20820@gmail.com",
                name: "System Admin",
                role: "admin",
                isActive: true,
            },
            {
                email: "officer@gov.in",
                name: "Central Officer",
                role: "officer",
                isActive: true,
            },
            {
                email: "analyst@gov.in",
                name: "Data Analyst",
                role: "analyst",
                isActive: true,
            },
            {
                email: "viewer@gov.in",
                name: "Viewer User",
                role: "viewer",
                isActive: true,
            },
        ],
        skipDuplicates: true,
    });
}

/* ===============================
   CLEANED RAW DATA
================================ */
async function seedCleanedRawData() {
    await prisma.cleanedAadhaarRawData.createMany({
        data: [
            {
                date: new Date("2025-01-15"),
                year: 2025,
                month: 1,
                state: "Delhi",
                district: "Central Delhi",
                pincode: "110001",
                metricCategory: "enrolment",
                ageGroup: "age_18_plus",
                count: 320,
                sourceBatchId: "seed_batch_2025_01",
            },
            {
                date: new Date("2025-01-15"),
                year: 2025,
                month: 1,
                state: "Uttar Pradesh",
                district: "Lucknow",
                pincode: "226001",
                metricCategory: "biometric_update",
                ageGroup: "age_18_plus",
                count: 210,
                sourceBatchId: "seed_batch_2025_01",
            },
        ],
    });
}

/* ===============================
   AGGREGATED METRICS
================================ */
async function seedAggregatedMetrics() {
    await prisma.aggregatedAadhaarMetric.createMany({
        data: [
            {
                year: 2025,
                month: 1,
                state: "Delhi",
                district: "Central Delhi",
                metricCategory: "enrolment",
                ageGroup: "age_18_plus",
                totalCount: 5200,
                sourceBatchId: "seed_batch_2025_01",
            },
            {
                year: 2025,
                month: 1,
                state: "Maharashtra",
                district: "Mumbai",
                metricCategory: "biometric_update",
                ageGroup: "age_18_plus",
                totalCount: 4300,
                sourceBatchId: "seed_batch_2025_01",
            },
        ],
    });
}

/* ===============================
   BASELINE DATA
================================ */
async function seedBaselineData() {
    await prisma.baselineData.createMany({
        data: [
            {
                state: "Delhi",
                district: "Central Delhi",
                metricCategory: "enrolment",
                ageGroup: "age_18_plus",
                baselineValue: 2800,
                lastUpdatedYear: 2024,
                lastUpdatedMonth: 12,
                baselineVersion: "v1",
            },
            {
                state: "Uttar Pradesh",
                district: "Lucknow",
                metricCategory: "biometric_update",
                ageGroup: "age_18_plus",
                baselineValue: 1900,
                lastUpdatedYear: 2024,
                lastUpdatedMonth: 12,
                baselineVersion: "v1",
            },
        ],
    });
}

/* ===============================
   DERIVED METRICS
================================ */
async function seedDerivedMetrics() {
    await prisma.derivedMetrics.createMany({
        data: [
            {
                year: 2025,
                month: 1,
                state: "Delhi",
                district: "Central Delhi",
                metricCategory: "enrolment",
                ageGroup: "age_18_plus",

                growthRate: 0.35,
                deviationFromBaseline: 0.42,
                spikeRatio: 1.48,
                volatility: 0.22,

                demandPressureIndex: 0.78,
                operationalStressIndex: 0.61,
                updateAccessibilityGap: 0.18,
                compositeRiskScore: 0.72,

                sourceBatchId: "seed_batch_2025_01",
            },
        ],
    });
}

/* ===============================
   ANOMALY RESULTS
================================ */
async function seedAnomalyResults() {
    await prisma.anomalyResults.createMany({
        data: [
            {
                year: 2025,
                month: 1,
                state: "Delhi",
                district: "Central Delhi",
                metricCategory: "enrolment",
                ageGroup: "age_18_plus",
                isAnomaly: true,
                anomalyScore: 0.91,
                anomalySeverity: "critical",
                anomalyConfidence: 0.89,
                sourceBatchId: "seed_batch_2025_01",
            },
        ],
    });
}

/* ===============================
   TREND RESULTS
================================ */
async function seedTrendResults() {
    await prisma.trendResults.createMany({
        data: [
            {
                year: 2025,
                month: 1,
                state: "Rajasthan",
                district: "Jaipur",
                metricCategory: "enrolment",
                ageGroup: "age_18_plus",
                trendDirection: "increasing",
                trendSlope: 0.27,
                trendStrength: 0.81,
                trendConfidence: 0.84,
                sourceBatchId: "seed_batch_2025_01",
            },
        ],
    });
}

/* ===============================
   PATTERN RESULTS
================================ */
async function seedPatternResults() {
    await prisma.patternResults.createMany({
        data: [
            {
                year: 2025,
                month: 1,
                state: "Bihar",
                district: "Patna",
                metricCategory: "enrolment",
                ageGroup: "age_18_plus",
                hasPattern: true,
                dominantPatternType: "seasonal",
                patternStrength: 0.76,
                patternConfidence: 0.80,
                sourceBatchId: "seed_batch_2025_01",
            },
        ],
    });
}

/* ===============================
   PREDICTIVE INDICATORS
================================ */
async function seedPredictiveIndicators() {
    await prisma.predictiveIndicators.createMany({
        data: [
            {
                year: 2025,
                month: 1,
                state: "Maharashtra",
                district: "Mumbai",
                metricCategory: "biometric_update",
                ageGroup: "age_18_plus",
                riskSignal: "likely_spike",
                riskScore: 0.74,
                predictionConfidence: 0.78,
                contributingFactors: "Consistent upward trend with rising volatility",
                sourceBatchId: "seed_batch_2025_01",
            },
        ],
    });
}

/* ===============================
   SOLUTION FRAMEWORKS
================================ */
async function seedSolutionFrameworks() {
    await prisma.solutionFrameworks.createMany({
        data: [
            {
                year: 2025,
                month: 1,
                state: "Delhi",
                district: "Central Delhi",
                metricCategory: "enrolment",
                ageGroup: "age_18_plus",
                frameworkType: "capacity_augmentation",
                frameworkConfidence: 0.83,
                rationale: "Sustained demand pressure and repeated anomalies detected",
                drivingIndexes: "demandPressureIndex, operationalStressIndex",
                predictiveSignal: "risk_building",
                sourceBatchId: "seed_batch_2025_01",
            },
        ],
    });
}

/* ===============================
   ALERTS
================================ */
async function seedAlerts() {
    await prisma.alerts.createMany({
        data: [
            {
                year: 2025,
                month: 1,
                state: "Delhi",
                district: "Central Delhi",
                alertType: AlertType.anomaly,
                severity: "critical",
                title: "Sudden enrolment spike",
                message: "Enrolment count exceeded baseline by 95%",
                confidenceScore: 0.92,
                sourceBatchId: "seed_batch_2025_01",
            },
            {
                year: 2025,
                month: 1,
                state: "Uttar Pradesh",
                district: "Lucknow",
                alertType: AlertType.accessibility_gap,
                severity: "high",
                title: "Low update accessibility",
                message: "Demographic updates significantly below expected level",
                confidenceScore: 0.87,
                sourceBatchId: "seed_batch_2025_01",
            },
        ],
    });
}

/* ===============================
   MAIN RUNNER
================================ */
async function main() {
    console.log("🌱 Seeding database (schema-accurate, lowercase enums)...");

    await seedUsers();
    await seedCleanedRawData();
    await seedAggregatedMetrics();
    await seedBaselineData();
    await seedDerivedMetrics();
    await seedAnomalyResults();
    await seedTrendResults();
    await seedPatternResults();
    await seedPredictiveIndicators();
    await seedSolutionFrameworks();
    await seedAlerts();

    console.log("✅ Database seeding completed successfully");
}

main()
    .catch((err) => {
        console.error("❌ Seeding failed", err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

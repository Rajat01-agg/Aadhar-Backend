import { Router } from "express";
import { authenticateJWT, requireMinimumRole, indiaOnlyAccess, apiRateLimiter } from "../middleware/auth.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { getVisualAnalytics } from "../controllers/analyticsController.js";

const router = Router();

/**
 * POST /analytics/visuals
 * Generate chart-ready data based on filters
 */
router.post(
  "/visuals",
  apiRateLimiter,
  indiaOnlyAccess,
  authenticateJWT,
  requireMinimumRole("viewer"),
  wrapAsync(getVisualAnalytics)
);

export default router;
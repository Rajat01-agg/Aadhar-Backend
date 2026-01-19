import { Router } from "express";
import { authenticateJWT, allowedRoles } from "../middleware/auth.ts";
import { wrapAsync } from "../utils/wrapAsync.ts";
import { getVisualAnalytics } from "../controllers/analyticsController.ts";

const router = Router();

/**
 * POST /analytics/visuals
 * Generate chart-ready data based on filters
 */
router.post(
  "/visuals",
  authenticateJWT,
//   allowedRoles(["ADMIN", "CENTRAL_OFFICER"]),
  wrapAsync(getVisualAnalytics)
);

export default router; 
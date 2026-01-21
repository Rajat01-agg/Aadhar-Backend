import { Router } from "express";
import { authenticateJWT, requireMinimumRole, indiaOnlyAccess, apiRateLimiter } from "../middleware/auth.js";
import { getHeatmapData } from "../controllers/heatmapController.js";
import { wrapAsync } from "../utils/wrapAsync.js";

const router = Router();

router.get(
  "/",
  apiRateLimiter,
  indiaOnlyAccess,
  authenticateJWT,
  requireMinimumRole("viewer"),
  wrapAsync(getHeatmapData)
);

export default router;
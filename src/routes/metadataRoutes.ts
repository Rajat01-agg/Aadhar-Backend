import { Router } from "express";
import { authenticateJWT, requireMinimumRole, indiaOnlyAccess, apiRateLimiter } from "../middleware/auth.js";
import { getDashboardFilters } from "../controllers/metadataController.js";
import { wrapAsync } from "../utils/wrapAsync.js";

const router = Router();

router.get(
  "/filters",
  apiRateLimiter,
  indiaOnlyAccess,
  authenticateJWT,
  requireMinimumRole("viewer"),
  wrapAsync(getDashboardFilters)
);

export default router;

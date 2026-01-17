import { Router } from "express";
import { authenticateJWT } from "../middleware/auth.ts";
import { getDashboardOverview, getStatesSummary, getDistrictsSummaryByState } from "../controllers/dashboardController.ts";
import { wrapAsync } from "../utils/wrapAsync.ts";

const router = Router();

router.get(
  "/overview",
  authenticateJWT,
  wrapAsync(getDashboardOverview)
);

router.get(
  "/states-summary",
  authenticateJWT,
  wrapAsync(getStatesSummary)
);

router.get(
  "/states/:stateName/districts-summary",
  authenticateJWT,
  wrapAsync(getDistrictsSummaryByState)
);


export default router;

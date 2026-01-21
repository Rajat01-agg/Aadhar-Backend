import { Router } from "express";
import { showAlerts, showAlertSummary, markAlertAsReadController, markAlertAsResolvedController } from "../controllers/alertsController.js";
import { authenticateJWT, requireMinimumRole, indiaOnlyAccess, apiRateLimiter } from "../middleware/auth.js";
import { wrapAsync } from "../utils/wrapAsync.js";

const router = Router();


router.post(
    "/",
    apiRateLimiter,
    indiaOnlyAccess,
    authenticateJWT,
    requireMinimumRole("viewer"),
    wrapAsync(showAlerts)
);


router.post(
    "/summary",
    apiRateLimiter,
    indiaOnlyAccess,
    authenticateJWT,
    requireMinimumRole("viewer"),
    wrapAsync(showAlertSummary)
);


router.patch(
    "/:id/read",
    apiRateLimiter,
    indiaOnlyAccess,
    authenticateJWT,
    requireMinimumRole("viewer"),
    wrapAsync(markAlertAsReadController)
);

router.patch(
    "/:id/resolved",
    apiRateLimiter,
    indiaOnlyAccess,
    authenticateJWT,
    requireMinimumRole("viewer"),
    wrapAsync(markAlertAsResolvedController)
);


export default router;
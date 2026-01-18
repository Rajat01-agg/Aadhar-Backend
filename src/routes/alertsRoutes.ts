import { Router } from "express";
import { showAlerts, showAlertSummary, markAlertAsReadController, markAlertAsResolvedController } from "../controllers/alertsController.ts";
import { authenticateJWT } from "../middleware/auth.ts";
import { wrapAsync } from "../utils/wrapAsync.ts";

const router = Router();


router.post(
    "/",
    authenticateJWT,
    wrapAsync(showAlerts)
);


router.post(
    "/summary",
    authenticateJWT,
    wrapAsync(showAlertSummary)
);


router.patch("/:id/read", authenticateJWT, wrapAsync(markAlertAsReadController));
router.patch("/:id/resolved", authenticateJWT, wrapAsync(markAlertAsResolvedController));


export default router;
            
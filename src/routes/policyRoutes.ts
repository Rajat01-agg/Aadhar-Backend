import { Router } from "express";
import { policyController, solutionFrameworkController } from "../controllers/policyController.js";
import { authenticateJWT, requireMinimumRole, indiaOnlyAccess, apiRateLimiter } from "../middleware/auth.js";
import { wrapAsync } from "../utils/wrapAsync.js";

const router = Router();

router.post(
    "/suggestions",
    apiRateLimiter,
    indiaOnlyAccess,
    authenticateJWT,
    requireMinimumRole("viewer"),
    wrapAsync(policyController)
);

router.post(
    "/frameworks",
    apiRateLimiter,
    indiaOnlyAccess,
    authenticateJWT,
    requireMinimumRole("viewer"),
    wrapAsync(solutionFrameworkController)
);

export default router;

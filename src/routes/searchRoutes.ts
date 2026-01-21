import { Router } from "express";
import { searchController } from "../controllers/searchController.js";
import { authenticateJWT, requireMinimumRole, indiaOnlyAccess, apiRateLimiter } from "../middleware/auth.js";
import { wrapAsync } from "../utils/wrapAsync.js";

const router = Router();

router.get(
    "/",
    apiRateLimiter,
    indiaOnlyAccess,
    authenticateJWT,
    requireMinimumRole("viewer"),
    wrapAsync(searchController)
);

export default router;
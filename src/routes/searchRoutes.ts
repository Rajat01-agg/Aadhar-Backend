import { Router } from "express";
import { searchController } from "../controllers/searchController.ts";
import { authenticateJWT } from "../middleware/auth.ts";
import { wrapAsync } from "../utils/wrapAsync.ts";

const router = Router();

router.get("/", authenticateJWT, wrapAsync(searchController));

export default router;
    
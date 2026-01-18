import { Router } from "express";
import { policyController, solutionFrameworkController } from "../controllers/policyController.ts";
import { authenticateJWT } from "../middleware/auth.ts";
import { wrapAsync } from "../utils/wrapAsync.ts";

const router = Router();

router.post("/suggestions", authenticateJWT, wrapAsync(policyController));
router.post("/frameworks", authenticateJWT, wrapAsync(solutionFrameworkController));

export default router;

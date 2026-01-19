import { Router } from "express";
import { authenticateJWT } from "../middleware/auth.ts";
import { getHeatmapData } from "../controllers/heatmapController.ts";
import { wrapAsync } from "../utils/wrapAsync.ts";

const router = Router();

router.get(
  "/",
  authenticateJWT,
  wrapAsync(getHeatmapData)
);

export default router;
 
// src/api/mlSync.routes.ts
import express from 'express';
import { triggerMLSync } from '../controllers/syncController.js';
import { authenticateJWT, requireMinimumRole, indiaOnlyAccess, apiRateLimiter } from '../middleware/auth.js';

const router = express.Router();

router.post(
  '/',
  apiRateLimiter,
  indiaOnlyAccess,
  authenticateJWT,
  requireMinimumRole("viewer"),
  triggerMLSync
);

export default router;

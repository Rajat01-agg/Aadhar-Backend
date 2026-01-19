// src/api/mlSync.routes.ts
import express from 'express';
import { triggerMLSync } from '../controllers/syncController.ts';
import { authenticateJWT, allowedRoles } from '../middleware/auth.ts';

const router = express.Router();

router.post(
  '/',
  authenticateJWT,
//   allowedRoles(['admin', 'analyst']),
  triggerMLSync
);

export default router;

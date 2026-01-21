import dotenv from 'dotenv';
dotenv.config();

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import './src/config/passport.js';
import './src/utils/syncWorker.js';
import authRoutes from './src/routes/authRoutes.js';
import { authenticateJWT } from './src/middleware/auth.js';
import metadataRoutes from './src/routes/metadataRoutes.js';
import dashboardRoutes from './src/routes/dashboardRoutes.js';
import heatmapRoutes from './src/routes/heatmapRoutes.js';
import analyticsRoutes from './src/routes/analyticsRoutes.js';
import alertsRoutes from './src/routes/alertsRoutes.js';
import searchRoutes from './src/routes/searchRoutes.js';
import policyRoutes from "./src/routes/policyRoutes.js";
import reportRoutes from "./src/routes/reportRoutes.js";
import syncRoutes from "./src/routes/syncRoutes.js";

const app = express();

// Allow PORT to be set via environment variable for Nginx load balancing
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use('/auth', authRoutes);
app.use('/metadata', metadataRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/heatmap', heatmapRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/alerts', alertsRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/policy', policyRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/sync', syncRoutes);

app.get('/', (req, res) => {
  res.json({
    message: '🚀 API is running!',
    port: PORT,
    processId: process.pid
  });
});

app.get('/api/secure', authenticateJWT, (req, res) => {
  res.json({ message: 'This is a protected route', user: (req as any).user });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT} (PID: ${process.pid})`);
});
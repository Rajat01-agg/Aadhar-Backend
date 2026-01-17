import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import './src/config/passport.ts';
import authRoutes from './src/routes/auth.routes.ts';
import { authenticateJWT } from './src/middleware/auth.ts';

const app = express();
const PORT = 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: '🚀 API is running!' });
});


app.get('/api/secure', authenticateJWT, (req, res) => {
  res.json({ message: 'This is a protected route', user: (req as any).user });
});


app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
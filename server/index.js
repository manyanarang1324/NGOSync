import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';
import healthRoutes from './routes/healthRoutes.js';
import authRoutes from './routes/authRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import seedRoutes from './routes/seedRoutes.js';
import demandRoutes from './routes/demandRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/seed', seedRoutes);
app.use('/api/demands', demandRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to NGOSync API',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      campaigns: '/api/campaigns',
      donations: '/api/donations',
      events: '/api/events',
    },
  });
});

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[NGOSync Backend] Running on http://localhost:${PORT}`);
});

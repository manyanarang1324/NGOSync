import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'NGOSync API Server',
    timestamp: new Date().toISOString(),
  });
});

export default router;

import { Router } from 'express';
import orderRoutes from './order.routes';

const router = Router();

router.use('/orders', orderRoutes);

router.get('/', (_req, res) => {
  res.json({
    message: 'Bienvenido a la API',
    version: '1.0.0',
    endpoints: {
      orders: '/api/orders',
      health: '/health',
    },
  });
});

export default router;

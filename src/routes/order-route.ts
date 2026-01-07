import { Router } from 'express';
import { createOrder, getOrders, deleteOrder, updateOrder } from '../controllers/order-controller';

const router = Router();

router.post('/orders', createOrder);        // Buat Order
router.get('/orders', getOrders);        // Lihat Keranjang
router.delete('/orders/:id', deleteOrder);  // Hapus Order
router.put('/orders/:id', updateOrder);     // Update Order

export default router;
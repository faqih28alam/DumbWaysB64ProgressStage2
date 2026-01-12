//supplier-route.ts
import { Router } from 'express';
import { 
    getSuppliers,
    createSupplier,
    updateSupplier,
    deleteSupplier,
    getStocks,
    updateStock,
} from '../controllers/supplier-controller';
import { validateStockUpdate } from '../middlewares/validateStockUpdate-middleware'
import { handleLoginSupplier } from '../controllers/auth-controller';
import { authMiddleware } from '../middlewares/auth-middleware';

const router = Router(); 

// Endpoint CRUD operations for Supplier
router.post('/supplier', createSupplier);       // Create a new supplier
router.get('/suppliers', getSuppliers);         // See all suppliers
router.put('/supplier/:id', updateSupplier);    // Update a supplier
router.delete('/supplier/:id', deleteSupplier); // Delete a supplier
// Endpoint stocks
router.get('/stocks', getStocks);                  // Get all stocks
router.post('/supplier/stocks', validateStockUpdate, updateStock); // Update stock for a supplier
// Endpont with JWT authentication
router.post('/suppliers/login', handleLoginSupplier);               // Supplier login
router.get('/suppliers/products', authMiddleware, (req, res) => {   // Protected route   
    res.json({ Message: "protected route" });
})

export default router;
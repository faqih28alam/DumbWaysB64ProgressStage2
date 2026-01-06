import express from "express";
import { getProducts, createProduct, deleteProduct, updateProduct } from "../controllers/product-controller";

const router = express.Router();

router.post('/product', createProduct);       // Buat Product
router.get('/products', getProducts);           // Lihat Product
router.delete('/products/:id', deleteProduct);  // Hapus Product
router.put('/products/:id', updateProduct);     // Update Product

export default router;
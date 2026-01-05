import express from "express";
import { getAllProducts, createProducts, deleteProduct, updateProduct } from "../controllers/product-controller";

const router = express.Router();

router.post('/products', createProducts);       // Buat Product
router.get('/products', getAllProducts);        // Lihat Product
router.delete('/products/:id', deleteProduct);  // Hapus Product
router.put('/products/:id', updateProduct);     // Update Product

export default router;
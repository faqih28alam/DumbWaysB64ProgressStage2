import express from "express";
import { getProducts, createProduct, deleteProduct, updateProduct } from "../controllers/product-controller";
import { addMultipleProducts } from "../controllers/product-controller";

const router = express.Router();

router.post('/product', createProduct);       // Buat Product
router.get('/products', getProducts);           // Lihat Product
router.delete('/product/:id', deleteProduct);  // Hapus Product
router.put('/product/:id', updateProduct);     // Update Product

router.post('/products/add', addMultipleProducts);

export default router;
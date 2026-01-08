// transferPoints-route.ts
import express from 'express';
import { transferPoints } from '../controllers/transferPoints-controller';
    
const router = express.Router();

// Route to handle point transfer between users
router.post('/transfer-points', transferPoints);

export default router;
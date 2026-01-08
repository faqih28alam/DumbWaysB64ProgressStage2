// transferPoints-route.ts
import express from 'express';
import { transferPoints, getUserPoints} from '../controllers/transferPoints-controller';
    
const router = express.Router();

// Route to handle point transfer between users
router.post('/users/transfer-points', transferPoints);
// Route to get user points by userId
router.get('/users/transfer-point/:userId', getUserPoints);

export default router;
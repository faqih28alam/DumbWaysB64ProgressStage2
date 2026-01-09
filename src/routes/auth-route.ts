// auth-route.ts
import express from 'express';
import { handleLogin, handleRegister } from '../controllers/auth-controller';
import { authMiddleware } from '../middlewares/auth-middleware';

const router = express.Router();

router.post('/login', handleLogin)
router.post('/register', handleRegister)

router.get('/me', authMiddleware, (req, res) => { 
    res.json({ Message: "protected route" });
});

export default router;
// auth-controller.ts
import { Request, Response } from 'express';
import { generateToken, userPayload } from '../utils/jwt';

// controller to handle user login
export const handleLogin = (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Dummy user for demonstration purposes
    const dummyUser = {
        id: 1,
        username: 'testuser',
        password: 'password123',
        role: 'user'
    };

    if (username === dummyUser.username && password === dummyUser.password) {
        const token = generateToken(dummyUser as userPayload);
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
    

};

// controller to handle user registration
export const handleRegister = (req: Request, res: Response) => {};
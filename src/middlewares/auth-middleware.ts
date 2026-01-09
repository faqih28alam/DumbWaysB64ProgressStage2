// auth-middleware.ts
// this middleware checks for a valid JWT token in the Authorization header
// wether the user is authenticated before allowing access to protected routes

import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]; // Expecting "Bearer <token>"
    // Check if token is provided
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    // If the token provided, Verify the token
    try {
        // Verify the token and extract user info
        const decoded = verifyToken(token);
        (req as any).user = decoded; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        // If token verification fails
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

}

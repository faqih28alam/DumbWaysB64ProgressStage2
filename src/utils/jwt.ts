// jwt.ts
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET as string || 'default_secret_key';

// Define the structure of the user payload
export interface userPayload {
    id: number;
    role: string;
}

// Function to generate a JWT token
export const generateToken = (payload: userPayload): string => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
}; 
// Function to verify a JWT token
export const verifyToken = (token: string): userPayload | null => {
    try {
        return jwt.verify(token, SECRET_KEY) as userPayload;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
};
// Function to decode a JWT token without verification
export const decodeToken = (token: string): object | null => {
    try {
        return jwt.decode(token) as object;
    }
    catch (error) {
        console.error('Token decoding failed:', error);
        return null;
    }
};

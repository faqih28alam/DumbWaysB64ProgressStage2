//transferPointsController.ts
import { Request, Response} from 'express';
import { prisma } from '../connection/client';
import AppError from '../utils/app-error';

// Controller function to handle point transfer between users
export const transferPoints = async (req: Request, res: Response, next: any) => {
    const { senderId, recipientId, amount } = req.body;         // amount to represent points to transfer
    console.log(amount, senderId, recipientId);                 // Log the amount, senderId, and recipientId

    try {
        // Check if amount is more than 0
        if (amount <= 0) { throw new AppError('Transfer amount must be greater than 0', 400); }
        // 1. Check user existence (sender & recipient)
        const [senderExists, recipientExists] = await Promise.all([
            prisma.user.findUnique({ where: {id: senderId} }),
            prisma.user.findUnique({ where: {id: recipientId} }),
        ]);

        // Check if sender exists
        if (!senderExists) { throw new AppError('Sender not found', 404); }
        // Check if recipient exists
        if (!recipientExists) { throw new AppError('Recipient not found', 404); }
        // Check if sender and recipient are the same
        if (senderId === recipientId) { throw new AppError('Cannot transfer points to yourself', 400); }
        
        // 2. Transaction (Atomic)
        await prisma.$transaction(async (tx) => {
            // Deduct points from sender
            const sender = await tx.user.update({
                where: {id: senderId},
                data: {points: {decrement: amount}},
            });

            // 3. Validate: Check if sender has enough point
            if (sender.points < 0) {
                throw new AppError('Insufficient points', 400);
            }

            // Add points to recipient
            const recipient = await tx.user.update({
                where: {id: recipientId},
                data: {points: {increment: amount}},
            });
        });

        // Respond with success message after Atomic transaction Done
        res.status(200).json({ 
            success: true,
            message: `Successfully transferred ${amount} points from User ${senderId} to User ${recipientId}` 
        });
    }catch (error) {
        next(error); // This sends the error to your global handler in app.ts
    } 
    
    
    // catch (error: any) {
    //     res.status(400).json({ 
    //         success: false,
    //         message: error.message || 'Point transfer failed'
    //     });
    // }

}

// Controller function to READ users points with end point /transfer-point/:userId
export const getUserPoints = async (req: Request, res: Response, next: any) => {
    try {
        const userId = parseInt(req.params.userId); // Get userId from request parameters
        // Fetch user by ID
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true, points: true }, // Select only the points field
        });

        // Check if user exists
        if (!user) { throw new AppError('User not found', 404);}

        // Respond with the user's points
        res.status(200).json({ 
            message: 'User points retrieved successfully',
            points: user.points });
    } catch (error) {
        next(error);
    }
}   
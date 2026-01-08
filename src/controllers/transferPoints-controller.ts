//transferPointsController.ts
import { request, response } from 'express';
import { prisma } from '../connection/client';

// Controller function to handle point transfer between users
export const transferPoints = async (req= request, res= response) => {
    // 
    const {amount, senderId, recipientId} = req.body;             // amoount to represent points to transfer
}
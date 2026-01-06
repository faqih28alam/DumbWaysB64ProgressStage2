import { request, response } from "express";
import { prisma } from "../connection/client";

// Controller function for CREATE user
export const createUser = async (req = request, res = response) => {
    try {    
        const { username, password } = req.body;
        const newUser = await prisma.users.create({
            data: {
                username,
                password
            }
        });
        res.status(201).json({
            message: 'User created successfully', 
            newUser});
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

// Controller function for GET users
export const getUsers = async (req = request, res = response) => {
    try {    
        // Simulate async operation, e.g., fetching from a database
        const fetchedUsers = await prisma.users.findMany();
        res.status(200).json({
            message: 'Users fetched successfully',
            fetchedUsers});
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};  

// Controller function for DELETE user
export const deleteUser = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const deletedUser = await prisma.users.delete({
            where: { id: Number(id) }
        });
        res.status(200).json({
            message: 'User deleted successfully', 
            deletedUser});
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

// Controller function for UPDATE user
export const updateUser = async (req = request, res = response) => {
    try {    
        const { id } = req.params;
        const { username, password } = req.body;
        const updatedUser = await prisma.users.update({
            where: { id: Number(id) },
            data: {
                username,
                password
            }
        });
        res.status(200).json({
            message: 'User updated successfully', 
            updatedUser});
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
};
import { request, response } from "express";
import { prisma } from "../connection/client";

// Controller function for CREATE post
export const createPost = async (req = request, res = response) => {
    try {
        const { title, content, author } = req.body;
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                author
            }
        });
        res.status(201).json({
            message: 'Post created successfully', 
            newPost});
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Failed to create post' });
    }
};

// Controller function to READ posts
export const getPosts = async(req = request, res = response) => {
    // Filter posts by user
    const { author } = req.query;
    try {
        const posts = await prisma.post.findMany({
            where: author ? { authorId: Number(author) } : {},
            include: { author: true } // to see who wrote it
        });    
        res.status(200).json({
            message: 'Posts fetched successfully',
            posts: posts});
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};

// Controller function for UPDATE post
export const updatePost = async (req = request, res = response) => {
    try {    
        const { id } = req.params;
        const { title, content, author } = req.body;
        const updatedPost = await prisma.post.update({
            where: { id: Number(id) },
            data: {
                title,
                content,
                author
            }
        });
        res.status(200).json({
            message: 'Post updated successfully', 
            updatedPost});
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Failed to update post' });
    }
};

// Controller function for DELETE post
export const deletePost = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const deletedPost = await prisma.post.delete({
            where: { id: Number(id) }
        });
        res.status(200).json({
            message: 'Post deleted successfully', 
            deletedPost});
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Failed to delete post' });
    }
};

// Controller function for READ comments on a specific post with Pagination
export const getCommentsByPost = async (req = request, res = response) => {
    const { id } = req.params;
    const limit = Number(req.query.limit) || 5; // Default to 5 per page
    const offset = Number(req.query.offset) || 1;   // Default to page 1

    try {
        const comments = await prisma.comment.findMany({
            where: { postId: Number(id) }, // Filter by Post ID
            take: limit,                   // Limit
            skip: (offset - 1) * limit,      // Offset calculation
            orderBy: { createdAt: 'desc' } // Newest comments first
        });

        res.status(200).json({
            message: 'Comments fetched successfully',
            offset,
            limit,
            comments
        });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
};
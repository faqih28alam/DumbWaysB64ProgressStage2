import { request, response } from "express";
import { posts, Post } from "../models/post-model";

export const getPosts = (req = request, res = response) => {
    res.json({
        ok: true,
        posts: posts
    });
}

export const createPosts = (req = request, res = response) => {
    const { title, content, author } = req.body;

    const newPost: Post = {
        id: posts.length + 1,
        title,
        content,
        author
    };

    posts.push(newPost);

    res.status(201).json(newPost);

    // res.json({
    //     ok: true,
    //     post: newPost
    // }); 
}
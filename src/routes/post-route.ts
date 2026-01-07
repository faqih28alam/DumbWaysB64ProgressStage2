import express from "express";
import { getPosts, createPost, updatePost, deletePost, getCommentsByPost } from "../controllers/post-controller";

const router = express.Router();

router.get("/posts", getPosts);
router.get("/post/:id/comments", getCommentsByPost);
router.post("/post", createPost);
router.put("/post/:id", updatePost);
router.delete("/post/:id", deletePost);


export default router;

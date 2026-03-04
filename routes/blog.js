import express from "express";
const router = express.Router();
import { createBlog, getBlogs, getBlog } from "../controllers/blogController.js";

router.post("/", createBlog);

router.get("/", getBlogs); 

router.get("/:slug", getBlog);

export default router;
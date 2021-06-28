import express from "express";
import { getBlogs, addBlog, updateBlog } from "../controller/blog.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/getBlogs", getBlogs);
router.post("/addBlog", auth, addBlog);
router.post("/updateBlog/:id", auth, updateBlog);

export default router;

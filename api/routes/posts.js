import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post.js";
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/", createPost);

//UPDATE
router.put("/:id", updatePost);

//DELETE
router.delete("/:id", deletePost);

//GET
router.get("/:id", getPost);

//GET ALL
router.get("/", getPosts);

export default router;

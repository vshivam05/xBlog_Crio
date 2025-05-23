import express from "express";

import {
  deletePost,
  updatePost,
  getPostById,
  getAllPosts,
  createPost,
} from "../controllers/postController.js";
import { VerifyToken } from "../middlewares/authMiddleware.js";
import { authorizePostOwnerOrAdmin } from "../middlewares/roleMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

import { likePost } from "../controllers/likeController.js";
import {
  addComment,
  getCommentsControllers,
  deleteCommentController,
} from "../controllers/commentController.js";

const router = express.Router();

// Create a new post
router.post("/", VerifyToken, upload.single("image"), createPost);

// Get all posts
router.get("/", VerifyToken, getAllPosts);

// Get a single post by ID
router.get("/:id", VerifyToken, getPostById);

// Update a post by ID

router.put("/:id", VerifyToken, upload.single("image"), updatePost);

// Delete a post by ID
router.delete("/:postId", VerifyToken, authorizePostOwnerOrAdmin, deletePost);

// Route for liking/unliking a post
router.post("/:id/like", VerifyToken, likePost);

// Route for adding a comment to a post
router.post("/:postId/comments", VerifyToken, addComment);

// Route for getting comments of a post
router.get("/:postId/comments", VerifyToken, getCommentsControllers);

// Route for deleting a comment
// router.delete(
//   "/comments/:commentId/",
//   VerifyToken,
//   authorizePostOwnerOrAdmin,
//   deleteCommentController
// );

export default router;

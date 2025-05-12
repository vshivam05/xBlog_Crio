// controllers/postController.js
import {
  addCommentService,
  getCommentsService,
  deleteCommentService,
} from "../service/commentService.js";

export const addComment = async (req, res) => {
  try {
    const { postId } = req.params; // Get post ID from URL params
    const { content } = req.body; // Get comment content from request body
    const userId = req.user.id; // Assuming req.user.id contains the logged-in user's ID

    const newComment = await addCommentService(postId, userId, content);
    res.status(201).json(newComment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding comment", error: error.message });
  }
};

export const getCommentsControllers = async (req, res) => {
  try {
    const { postId } = req.params; // Get post ID from URL params
    const comments = await getCommentsService({ postId });
    if (!comments) {
      return res.status(404).json({ message: "Comments not found" });
    }
    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching comments", error: error.message });
  }
};

export const deleteCommentController = async (req, res) => {
  console.log("from the delete comment controller", req.user.id);
  try {
    console.log("from the delete comment controller", req.user.id);
    const { commentId } = req.params; // Get comment ID from URL params
    const userId = req.user.id; // Assuming req.user.id contains the logged-in user's ID

    const deletedComment = await deleteCommentService(commentId, userId);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(deletedComment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting comment", error: error.message });
  }
};

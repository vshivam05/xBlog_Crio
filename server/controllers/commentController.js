// controllers/postController.js
// import { use } from "react";
import Comment from "../models/Comment.js"; // Import the Comment model
import Post from "../models/Post.js"; // Import the Post model
import {
  addCommentService,
  getCommentsService,
  deleteCommentService,
} from "../service/commentService.js";

export const addComment = async (req, res) => {
  try {
    const { postId } = req.params; // Get post ID from URL params
    const { text } = req.body; // Get comment content from request body
    const userId = req.user.id;
    console.log("from the add comment controller", text, userId, postId);
    // Assuming req.user.id contains the logged-in user's ID

    const newComment = await addCommentService(postId, userId, text);
    console.log("New comment added:", newComment);
    res.status(201).json({
      text: newComment.text,
      post: newComment.postId,
      author: newComment.author,
      _id: newComment._id,
      createdAt: newComment.createdAt,

      updatedAt: newComment.updatedAt,
      __v: newComment.__v,
    });
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

    console.log("Comments fetched: from controller", comments);
    res.status(200).json(
      comments.map((comment) => ({
        _id: comment._id,
        text: comment.text,
        post: comment.postId,
        author: comment.author,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        __v: comment.__v,
      }))
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching comments", error: error.message });
  }
};

export const deleteCommentController = async (req, res) => {
  // console.log("from the delete comment controller", req.user.id);
  // try {
  //   console.log("from the delete comment controller", req.user.id);
  //   const { commentId } = req.params; // Get comment ID from URL params
  //   const userId = req.user.id; // Assuming req.user.id contains the logged-in user's ID
  //   console.log(commentId, userId);
  //   const deletedComment = await deleteCommentService(commentId, userId);
  //   if (!deletedComment) {
  //     return res.status(404).json({ message: "Comment not found" });
  //   }
  //   res.status(200).json(deletedComment);
  // } catch (error) {
  //   res
  //     .status(500)
  //     .json({ message: "Error deleting comment", error: error.message });
  // }
  // console.log("from the delete comment controller", req.user.id);
  console.log("from the delete comment controller", req.params);
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // if (
    //   comment.author.toString() !== req.user._id.toString() &&
    //   req.user.role !== "admin"
    // ) {
    //   return res
    //     .status(403)
    //     .json({ message: "Not authorized to delete this comment" });
    // }

    const result = await comment.deleteOne();
    console.log(result);
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete comment", error: err.message });
  }
};

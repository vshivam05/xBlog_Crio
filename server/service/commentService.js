// service/commentService.js
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

export const addCommentService = async (postId, userId, content) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found");

  // Create a new comment
  const newComment = new Comment({
    postId,
    author: userId,
    content,
  });

  //   await newComment.save();

  //   // Add comment ID to the post's comments array
  //   post.comments.push(newComment._id);
  //   await post.save();
  const savedComment = await newComment.save();

  // Push the new comment to the Post's comment array
  await Post.findByIdAndUpdate(postId, {
    $push: { comments: savedComment._id },
  });

  return newComment; // Return the created comment
};

export const getCommentsService = async (postId) => {
  const comments = await Comment.find(postId)
    .populate("author", "name email role") // populate author details
    .lean(); // convert to plain JS object

  return comments;
};

export const deleteCommentService = async (commentId) => {
  const comment = await Comment.findByIdAndDelete(commentId);
  if (!comment) throw new Error("Comment not found");

  // Remove the comment ID from the post's comments array
  await Post.findByIdAndUpdate(comment.postId, {
    $pull: { comments: commentId },
  });

  return comment; // Return the deleted comment
};

// service/postService.js
import Post from "../models/Post.js";
import User from "../models/User.js";

export const likePostService = async (postId, userId) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found");

  const index = post.likes.indexOf(userId);
  if (index === -1) {
    post.likes.push(userId); // Like the post
  } else {
    post.likes.splice(index, 1); // Unlike the post
  }

  await post.save();
  return post; // Return the updated post
};

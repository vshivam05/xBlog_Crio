// services/postService.js

import Post from "../models/Post.js";

export const createPostService = async (data) => {
  return await Post.create(data);
};

export const getAllPostsService = async () => {
  return await Post.find().populate("author", "name");
};

// export const getPostByIdService = async (id) => {
//   return await Post.findById(id).populate("author", "name");
// };

export const getPostByIdService = async (postId) => {
  const post = await Post.findById(postId)
    .populate({
      path: "comments",
      populate: {
        path: "author", // this is the user who added the comment
        select: "name email", // select only required fields
      },
    })
    .populate("author", "name email role") // this is the blog author
    .lean();

  if (!post) throw new Error("Post not found");

  post.likeCount = post.likes?.length || 0;

  return post;
};

export const updatePostService = async (id, updatedData) => {
  return await Post.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
};

export const deletePostService = async (id) => {
  return await Post.findByIdAndDelete(id);
};

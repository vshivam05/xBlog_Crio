import User from "../models/User.js";
import Post from "../models/Post.js";

export const userInfo = async (id) => {
  const user = await User.findById(id).select("-password"); // Hide sensitive fields

  if (!user) {
    return null;
  }

  //   const postCount = await Post.countDocuments({ author: id });
  const postCount = await Post.countDocuments({ author: id });

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    postCount: postCount,
  };
};

export const updateUser = async (id, updatedData) => {
  const user = await User.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const getUserPosts = async (userId) => {
  const posts = await Post.find({ author: userId })
    .populate("author", "name email")
    .populate("comments", "text") // populate author details
    .lean(); // convert to plain JS object

  return posts;
};

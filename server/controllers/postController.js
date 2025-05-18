// controllers/postController.js

import {
  createPostService,
  getAllPostsService,
  getPostByIdService,
  updatePostService,
  deletePostService,
} from "../service/postService.js";

export const createPost = async (req, res) => {
  console.log("from create post controller", req.body);

  try {
    const { title, content, tags } = req.body;

    // Ensure tags is always an array
    const normalizedTags =
      typeof tags === "string"
        ? tags.split(",").map((tag) => tag.trim())
        : Array.isArray(tags)
        ? tags
        : [];

    // If image is uploaded through multipart form
    const imagePath = req.file?.path || req.body.image || "";

    const post = await createPostService({
      title,
      content,
      tags: normalizedTags,
      image: imagePath,
      author: req.user.id,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error creating post", error: error.message });
  }
};


export const getAllPosts = async (req, res) => {
  try {
    const posts = await getAllPostsService();
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    console.log(req.params);
    const post = await getPostByIdService(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json(post);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching post", error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const updatedPost = await updatePostService(req.params.id, req.body);

    if (!updatedPost)
      return res.status(404).json({ message: "Post not found" });

    res.status(200).json(updatedPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating post", error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    console.log("from the delete post controller", req.params.postId);
    const deletedPost = await deletePostService(req.params.postId);
    console.log("deleted post", deletedPost);

    if (!deletedPost)
      return res.status(404).json({ message: "Post not found" });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting post", error: error.message });
  }
};

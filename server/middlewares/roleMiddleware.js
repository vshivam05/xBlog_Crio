// import Post from "../models/Post.js"; // Adjust path as needed

// export const authorizePostOwnerOrAdmin = async (req, res, next) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     const isOwner = post.author.toString() === req.user.id;
//     const isAdmin = req.user.role === "admin";

//     if (!isOwner && !isAdmin) {
//       return res.status(403).json({ message: "Forbidden: Not authorized" });
//     }

//     next();
//   } catch (error) {
//     console.error("Authorization Error:", error.message);
//     return res.status(500).json({
//       message: "Server error while authorizing post access",
//       error: error.message,
//     });
//   }
// };

import Post from "../models/Post.js"; // Adjust path as needed

export const authorizePostOwnerOrAdmin = async (req, res, next) => {
  console.log(
    "from the authorize post owner or admin middleware",
    req.params.postId
  );
  try {
    const postId = req.params.postId;

    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const post = await Post.findById(postId);
    console.log("Fetched Post:", post);

    if (!post) {
      return res.status(404).json({ message: "Post not found from middleware" });
    }

    const isOwner = post.author.toString() === req.user.id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Forbidden: Not authorized" });
    }

    next();
  } catch (error) {
    console.error("Authorization Error:", error.message);
    return res.status(500).json({
      message: "Server error while authorizing post access",
      error: error.message,
    });
  }
};

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


// import Post from "../models/Post.js"; // Adjust if you use a separate Comment model

export const authorizeCommentOwnerOrAdmin = async (req, res, next) => {
  try {
    const commentId = req.params.commentId || req.params.id;

    if (!commentId) {
      return res.status(400).json({ message: "Comment ID is required" });
    }

    // Find the post that contains this comment
    const post = await Post.findOne({ "comments._id": commentId });

    if (!post) {
      return res.status(404).json({ message: "Comment not found in any post" });
    }

    // Extract the specific comment
    const comment = post.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const isOwner = comment.author.toString() === req.user.id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Forbidden: Not authorized to modify this comment" });
    }

    next();
  } catch (error) {
    console.error("Authorization Error:", error.message);
    return res.status(500).json({
      message: "Server error while authorizing comment access",
      error: error.message,
    });
  }
};

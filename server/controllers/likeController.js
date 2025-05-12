// controllers/postController.js
import { likePostService } from "../service/likePostService.js";

export const likePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user.id; // Assuming req.user.id contains the logged-in user's ID

    const updatedPost = await likePostService(postId, userId);
    res.status(200).json(updatedPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error liking/unliking post", error: error.message });
  }
};

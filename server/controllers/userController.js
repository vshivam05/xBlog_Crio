// userController.js
import { userInfo, getUserPosts } from "../service/userService.js";
import User from "../models/User.js";
export const userInfoController = async (req, res) => {
  try {
    // const user = await User.findById(req.user.id).select("-password"); // hide password
    console.log(
      "from the user controller to see the current user id",
      req.user.id
    );
    const user = await userInfo(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

export const UserPostsController = async (req, res) => {
  // console.log("from the user posts", req.user.id);
  try {
    const userposts = await getUserPosts(req.user.id);

    if (!userposts) {
      return res.status(404).json({ message: "User posts not found" });
    }
    res.status(200).json(userposts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user posts", error: error.message });
  }
};

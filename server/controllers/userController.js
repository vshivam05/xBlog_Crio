// userController.js
import { userInfo, getUserPosts } from "../service/userService.js";
import User from "../models/User.js";
export const userInfoController = async (req, res) => {
  try {
    // const user = await User.findById(req.user.id).select("-password"); // hide password
    console.log(
      "from the get user details controller to see the current user id",
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

// import User from '../models/userModel.js'; // Adjust path to your model

export const updateUserController = async (req, res) => {
  console.log("from the update user controller", req.body);
  try {
    // Step 1: Find the user by ID (assuming req.user contains the user ID)
    const user = await User.findById(req.user.id); // or req.params.id if you pass id as a route parameter
    console.log("user", req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 2: Extract the new name and avatar from the request body
    const { name } = req.body;
    console.log("name", req.body);

    // Step 3: Update the user fields
    if (name) user.name = name;
    // if (avatar) user.avatar = avatar;

    // Step 4: Save the updated user document
    await user.save();

    // Step 5: Respond with the updated user details
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update user profile" });
  }
};

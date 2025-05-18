import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js"; // Import the Comment model
dotenv.config();

async function resetDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Clear all users and posts
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    // Create a test user
    const user = await User.create({
      name: "Test User",
      email: "test@example.com",
      avatar: "https://example.com/avatar.png",
      password: "test@123", // ✅ Required field added
    });

    // Create one post for that user
    //   await Post.create({
    //   title: "Test Post",
    //   content: "Sample content",
    //   author: user._id, // ✅ Fix: set author to the test user's ID
    // });

    console.log("✅ Database reset and seeded successfully.");
    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error resetting database:", error);
    process.exit(1);
  }
}

resetDB();

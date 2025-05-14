import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // User model
import admin from "../utils/firebase.js";
// import { verifyGoogleToken } from "../utils/firebase.js"; // Utility to verify Firebase ID token
// import { uploadImageToCloudinary } from "../utils/cloudinary.js"; // Optional: avatar support

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Register user
export const register = async ({ name, email, password, avatar }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  //   let avatarUrl = null;
  //   if (avatar) {
  //     avatarUrl = await uploadImageToCloudinary(avatar, "avatars");
  //   }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    avatar: avatar,
    role: "user",
  });

   const token = generateToken(user);
  return { user: formatUser(user), token };
};

// Login user
export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  // console.log("from service", isMatch, user.password, password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken(user);
  return { user: formatUser(user), token };
};

// Google login

export const GoogleLogin = async (idToken) => {
  try {
    // Verify the Google ID token
    const googleUser = await admin.auth().verifyIdToken(idToken); // Changed to verifyIdToken
    // console.log("Google User:", googleUser);

    if (!googleUser.email_verified) {
      throw new Error("Email not verified by Google");
    }

    // Find the user in your database
    let user = await User.findOne({ email: googleUser.email });
    // console.log("User found:", user);

    if (!user) {
      // If user doesn't exist, create a new user

      user = await User.create({
        name: googleUser.name,
        email: googleUser.email,
        avatar: googleUser.picture,
        password: await bcrypt.hash(Date.now().toString(), 10), // dummy password
        role: "user",
      });
      console.log("New user created:", user);
    }

    // Generate a token for the user
    // console.log("User ID:", user._id);
    const token = generateToken(user);
    return { user: formatUser(user), token };
  } catch (error) {
    console.error("Google login error:", error);
    throw new Error("Google login failed");
  }
};

// Utility to return user info (excluding password)
const formatUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  role: user.role,
});

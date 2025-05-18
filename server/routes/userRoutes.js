// userRoutes.js
import express from "express";
import {
  userInfoController,
  UserPostsController,
  updateUserController,
  getUserProfileById,
} from "../controllers/userController.js";
import { VerifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.put("/me", VerifyToken, updateUserController);
router.get("/me", VerifyToken, userInfoController);
router.get("/me/posts", VerifyToken, UserPostsController);

router.get("/:id", getUserProfileById);
export default router;

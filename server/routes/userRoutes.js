// userRoutes.js
import express from "express";
import {
  userInfoController,
  UserPostsController,updateUserController
} from "../controllers/userController.js";
import { VerifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.put("/me", VerifyToken, updateUserController);
router.get("/", VerifyToken, userInfoController);
router.get("/posts", VerifyToken, UserPostsController);

export default router;

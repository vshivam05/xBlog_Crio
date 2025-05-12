// userRoutes.js
import express from "express";
import {
  userInfoController,
  UserPostsController,
} from "../controllers/userController.js";
import { VerifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/", VerifyToken, userInfoController);
router.get("/posts", VerifyToken, UserPostsController);
export default router;

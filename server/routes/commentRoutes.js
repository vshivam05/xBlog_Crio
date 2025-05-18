import express from "express";

const router = express.Router();
import { VerifyToken } from "../middlewares/authMiddleware.js";
import {
  //   addComment,
  //   getCommentsControllers,
  deleteCommentController,
} from "../controllers/commentController.js";
import { authorizeCommentOwnerOrAdmin } from "../middlewares/roleMiddleware.js";

router.delete(
  "/:commentId",
  VerifyToken,
  
  deleteCommentController
);

export default router;

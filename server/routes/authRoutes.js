import express from "express";
import { Register, Login ,
    googleLogin
 } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/google-login", googleLogin);

export default router;

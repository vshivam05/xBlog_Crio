import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js"; // Assuming you have a postRoutes.js file
// import admin from "./config/firebaseAdmin.js";
import commentRoutes from "./routes/commentRoutes.js"; // Assuming you have a commentRoutes.js file
import path from "path";

import { fileURLToPath } from "url";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// app.use(cors("*"));
app.use(cors({ origin: "*" })); // ✅ allows all origins

app.use(express.json());
// app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;

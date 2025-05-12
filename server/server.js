import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();
import app from "./app.js";
import { createDefaultAdmin } from "./config/adminSeeder.js";

// var bool=false
connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  if (process.env.NODE_ENV !== "production") {
    createDefaultAdmin();
  }
  console.log(`Server is running on port ${PORT}`);
});

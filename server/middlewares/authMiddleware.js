import jwt from "jsonwebtoken";

export const VerifyToken = (req, res, next) => {
  let authHeader = req.headers["authorization"] || req.headers["Authorization"];

  // console.log("from the auth middleware", authHeader);
  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json("No token, Access denied");
    }
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("from the middleware", verified);
      req.user = verified;
      next();
    } catch {
      res.status(400).json("Invalid token");
    }
  } else {
    res.status(401).json("No token, Access denied");
  }
};

// Google auth middleware

import admin from "firebase-admin";

// Initialize Firebase Admin once at the top level of your server file (if not already done)
// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.applicationDefault(), // or use cert() with service account
//   });
// }

export const verifyGoogleToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  // Check if header exists and starts with Bearer
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Unauthorized");
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Contains uid, email, name, picture if available
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).send("Unauthorized");
  }
};

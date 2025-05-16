import React, { useState } from "react";
import { register, Api } from "../api";
import { auth, provider } from "../utils/Firebase";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/dfteatpco/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "shivam";

const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (event) => {
    const { id, type, value, files } = event.target;
    setData((prevData) => ({
      ...prevData,
      [id]: type === "file" ? files[0] : value,
    }));
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Cloudinary response:", data.secure_url);
    return data.secure_url;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let avatarUrl = "";

    try {
      setUploading(true);
      if (data.avatar) {
        avatarUrl = await uploadImageToCloudinary(data.avatar);
      }

      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        avatar: avatarUrl,
      };

      const response = await register(payload);
      console.log("register user Backend Response:", response);
      const { token, user } = response;
      console.log("Registration data sent:", payload);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const Guser = response.user;
      const googleId = await Guser.getIdToken();

      const userData = {
        name: Guser.displayName,
        email: Guser.email,
        avatar: Guser.photoURL,
        role: "user",
      };

      const res = await axios.post(`${Api}/api/auth/google-login`, userData);
      console.log("Google User  after signup:", res.data);
      const { token, user } = res.data;
      // console.log(res.data.user);
      console.log("Response from Google signup:", token, user);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/");
      // console.log("Gooogle SignUp data", res.data);
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="bg-gray-900 p-8 rounded-md w-96 mx-auto my-12 text-gray-300">
      <h2 className="text-center text-purple-400 text-2xl font-semibold mb-6">
        Sign Up
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="p-2 shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-700 rounded-md bg-white-800 text-gray-300"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="p-2 shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-700 rounded-md bg-white-800 text-gray-300"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            className="p-2 shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-800 text-gray-300"
          />
        </div>
        <div>
          <label htmlFor="avatar" className="block text-sm font-medium mb-1">
            Avatar (optional)
          </label>
          <div className="flex items-center">
            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
            <label
              htmlFor="avatar"
              className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-purple-500"
            >
              Choose File
            </label>
            <span className="ml-3 text-gray-500 text-sm">
              {data.avatar ? data.avatar.name : "No file chosen"}
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 rounded-md"
          disabled={uploading && data.avatar}
        >
          {uploading ? "Uploading..." : "Sign Up"}
        </button>
      </form>
      <button
        type="button"
        onClick={handleGoogleSignup}
        className="mt-4 w-full bg-red-500 hover:bg-red-700 text-white font-bold py-3 rounded-md"
      >
        Sign Up with Google
      </button>
    </div>
  );
};

export default SignUp;

import React, { useState } from "react";
import { login, Api } from "../api";
import { auth, provider } from "../utils/Firebase";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const User = response.user;
      const googleId = await User.getIdToken(); // 🔹 Get Firebase ID token

      const userData = {
        name: User.displayName,
        email: User.email,
        avatar: User.photoURL,
        phoneNumber: User.phoneNumber,
        googleId, // 🔹 Send this token to the backend
      };

      console.log("Google User Data:", userData);
      // Send token to backend using Axios
      const res = await axios.post(`${Api}/api/auth/google-login`, {
        googleId,
      });
      navigate("/");
      // console.log("Backend Response:", res.data.user);
      const { token, user } = res.data;
      // console.log("Response from login:", res.user);
      // console.log("token", token);
      // console.log("User", user);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleChange = (event) => {
    const { id, value } = event.target;

    setFormData((prevData) => ({ ...prevData, [id]: value }));
    // setEmail(event.target.value);
    // setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    // console.log(formData);

    try {
      const response = await login(formData); // Assuming this returns token + user data
      const { token, user } = response.user;
      console.log("Response from login:", response.user);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      // Show error message to user if needed
    }
  };

  return (
    <div className="bg-gray-900 p-8 rounded-md w-96 mx-auto my-12 text-gray-300">
      <h2 className="text-center text-purple-400 text-2xl font-semibold mb-6">
        Login
      </h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="p-2 shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-800 text-gray-300"
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
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="p-2 shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-800 text-gray-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 rounded-md focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </form>
      <button
        type="button"
        onClick={handleGoogleLogin}
        className=" my-2 w-full bg-red-500 hover:bg-red-700 text-white font-bold py-3 rounded-md focus:outline-none focus:shadow-outline"
      >
        Login with Google
      </button>
    </div>
  );
};

export default Login;

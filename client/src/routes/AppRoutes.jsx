import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import HomePage from "../components/HomePage";
import UserProfile from "../components/UserProfile";
import Dashboard from "../components/Dashboard";
const AppRoutes = () => {
  return (
    <>
      {/* <Router> */}
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="login/userprofile" element={<UserProfile />} />
          <Route path="/login/dashboard" element={<Dashboard />} />

          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      {/* </Router> */}
    </>
  );
};

export default AppRoutes;

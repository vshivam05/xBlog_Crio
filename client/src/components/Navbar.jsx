import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  // const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [localStorage.getItem("token")]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    navigate("/login");
  };
  return (
    <nav className="bg-gray-600 p-4">
      <div className="flex items-center justify-between">
        {/* Left side (Blog) */}
        <div className="text-white text-xl font-bold">Blog</div>

        {/* Hamburger icon (only visible on mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {/* Hamburger Icon */}
            {isOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Desktop menu */}
        {!token ? (
          <div className="hidden md:flex space-x-6 text-white text-lg">
            <Link to={"/home"} className="hover:underline">
              Home
            </Link>
            <Link to={"/login"} className="hover:underline">
              Login
            </Link>
            <Link to={"/register"} className="hover:underline">
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex space-x-6 text-white text-lg">
            <Link to={"/home"} className="hover:underline">
              Home
            </Link>
            <Link to={"login/userprofile"} className="hover:underline">
              Profile
            </Link>
            <Link to={"/login/dashboard"} className="hover:underline">
              Dashboard
            </Link>
            {/* <Link to={"/"} className="hover:underline"> */}
            <button onClick={handleLogout}>Logout</button>
            {/* </Link> */}
          </div>
        )}
      </div>

      {/* Mobile menu (visible when isOpen is true) */}
      {isOpen && (
  <div className="flex flex-col mt-4 space-y-4 text-white text-lg md:hidden">
    {!token ? (
      <>
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/login" className="hover:underline">
          Login
        </Link>
        <Link to="/register" className="hover:underline">
          Sign Up
        </Link>
      </>
    ) : (
      <>
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/login/userprofile" className="hover:underline">
          Profile
        </Link>
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <button onClick={handleLogout} className="hover:underline text-left">
          Logout
        </button>
      </>
    )}
  </div>
)}

    </nav>
  );
};

export default Navbar;

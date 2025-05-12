import React, { useState, useEffect } from "react";
import { getUserProfile } from "../api";
const UserProfile = () => {
  // Example state for user data (replace with actual data fetching)
  // const [name, setName] = useState("Shivam Verma");
  // const [avatarUrl, setAvatarUrl] = useState("https://i.pravatar.cc/300");
  const [userdata, setuserData] = useState({
    name: "",
    email: "",
    avatar: "https://i.pravatar.cc/300",
    postCount: 0,
  });

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  // console.log("User from localStorage:", user);
  // console.log("Token from localStorage:", token);
  const fetchUserProfile = async (token) => {
    try {
      const response = await getUserProfile(token);
      console.log("User Profile Data:", response);

      setuserData({
        name: response.name,
        email: response.email,
        avatar: response.avatar,
        postCount: response.postCount,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // console.log("User from localStorage:", user);
    // setName(user.name);
    // setAvatarUrl(user.avatar);
    fetchUserProfile(token);
  }, []);

  const handleAvatarUrlChange = (event) => {
    setAvatarUrl(event.target.value);
  };

  const handleUpdateProfile = () => {
    // In a real application, you would send this data to your backend
    // console.log({ name, avatarUrl });
    alert("Profile Updated!");
  };

  useEffect(() => {}, []);

  return (
    <div className="bg-gray-900 min-h-screen py-8 text-gray-300">
      <div className="container mx-auto max-w-md p-6 rounded-md shadow-md bg-gray-800">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden mb-2">
            <img
              src={userdata.avatar}
              alt="User Avatar"
              className="object-cover w-full h-full"
            />
            {/* You might want to add an edit icon here */}
          </div>
          <h2 className="text-white text-xl font-semibold mb-1">
            {userdata.name}
          </h2>
          <p className="text-sm text-gray-500 mb-1">{userdata.email}</p>
          <p className="text-sm text-gray-400">
            Total Posts: {userdata.postCount}
          </p>
        </div>

        {/* Form Section */}
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userdata.name}
              onChange={handleNameChange}
              className="p-2 shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-700 text-gray-300"
            />
          </div>
          <div>
            <label
              htmlFor="avatarUrl"
              className="block text-sm font-medium mb-1"
            >
              Avatar URL
            </label>
            <input
              type="url"
              id="avatarUrl"
              value={userdata.avatar}
              onChange={handleAvatarUrlChange}
              className="p-2 shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-700 text-gray-300"
            />
            <p className="text-xs text-gray-500 mt-1">
              Paste the URL of your avatar image.
            </p>
          </div>
          <div>
            <button
              type="submit"
              onClick={handleUpdateProfile}
              className="w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 rounded-md focus:outline-none focus:shadow-outline"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

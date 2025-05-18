// import React, { useState, useEffect } from "react";
// import { getUserProfile } from "../api";
// const UserProfile = () => {
//   // Example state for user data (replace with actual data fetching)

//   const [userdata, setuserData] = useState({
//     name: "",
//     email: "",
//     avatar: "https://i.pravatar.cc/300",
//     postCount: 0,
//   });

//   const handleNameChange = (event) => {
//     //   setName(event.target.value);
//   };

//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");
//   // console.log("User from localStorage:", user);
//   // console.log("Token from localStorage:", token);
//   const fetchUserProfile = async (token) => {
//     try {
//       const response = await getUserProfile(token);
//       console.log("User Profile Data:", response);

//       setuserData({
//         name: response.name,
//         email: response.email,
//         avatar: response.avatar,
//         postCount: response.postCount,
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchUserProfile(token);
//   }, []);

//   const handleAvatarUrlChange = (event) => {
//     setAvatarUrl(event.target.value);
//   };

//   const handleUpdateProfile = () => {
//     // In a real application, you would send this data to your backend
//     // console.log({ name, avatarUrl });
//     alert("Profile Updated!");
//   };

//   useEffect(() => {}, []);

//   return (
//     <div className="bg-gray-900 min-h-screen py-8 text-gray-300">
//       <div className="container mx-auto max-w-md p-6 rounded-md shadow-md bg-gray-800">
//         {/* Header Section */}
//         <h1 className="text-3xl font-bold text-white text-center mb-6">
//           Profile
//         </h1>
//         <div className="flex flex-col items-center mb-6">
//           <div className="relative w-24 h-24 rounded-full overflow-hidden mb-2">
//             <img
//               src={userdata.avatar}
//               alt="User Avatar"
//               className="object-cover w-full h-full"
//             />
//             {/* You might want to add an edit icon here */}
//           </div>
//           <h2 className="text-white text-xl font-semibold mb-1">
//             {userdata.name}
//           </h2>
//           <p className="text-sm text-gray-500 mb-1">{userdata.email}</p>
//           <p className="text-sm text-gray-400">
//             Total Posts: {userdata.postCount}
//           </p>
//         </div>

//         {/* Form Section */}
//         <div className="space-y-4">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium mb-1">
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={userdata.name}
//               onChange={handleNameChange}
//               className="p-2 shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-700 text-gray-300"
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="avatarUrl"
//               className="block text-sm font-medium mb-1"
//             >
//               Avatar URL
//             </label>
//             <input
//               type="url"
//               id="avatarUrl"
//               value={userdata.avatar}
//               onChange={handleAvatarUrlChange}
//               className="p-2 shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-700 text-gray-300"
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               Paste the URL of your avatar image.
//             </p>
//           </div>
//           <div>
//             <button
//               type="submit"
//               onClick={handleUpdateProfile}
//               className="w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 rounded-md focus:outline-none focus:shadow-outline"
//             >
//               Update Profile
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserProfile } from "../api"; // assuming this is a wrapper around axios.get

const UserProfile = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    avatar: "https://i.pravatar.cc/300",
    postCount: 0,
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile(token); // assuming this calls /api/users/me
      setForm({
        name: response.name,
        email: response.email,
        avatar: response.avatar,
        postCount: response.postCount,
      });
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  // Handle form input changes
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle profile update
  const handleUpdateProfile = async () => {
    const { name, avatar } = form;
    console.log(name);
    try {
      const response = await axios.put(
        "http://localhost:5000/api/users/me",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Profile updated:", response.data);

      // Update localStorage if needed
      const updatedUser = {
        ...user,
        name: response.data.name,
        avatar: response.data.avatar,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert("Profile updated!");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Update failed!");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen py-8 text-gray-300">
      <div className="container mx-auto max-w-md p-6 rounded-md shadow-md bg-gray-800">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Profile
        </h1>
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden mb-2">
            <img
              src={form.avatar}
              alt="User Avatar"
              className="object-cover w-full h-full"
            />
          </div>
          <h2 className="text-white text-xl font-semibold mb-1">{form.name}</h2>
          <p className="text-sm text-gray-500 mb-1">{form.email}</p>
          <p className="text-sm text-gray-400">Total Posts: {form.postCount}</p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="p-2 shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-700 text-gray-300"
              required
            />
          </div>
          <div>
            <label htmlFor="avatar" className="block text-sm font-medium mb-1">
              Avatar URL
            </label>
            <input
              type="url"
              id="avatar"
              name="avatar"
              value={form.avatar}
              onChange={handleChange}
              className="p-2 shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-700 text-gray-300"
            />
            <p className="text-xs text-gray-500 mt-1">
              Paste the URL of your avatar image.
            </p>
          </div>
          <div>
            <button
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

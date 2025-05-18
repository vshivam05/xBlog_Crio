import React, { useState, useEffect } from "react";
import { Api, getAllPosts } from "../api";
import PostList from "./PostList";
import CreatePost from "./CreatePost";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  // console.log("User in Dashboard:", user);
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  // const [selectedFile, setSelectedFile] = useState(null);
  const [getUserPosts, setUserPosts] = useState([]);
  // const [postData, setPostData] = useState({
  //   title: "",
  //   content: "",
  //   tags: "",
  //   image: null,
  // });
  const [isEditing, setIsEditing] = useState(false);
  const [postIdBeingEdited, setPostIdBeingEdited] = useState(null);

  const fetchPosts = async () => {
    try {
      if (user.role == "admin") {
        setUserPosts([]);
        const response = await getAllPosts();
        console.log("Fetched posts:", response.data);
        setUserPosts(response.data);
      } else {
        const response = await fetch(`${Api}/api/users/me/posts`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        console.log("Fetched posts:", data);
        setUserPosts(data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    // console.log("User Posts:", getUserPosts);
  }, []);

  const handleCreatePostClick = () => {
    setShowCreatePostForm(true);
    navigate("/create");
  };

  const handleCloseCreatePostForm = () => {
    setShowCreatePostForm(false);
    setIsEditing(false);
    setPostIdBeingEdited(null);
    setPostData({ title: "", content: "", tags: "", image: null });
    setSelectedFile(null);
  };

  // Generic handler for input changes
  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleEdit = (post) => {
    // setShowCreatePostForm(true);
    setIsEditing(true);
    setPostIdBeingEdited(post._id); // Assuming MongoDB-style ID

    setPostData({
      title: post.title,
      content: post.content,
      tags: post.tags.join(", "), // convert array to comma string
      image: post.image, // this will be a string path, show it as preview if needed
    });

    // Handle the edit action here
  };

  return (
    <div className="bg-gray-900 min-h-screen py-8 text-gray-300 px-4 sm:px-6 lg:px-8">
      <div className=" w-full  md:w-full  flex items-center justify-between">
        <h1 className="text-white text-2xl font-semibold">My Posts</h1>
        {!showCreatePostForm && (
          <button
            type="button"
            onClick={handleCreatePostClick}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
          >
            + Create Post
          </button>
        )}
      </div>

      {/* <div className="flex mt-8"> */}
      <div className="mt-8 ">
        {getUserPosts.length !== 0 ? (
          <PostList posts={getUserPosts} fetchPosts={fetchPosts} />
        ) : (
          <p className="text-gray-500 flex ms-20 text-lg font-semibold text-center">
            You have no posts yet.
          </p>
        )}
      </div>
      {/* </div> */}
    </div>
  );
};

export default Dashboard;

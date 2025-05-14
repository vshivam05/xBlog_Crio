import React, { useState, useEffect } from "react";
import { createPost, Api, handleEditPost, getAllPosts } from "../api"; // Adjust the import based on your API structure
import PostList from "./PostList"; // Adjust the import based on your file structure
import CreatePost from "./CreatePost";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  console.log("User in Dashboard:", user);
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [getUserPosts, setUserPosts] = useState([]);
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    tags: "",
    image: null,
  });
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
        const response = await fetch(`${Api}/api/user/posts`, {
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

  // const handleCreatePostSubmit = async (event) => {
  //   event.preventDefault();
  //   // console.log("Post Data:", postData);

  //   const formData = new FormData();
  //   const title = document.getElementById("title").value; // Get the input value for title
  //   const content = document.getElementById("content").value; // Get the input value for content
  //   const tags = document.getElementById("tags").value.split(",");
  //   formData.append("title", title);
  //   formData.append("content", content);
  //   formData.append("tags", tags);
  //   formData.append("image", selectedFile);

  //   try {
  //     const response = await createPost({ formData, token });
  //     console.log("Post created successfully:", response);
  //     if (response.status == 201) {
  //       window.location.reload();
  //     }
  //     console.log("Post created successfully:", response);
  //     handleCloseCreatePostForm(); // ✅ Only close form on success
  //   } catch (error) {
  //     console.error(
  //       "Error during creating post:",
  //       error?.response?.data?.message || error.message
  //     );
  //   }
  // };

  const handleEdit = (post) => {
    setShowCreatePostForm(true);
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

  // const handleUpdatePostSubmit = async (event) => {
  //   event.preventDefault();

  //   const formData = new FormData();
  //   formData.append("title", postData.title);
  //   formData.append("content", postData.content);
  //   formData.append("tags", postData.tags.split(","));
  //   if (selectedFile) formData.append("image", selectedFile);

  //   try {
  //     const response = await handleEditPost(formData, postIdBeingEdited, token);
  //     console.log("Post updated successfully:", response);
  //     if (response.status == 200) {
  //       console.log("Post updated");
  //       fetchPosts();
  //       handleCloseCreatePostForm();
  //     } else {
  //       console.error("Failed to update post");
  //     }
  //   } catch (error) {
  //     console.error("Error updating post:", error);
  //   }
  // };

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
        {
          // showCreatePostForm ? (

          // <div className="fixed  inset-0 bg-gray-900 bg-opacity-90 flex justify-center items-center z-10">
          //   <div className=" w-full bg-gray-800 p-8 rounded-md shadow-md w-full max-w-xl text-gray-300 relative">
          //     <h2 className="text-purple-400 text-2xl font-semibold mb-6">
          //       Create Post
          //     </h2>
          //     <form
          //       onSubmit={
          //         isEditing ? handleUpdatePostSubmit : handleCreatePostSubmit
          //       }
          //       className="space-y-4"
          //     >
          //       <div>
          //         <label
          //           htmlFor="title"
          //           className="block text-sm font-medium mb-1"
          //         >
          //           Title
          //         </label>
          //         <input
          //           type="text"
          //           id="title"
          //           name="title"
          //           value={postData.title}
          //           onChange={handleInputChange}
          //           className="p-2 shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-700 text-gray-300"
          //           required
          //         />
          //       </div>
          //       <div>
          //         <label
          //           htmlFor="content"
          //           className="block text-sm font-medium mb-1"
          //         >
          //           Content
          //         </label>
          //         <textarea
          //           id="content"
          //           name="content"
          //           value={postData.content}
          //           onChange={handleInputChange}
          //           rows="6"
          //           className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-700 text-gray-300"
          //           required
          //         ></textarea>
          //       </div>
          //       <div>
          //         <label
          //           htmlFor="tags"
          //           className="block text-sm font-medium mb-1"
          //         >
          //           Tags (comma-separated)
          //         </label>
          //         <input
          //           type="text"
          //           id="tags"
          //           name="tags"
          //           value={postData.tags}
          //           onChange={handleInputChange}
          //           className="p-2 shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-700 text-gray-300"
          //         />
          //       </div>
          //       <div>
          //         <label
          //           htmlFor="image"
          //           className="block text-sm font-medium mb-1"
          //         >
          //           Image
          //         </label>
          //         <div className="flex items-center">
          //           <input
          //             id="file-upload"
          //             type="file"
          //             name="image"
          //             accept="image/*"
          //             onChange={(e) => setSelectedFile(e.target.files[0])}
          //             className="hidden"
          //           />
          //           <label
          //             htmlFor="file-upload" // ✅ corrected here
          //             className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          //           >
          //             Choose File
          //           </label>
          //           <span className="ml-3 text-gray-500 text-sm">
          //             {postData.image ? postData.image.name : "No file chosen"}
          //           </span>
          //         </div>
          //       </div>
          //       <div className="flex justify-end">
          //         <button
          //           type="button"
          //           onClick={handleCloseCreatePostForm}
          //           className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline mr-2"
          //         >
          //           Cancel
          //         </button>
          //         <button
          //           type="submit"
          //           className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
          //         >
          //           {isEditing ? "Update Post" : "Create Post"}
          //         </button>
          //       </div>
          //     </form>
          //   </div>
          // </div>
          // ) :
          getUserPosts.length !== 0 ? (
            <PostList
              posts={getUserPosts}
              handleEdit={handleEdit}
              fetchPosts={fetchPosts}
            />
          ) : (
            <p className="text-gray-500 flex ms-20 text-lg font-semibold text-center">
              You have no posts yet.
            </p>
          )
        }
      </div>
      {/* </div> */}
    </div>
  );
};

export default Dashboard;

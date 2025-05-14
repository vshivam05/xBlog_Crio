// import React from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { createPost, handleEditPost } from "../api";
// const CreatePost = (
//   {
//     // isEditing,
//     // handleUpdatePostSubmit,
//     // handleCreatePostSubmit,
//     // postData,
//     // handleInputChange,
//     // setSelectedFile,
//   }
// ) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [postData, setPostData] = useState({
//     title: "",
//     content: "",
//     tags: "",
//     image: null,
//   });

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const handleInputChange = (event) => {
//     const { name, value, type, files } = event.target;
//     setPostData((prevData) => ({
//       ...prevData,
//       [name]: type === "file" ? files[0] : value,
//     }));
//   };

//   const handleCreatePostSubmit = async (event) => {
//     if (!token) {
//       console.error("Token missing");
//       return;
//     }
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append("title", postData.title);
//     formData.append("content", postData.content);
//     formData.append("tags", postData.tags.split(","));
//     if (selectedFile) {
//       formData.append("image", selectedFile);
//     }

//     try {
//       const response = await createPost({ formData, token });
//       if (response.status === 201) {
//         console.log("Post created successfully");
//         navigate("/dashboard"); // 🛠️ Correct path here
//       }
//     } catch (error) {
//       console.error(
//         "Error during creating post:",
//         error?.response?.data?.message || error.message
//       );
//     }
//   };

//   const handleUpdatePostSubmit = async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append("title", postData.title);
//     formData.append("content", postData.content);
//     formData.append("tags", postData.tags.split(","));
//     if (selectedFile) formData.append("image", selectedFile);

//     try {
//       const response = await handleEditPost(formData, postIdBeingEdited, token);
//       console.log("Post updated successfully:", response);
//       if (response.status == 200) {
//         console.log("Post updated");
//         fetchPosts();
//         // handleCloseCreatePostForm();
//       } else {
//         console.error("Failed to update post");
//       }
//     } catch (error) {
//       console.error("Error updating post:", error);
//     }
//   };

//   return (
//     <>
//       <div className="fixed  inset-0 bg-gray-900 bg-opacity-90 flex justify-center items-center z-10">
//         <div className=" w-full bg-gray-800 p-8 rounded-md shadow-md w-full max-w-xl text-gray-300 relative">
//           <h2 className="text-purple-400 text-2xl font-semibold mb-6">
//             Create Post
//           </h2>
//           <form
//             onSubmit={
//               isEditing ? handleUpdatePostSubmit : handleCreatePostSubmit
//             }
//             className="space-y-4"
//           >
//             <div>
//               <label htmlFor="title" className="block text-sm font-medium mb-1">
//                 Title
//               </label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 value={postData.title}
//                 onChange={handleInputChange}
//                 className="p-2 shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-700 text-gray-300"
//                 required
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="content"
//                 className="block text-sm font-medium mb-1"
//               >
//                 Content
//               </label>
//               <textarea
//                 id="content"
//                 name="content"
//                 value={postData.content}
//                 onChange={handleInputChange}
//                 rows="6"
//                 className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-700 text-gray-300"
//                 required
//               ></textarea>
//             </div>
//             <div>
//               <label htmlFor="tags" className="block text-sm font-medium mb-1">
//                 Tags (comma-separated)
//               </label>
//               <input
//                 type="text"
//                 id="tags"
//                 name="tags"
//                 value={postData.tags}
//                 onChange={handleInputChange}
//                 className="p-2 shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-700 text-gray-300"
//               />
//             </div>
//             <div>
//               <label htmlFor="image" className="block text-sm font-medium mb-1">
//                 Image
//               </label>
//               <div className="flex items-center">
//                 <input
//                   id="file-upload"
//                   type="file"
//                   name="image"
//                   accept="image/*"
//                   // onChange={(e) => setSelectedFile(e.target.files[0])}
//                   onChange={(e) => {
//                     const file = e.target.files[0];
//                     setSelectedFile(file);
//                     setPostData((prev) => ({ ...prev, image: file }));
//                   }}
//                   className="hidden"
//                 />
//                 <label
//                   htmlFor="file-upload"
//                   className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
//                 >
//                   Choose File
//                 </label>
//                 <span className="ml-3 text-gray-500 text-sm">
//                   {postData.image ? postData.image.name : "No file chosen"}
//                 </span>
//               </div>
//             </div>
//             <div className="flex justify-end">
//               <button
//                 type="button"
//                 onClick={() => {
//                   navigate("/dashboard");
//                 }}
//                 className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline mr-2"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
//               >
//                 {isEditing ? "Update Post" : "Create Post"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreatePost;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost, handleEditPost } from "../api";

const CreatePost = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    tags: "",
    image: null,
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleCreatePostSubmit = async (event) => {
    if (!token) {
      console.error("Token missing");
      return;
    }
    setIsLoading(true);
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("content", postData.content);
    formData.append("tags", postData.tags.split(","));
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const response = await createPost({ formData, token });

      // if (response.status === 201) {
        console.log("Post created successfully");
         navigate("/dashboard");
      // } else {
      //   console.error("Failed to create post", response.status);
      // }
    } catch (error) {
      console.error(
        "Error during creating post:",
        error?.response?.data?.message || error.message
      );
    }
    setIsLoading(false);
  };

  const handleUpdatePostSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("content", postData.content);
    formData.append("tags", postData.tags.split(","));
    if (selectedFile) formData.append("image", selectedFile);

    try {
      const response = await handleEditPost(formData, postIdBeingEdited, token);
      console.log("Post updated successfully:", response);
      if (response.status === 200) {
        console.log("Post updated");
        fetchPosts();
        // handleCloseCreatePostForm();
      } else {
        console.error("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex justify-center items-center z-10">
      <div className="w-full bg-gray-800 p-8 rounded-md shadow-md w-full max-w-xl text-gray-300 relative">
        <h2 className="text-purple-400 text-2xl font-semibold mb-6">
          Create Post
        </h2>
        <form
          onSubmit={isEditing ? handleUpdatePostSubmit : handleCreatePostSubmit}
          className="space-y-4"
        >
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={postData.title}
              onChange={handleInputChange}
              className="p-2 shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-700 text-gray-300"
              required
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-1">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={postData.content}
              onChange={handleInputChange}
              rows="6"
              className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-700 text-gray-300"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="tags" className="block text-sm font-medium mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={postData.tags}
              onChange={handleInputChange}
              className="p-2 shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-700 text-gray-300"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium mb-1">
              Image
            </label>
            <div className="flex items-center">
              <input
                id="file-upload"
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setSelectedFile(file);
                  setPostData((prev) => ({ ...prev, image: file }));
                }}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Choose File
              </label>
              <span className="ml-3 text-gray-500 text-sm">
                {postData.image ? postData.image.name : "No file chosen"}
              </span>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            >
              {/* { isEditing ? "Update Post" : "Create Post"} */}
              {isLoading
                ? "Loading..."
                : isEditing
                ? "Update Post"
                : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;

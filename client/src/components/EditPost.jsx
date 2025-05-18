import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleEditPost, getPostById } from "../api"; // assuming getPostById is available

const EditPost = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    tags: "",
    image: null,
  });

  const navigate = useNavigate();
  const { postId } = useParams(); // assume postId comes from route param
  console.log("postId", postId);
  const token = localStorage.getItem("token");
  // const postId = id; // replace with actual post ID

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await getPostById(postId);
        // console.log(response.data);
        const { title, content, tags, image } = response.data;
        setPostData({
          title,
          content,
          tags: tags.join(","),
          image: image || null,
        });
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    if (postId) {
      fetchPostData();
    }
  }, [postId, token]);

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
    if (type === "file") setSelectedFile(files[0]);
  };

  const handleUpdatePostSubmit = async (event) => {
    event.preventDefault();
    if (!token) {
      console.error("Token missing");
      return;
    }

    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("content", postData.content);
    formData.append("tags", postData.tags.split(","));
    if (selectedFile) formData.append("image", selectedFile);

    try {
      const response = await handleEditPost(formData, postId, token);
      console.log("Post updated successfully:", response);
      if (response.status === 200) {
        navigate("/dashboard");
      } else {
        console.error("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex justify-center items-center z-10">
      <div className="w-full bg-gray-800 p-8 rounded-md shadow-md max-w-xl text-gray-300 relative">
        <h2 className="text-purple-400 text-2xl font-semibold mb-6">
          Edit Post
        </h2>
        <form onSubmit={handleUpdatePostSubmit} className="space-y-4">
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
                onChange={handleInputChange}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-purple-500"
              >
                Choose File
              </label>
              <span className="ml-3 text-gray-500 text-sm">
                {selectedFile
                  ? selectedFile.name
                  : postData.image
                  ? postData.image.name || postData.image
                  : "No file chosen"}
              </span>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md"
            >
              {isLoading ? "Updating..." : "Update Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;

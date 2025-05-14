import React from "react";
import { getAllPosts } from "../api"; // Adjust the import based on your API structure
import { useState, useEffect } from "react";
import PostList from "./PostList";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [tags, setTags] = useState("");

  const token = localStorage.getItem("token");
  const FetchAllBlog = async () => {
    if (!token) {
      console.log("No token found");
      return;
    }
    try {
      const res = await getAllPosts();
      console.log("Fetched posts:", res.data);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    FetchAllBlog();
  }, []);

  return (
    <div className="w-full md:w-full mx-auto mt-12 p-8 rounded-md text-gray-300">
      <div className="flex flex-col mx-10">
        <h1 className="text-white text-2xl font-semibold mb-4">
          Explore Posts
        </h1>

        <div className="form">
          <form className="flex flex-col gap-4 justify-center md:flex-row">
            <input
              className="w-1/3 p-2 md:w-full shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-600 text-gray-300"
              type="text"
              placeholder="Search by keyword..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <input
              className="w-1/3 md:w-full p-2 shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-600 text-gray-300"
              type="text"
              placeholder="Filter by tags (comma-separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </form>
        </div>

        {token ? (
          posts.length > 0 ? (
            <div className="my-4 flex flex-col gap-2">
              <PostList posts={posts} isHomePage={true} />
            </div>
          ) : (
            <p className="text-gray-500 flex ms-20 text-lg font-semibold text-center">
              No posts available
            </p>
          )
        ) : (
          <p className="text-gray-500 flex ms-20 text-lg font-semibold text-center">
            No posts found.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;

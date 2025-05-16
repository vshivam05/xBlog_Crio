import React, { useState, useEffect } from "react";
import {
  Api,
  handleDeletePost,
  postLike,
  postComment,
  postCommentDelete,
} from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

const PostList = ({ posts, handleEdit, fetchPosts, isHomePage }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState("");

  const user = localStorage.getItem("user");
  const userData = JSON.parse(user);
  // console.log("user from th hompage", user);
  const handleView = (post) => {
    setSelectedPost(post);
    setLikes(0); // Reset like count on view
    setComment(""); // Reset comment input
    setComments([]); // Reset previous comments
  };

  const handleBack = () => {
    setSelectedPost(null);
  };

  console.log("isHomePage", isHomePage);

  const filteredPosts = isHomePage
    ? posts
    : posts.filter((post) => post.author._id === userData.id);

  const handleDelete = async (post) => {
    try {
      const res = await handleDeletePost(post);
      if (res.status === 200) {
        //   alert("Post deleted successfully");

        fetchPosts();
        console.log("Post deleted successfully:", res);
      }
      if (res.status === 403) {
        alert("You are not authorized to delete this post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  const handleLike = async (id) => {
    try {
      const like = await postLike(id);
      // console.log("Post liked successfully:", like);
      //   window.location.reload();
      //   setLikes(like.data.likes);
      fetchPosts();
    } catch (error) {
      console.error("Error liking post:", error);
      alert(error.response.data.message);
    }
  };

  const handleCommentDelete = async (commentId, postId) => {
    try {
      const res = await postCommentDelete(commentId, postId);
      console.log("Comment deleted successfully:", res);
      if (res.status === 200) {
        alert("Comment deleted successfully");
        fetchPosts();
      }
    } catch (error) {
      console.log("Error while deleting comment:", error);
    }
  };

  const handleCommentSubmit = async (id) => {
    // if (comment.trim() !== "") {
    //   setComments((prev) => [...prev, comment]);
    //   setComment("");
    // }
    console.log("Comment submitted:", comment);
    setComments(comment);
    setComment("");

    try {
      const res = await postComment(id, comment);
      console.log("Comment posted successfully:", res);

      fetchPosts();
    } catch (error) {
      console.error("Error posting comment:", error);
    }

    // console.log("Comment submitted:", comment);
  };

  // View Single Post
  if (selectedPost) {
    const date = new Date(selectedPost.createdAt).toLocaleDateString();
    console.log(`${Api}/${selectedPost.image.replace(/\\/g, "/")}`);
    return (
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <img
            src={`${Api}/${selectedPost.image.replace(/\\/g, "/")}`}
            alt="Post"
            className="w-full h-96 object-cover rounded"
          />
          <h2 className="text-2xl font-bold mt-4">{selectedPost.title}</h2>
          <p className="text-gray-700 mt-2">{selectedPost.content}</p>
          <div className="mt-4">
            {selectedPost.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                #{tag}
              </span>
            ))}
            <div className="text-sm text-gray-500 mt-2">Posted on {date}</div>
          </div>

          {/* Like Button */}
          <div className="mt-4">
            <button
              type="button"
              onClick={() => {
                handleLike(selectedPost._id);
              }}
              className="bg-pink-500 w-full text-white px-4 py-2 rounded hover:bg-pink-600"
            >
              ❤️ Like {selectedPost.likes.length}
            </button>
          </div>

          {/* Comment Input */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">
              {" "}
              <FontAwesomeIcon icon={faComment} /> Add a Comment
            </h3>
            <div className="flex">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 border border-gray-300 rounded-l px-4 py-2"
              />
              <button
                type="button"
                onClick={() => {
                  handleCommentSubmit(selectedPost._id);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
              >
                Post
              </button>
            </div>

            {/* Display Comments */}
            <ul className="mt-4 space-y-2">
              {selectedPost.comments.map((c, index) => {
                return (
                  <li
                    key={index}
                    className="bg-gray-100 text-gray-500 p-2 rounded shadow-sm text-sm flex justify-between"
                  >
                    <span>{c.content}</span>

                    <button
                      type="button"
                      className=" text-white bg-red-500 hover:text-gray-700 rounded p-2 px-4 "
                      onClick={() => {
                        handleCommentDelete(c._id, selectedPost._id);
                      }}
                    >
                      Delete
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <button
            type="submit"
            onClick={handleBack}
            className="mt-6 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Back to All Posts
          </button>
        </div>
      </div>
    );
  }

  // All Posts Grid View
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPosts.map((post, key) => {
          const date = new Date(post.createdAt).toLocaleDateString();
          return (
            <div
              className="bg-white rounded-lg overflow-hidden shadow-lg"
              key={key}
            >
              <img
                className="w-full h-48 object-cover"
                src={`${Api}/${post.image.replace(/\\/g, "/")}`}
                alt="Post"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{post.title}</div>
                <p className="text-gray-700 text-base">{post.content}</p>
                <p className="text-gray-500 text-sm mt-1">
                  by {post.author.name}
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
                ;
                <br />
                <div className="container flex flex-row justify-between gap-8">
                  <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-1 mb-2">
                    {date}
                  </span>

                  <span className=" flex flex-row justify-between gap-2 ">
                    <button
                      type="button"
                      onClick={() => {
                        handleLike(post._id);
                      }}
                      className="text-gray px-4 py-2 rounded hover:bg-pink-600 hover:text-white"
                    >
                      ❤️ Like {post.likes.length}
                    </button>

                    <span className="text-gray-500 text-sm mt-2 ">
                      <FontAwesomeIcon icon={faComment} />
                      {post.comments.length}
                    </span>
                  </span>
                </div>
                {!isHomePage && (
                  <div className="button">
                    <button
                      type="button"
                      onClick={() => handleView(post)}
                      className="m-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEdit(post)}
                      className="m-2 bg-transparent hover:bg-gray-500 text-gray-800 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(post)}
                      className="m-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostList;

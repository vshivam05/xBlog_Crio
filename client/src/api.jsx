import axios from "axios";
export const Api = "http://localhost:5000";

export const register = async (data) => {
  try {
    const response = await axios.post(`${Api}/api/auth/register`, data);
    console.log(response.data.message);
    return await response.data;
  } catch (error) {
    console.error("Error during registration:", error.response.data.message);
    alert(error.response.data.message);
    return error.response.data.message;
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post(`${Api}/api/auth/login`, data);
    // console.log(response.data);
    return await response.data;
  } catch (error) {
    console.error("Error during login:", error.response.data.message);
    alert(error.response.data.message);
    return error.response.data.message;
  }
};

export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${Api}/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("User Profile Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

// ---------------------Post API--------------------- //

export const createPost = async ({ formData, token }) => {
  // console.log("Post Data:", postData);
  // console.log("Token:", token);

  try {
    const newpost = await axios.post(`${Api}/api/post`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log("Post created successfully:", newpost.data);
    return newpost;
  } catch (error) {
    console.error("Error during creating post:", error);
    alert(error.response.data.message);
    return error.response.data.message;
  }
};

export const handleDeletePost = async (post) => {
  const token = localStorage.getItem("token");
  try {
    const deletePost = await axios.delete(
      `${Api}/api/post/delete/${post._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log("Post deleted successfully:", deletePost.data);
    return deletePost;
  } catch (error) {
    console.error("Error deleting post:", error);
    return error;
  }
};

export const handleEditPost = async (formData, postIdBeingEdited) => {
  const token = localStorage.getItem("token");
  try {
    const editPost = await axios.put(
      `${Api}/api/post/update-blog/${postIdBeingEdited}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log("Post edited successfully:", editPost.data);
    return editPost;
  } catch (error) {
    console.error("Error editing post:", error);
  }
};

export const postLike = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const like = await axios.put(
      `${Api}/api/post/${id}/like`,
      {}, // empty body (if no data needs to be sent)
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Post liked successfully:", like);
    return like;
  } catch (error) {
    console.error("Error liking post:", error);
  }
};

export const postComment = async (id, comment) => {
  const token = localStorage.getItem("token");
  // console.log("Comment Data:", comment);
  // console.log("Post ID:", id);
  // console.log("Token:", token);
  try {
    const res = await axios.post(
      `${Api}/api/post/${id}/comment`,
      { content: comment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Comment posted successfully:", res);
    return res;
  } catch (error) {
    console.error("Error posting comment:", error);
  }
};

export const postCommentDelete = async (commentId, postId) => {
  // console.log("Comment ID:", commentId);
  // console.log("Post ID:", postId);
  const token = localStorage.getItem("token");
  try {
    const res = await axios.delete(
      `${Api}/api/post/comment/delete/${commentId}/${postId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Comment deleted successfully:", res);
    return res;
  } catch (error) {
    console.error("Error deleting comment:", error);
    return error;
  }
};

export const getUserPosts = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${Api}/api/post`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("Fetched posts:", res.data);
    return res;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return error;
  }
};

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setPost(data);
      setLikeCount(data.likes?.length || 0);
      setLiked(data.likes?.includes(data.currentUserId)); // Adjust as per backend
    };

    fetchPost();
  }, [id]);

  const handleLikeToggle = async () => {
    const res = await fetch(`/api/posts/${id}/like`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (res.ok) {
      setLiked(!liked);
      setLikeCount((prev) => prev + (liked ? -1 : 1));
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p><strong>Tags:</strong> {post.tags}</p>
      <button onClick={handleLikeToggle}>
        {liked ? `Unlike (${likeCount})` : `Like (${likeCount})`}
      </button>
    </div>
  );
};

export default ViewPost;

import PostForm from "../components/PostForm";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setInitialData(data);
    };

    fetchPost();
  }, [id]);

  const handleEdit = async (updatedData) => {
    const res = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (res.ok) {
      navigate("/dashboard");
    }
  };

  if (!initialData) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Post</h2>
      <PostForm onSubmit={handleEdit} initialData={initialData} />
    </div>
  );
};

export default EditPost;

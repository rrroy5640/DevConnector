import React, { useState } from "react";
import usePost from "../../hooks/usePost";

export const PostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
  });
  const { title, text } = formData;

  const { addPost } = usePost();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addPost(formData);
    setFormData({ title: "", text: "" });
  };

  return (
    <>
      <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1" onSubmit={onSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={onChange}
            required
          />
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            value={text}
            onChange={onChange}
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    </>
  );
};

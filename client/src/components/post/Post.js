import React, { useEffect } from "react";
import usePost from "../../hooks/usePost";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Comments } from "./Comments";

export const Post = (props) => {
  const { getPost } = usePost();
  const post = useSelector((state) => state.post.post);
  const { id } = useParams();

  useEffect(() => {
    getPost(id);
  }, []);

  if (!post){
    return <div>
        No post found
    </div>
  }

  return (
    <div>
      <div className="post bg-white p-1 my-1">
        <div>
          <a href="profile.html">
            <img
              className="round-img"
              src={post.avatar}
              alt=""
            />
            <h4>{post.name}</h4>
          </a>
        </div>
        <div>
          <h2>{post.title}</h2>
          <p className="my-1">{post.text}</p>
          <p className="post-date">
            Posted on {post.date}
          </p>
        </div>
      </div>
        <Comments />
    </div>
  );
};

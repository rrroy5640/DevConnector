import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import usePost from "../../hooks/usePost";

export const PostItem = (props) => {
  const { post } = props;
  const { _id, title, name, avatar, text, user, likes, comments, date } = post;
  const auth = useSelector((state) => state.auth);
  const userId = auth.user._id;

  const { addLike, removeLike, deletePost, getPosts } = usePost();
  const handleLike = (id) => {
    addLike(id);
    getPosts();
  };
  const handleUnlike = (id) => {
    removeLike(id);
    getPosts();
  };
  const handleDelete = (id) => {
    deletePost(id);
    getPosts();
  };

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link className="btn btn-primary" to={`/profile/${user}`}>
          <img src={avatar} className="round-img" alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <h4>{title}</h4>
        <p className="my-1">{text}</p>
        <p className="post-date">Posted on {date}</p>
        <button
          type="button"
          className="btn btn-light"
          onClick={() => handleLike(_id)}
        >
          <i className="fas fa-thumbs-up"></i>
          {likes?.length > 0 && <span>{likes.length}</span>}
        </button>
        <button
          type="button"
          className="btn btn-light"
          onClick={() => handleUnlike(_id)}
        >
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/post/${_id}`} className="btn btn-primary">
          Discussion{" "}
          {comments?.length > 0 && (
            <span className="comment-count">{comments.length}</span>
          )}
        </Link>
        {userId === user && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleDelete(_id)}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

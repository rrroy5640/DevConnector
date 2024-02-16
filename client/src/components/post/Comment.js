import React, {useEffect} from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import usePost from '../../hooks/usePost';
import Moment from 'react-moment';
import { useParams } from 'react-router-dom';

export const Comment = (props) => {
const { comment } = props;
const auth = useSelector((state) => state.auth);
const userId = auth.user._id;
const {deleteComment} = usePost();
const {id} = useParams();

const handleDelete = (postId, commentId) => {
    deleteComment(postId, commentId);
    console.log(postId, commentId);
}    

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${userId}`}>
          <img
            className="round-img"
            src={comment.avatar}
            alt=""
          />
          <h4>{comment.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{comment.text}</p>
        <p className="post-date">
            Posted on <Moment format="YYYY/MM/DD">{comment.date}</Moment>
        </p>
        {userId === comment.user && (
            <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleDelete(id, comment._id)}
            >
            <i className="fas fa-times"></i>
            </button>
        )}
      </div>        
    </div>
  )
}

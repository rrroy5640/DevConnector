import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import usePost from '../../hooks/usePost';
import { useParams } from 'react-router-dom';
import { Comment } from './Comment';

export const Comments = () => {
    const { getPost } = usePost();
    const post = useSelector((state) => state.post.post);
    const comments = post.comments;
    const  {id}  = useParams();
    const { addComment } = usePost();

    const [text, setText] = useState('');

    const handleAddComment = (e) => {
        e.preventDefault();
        console.log(id, text);
        addComment(id, {text});
        setText('');
    }

    const onChange = (e) => {
        setText(e.target.value);
    }

    useEffect(() => {
        getPost(id);
    }, []);

  return (<>
    {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
    ))}
    <div className="post-form">
        <div className="bg-primary p">
            <h3>Leave a Comment</h3>
        </div>
        <form className="form my-1" onSubmit={handleAddComment}>
            <textarea
                name="text"
                cols="30"
                rows="5"
                placeholder="Comment on this post"
                value={text}
                onChange={onChange}
                required
            ></textarea>
            <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
    </div>
  </>
  )
  
}

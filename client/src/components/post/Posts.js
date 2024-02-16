import React, {useEffect} from 'react'
import usePost from '../../hooks/usePost'
import { useSelector } from 'react-redux';
import { PostItem } from './PostItem';
import { PostForm } from './PostForm';

export const Posts = () => {
    const { getPosts } = usePost();
    const posts = useSelector((state) => state.post.posts);

    useEffect(() => {
        getPosts();
    },[]);

  if(!posts) return <div>Loading...</div>
    return (
        <div>
            <div className="posts">
                <h1 className="large text-primary">Posts</h1>
                <p className="lead">
                    <i className="fas fa-user"></i> Welcome to the community
                </p>
            </div>
            <PostForm />
        {posts.map((post) => (
            <PostItem key={post._id} post={post} />
        ))}
        </div>
    );
}
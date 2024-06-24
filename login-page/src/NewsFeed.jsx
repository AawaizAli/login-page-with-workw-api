import React, { useState, useEffect } from 'react';
import Post from './Post';
import './NewsFeed.css';

const NewsFeed = ({ newPosts }) => {
    const [posts, setPosts] = useState([]);

    const addPost = (newPosts) => {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    };

    useEffect(() => {
        setPosts(newPosts); 
    }, [newPosts]);

    return (
        <div className="news-feed">
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
};

export default NewsFeed;

import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "antd"
import { getAllFeeds } from "./slice/feedsSlice";
import { useDispatch } from "react-redux";
import { useState } from 'react'
import NewsFeed from './NewsFeed'


const LoginSuccess = () => {
    const location = useLocation();
    const { userName, accessToken } = location.state || { userName: 'User' };

    const [showFeed, setShowFeed] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [newPosts, setNewPosts] = useState([]);

    const dispatch = useDispatch();

    const handleClick = () => {
        setShowButton(false);
        setShowFeed(true);
        dispatch(getAllFeeds(accessToken))

            .unwrap()

            .then((data) => {
                console.log(data);
                setNewPosts(data);
            })

            .catch((err) => {
                console.error('Failed to login:', err);
            });
    };

    return (
        <div style={{ marginTop: '50px' }}>
            <div style={{ textAlign: 'center'}}>
                <h3 style={{ textAlign: 'center'}}>Welcome, {userName}!</h3>
                {showButton && <Button onClick={handleClick} type="primary">Get Feed</Button>}</div>
            {showFeed && <NewsFeed newPosts={newPosts} />}
        </div>
    );
};

export default LoginSuccess;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "antd";
import { getAllFeeds } from "./slice/feedsSlice";
import { useDispatch } from "react-redux";
import NewsFeed from './NewsFeed';

const LoginSuccess = () => {
    const location = useLocation();
    const { userName, accessToken } = location.state || { userName: 'User' };

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const debounce = (func, wait) => {
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    };
    

    const [showFeed, setShowFeed] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [newPosts, setNewPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);

    const dispatch = useDispatch();

    const handleClick = () => {
        setShowButton(false);
        setShowFeed(true);
        fetchPosts(currentPage);
    };

    const fetchPosts = async (page) => {
        setLoading(true);
        try {
            const data = await dispatch(getAllFeeds({ accessToken, pageNumber: page })).unwrap();
            console.log(data);
            setNewPosts((prevPosts) => [...prevPosts, ...data]); // Append new posts
            setTotalPages(data.totalPages); // Update total pages
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        if (
            window.innerHeight + window.pageYOffset >= document.body.offsetHeight
        ) {
            console.log('at bottom');
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const debouncedHandleScroll = debounce(handleScroll, 300);

    useEffect(() => {
        if (showFeed && currentPage > 1) {
            fetchPosts(currentPage);
        }
    }, [currentPage, showFeed]);

    useEffect(() => {
        if (showFeed) {
            window.addEventListener('scroll', debouncedHandleScroll);
        }
        return () => {
            window.removeEventListener('scroll', debouncedHandleScroll);
        };
    }, [showFeed, loading, currentPage, totalPages]);

    return (
        <div style={{ marginTop: '50px' }}>
            <div style={{ textAlign: 'center' }}>
                <h3 style={{ textAlign: 'center' }}>Welcome, {userName}!</h3>
                {showButton && <Button onClick={handleClick} type="primary">Get Feed</Button>}
            </div>
            {showFeed && <NewsFeed newPosts={newPosts} />}
        </div>
    );
};

export default LoginSuccess;

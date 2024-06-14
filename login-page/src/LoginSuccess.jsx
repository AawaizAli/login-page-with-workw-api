import React from "react";
import { useLocation } from "react-router-dom";

const LoginSuccess = () => {
    const location = useLocation();
    const { userName } = location.state || { userName: 'User' }; 

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h3>Welcome, {userName}!</h3>
        </div>
    );
};

export default LoginSuccess;

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";


function Home() {
    return (
        <>
            <div style={{textAlign: "center"}}>
                <h1>Welcome!</h1>
                <Button shape="round" type="primary" href='/login'>Login to Continue</Button>
            </div>
        </>
    );
}

export default Home
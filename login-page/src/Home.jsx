import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";


function Home() {
    return (
        <>
            <h1>Hello World</h1>
            <Button shape="round" type="primary" href='/login'>Login to Continue</Button>
        </>
    );
}

export default Home
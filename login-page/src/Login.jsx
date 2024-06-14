import React from "react";
import { Button, Checkbox, Form, Input, Alert } from 'antd';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "./slice/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {loading, error} = useSelector(state => state.user)

    const handleLogin = (e) => {
        console.log(e);
        let user = {
            email: e.Email,
            password: e.password,
        }
        dispatch(loginUser(user))
            .then((result) => {
                if (loginUser.fulfilled.match(result)) {
                    setEmail('');
                    setPassword('');
                    const userName = result.payload.name;
                    navigate('/login-success', { state: { userName } });
                } else {
                    console.error('Login failed');
                }
            })
            .catch((err) => {
                console.error('Failed to login:', err);
            });
    }

    return (
        <>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 10,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}

                onFinish={e => handleLogin(e)}
            >
                <Form.Item
                    label="Email"
                    name="Email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                    ]}
                >
                    <Input value={email} onChange={e => {setEmail}}/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password value={password} onChange={e => {setPassword}}/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        {loading ? 'Loading..' : 'Submit'}
                    </Button>
                    {error && (
                        <Alert message={error} type="error" />
                    )}
                </Form.Item>
            </Form>
        </>
    )
}

export default Login
import React, { FC } from 'react';
import { Button, Card, Form, Input } from "antd";
import { IDataForAuth } from "../../types/auth";
import Logo from "../ui/Logo/Logo";
import styles from "./Auth.module.scss";

interface IProps {
    fetching: boolean,
    onAuth: (values: IDataForAuth) => void,
}

const Auth: FC<IProps> = ({fetching, onAuth}) => {
    const handleSubmit = (values: IDataForAuth) => {
        onAuth(values);
    };

    return (
        <Card className={styles.loginForm}>
            <Logo isMini={false}/>
            <Form onFinish={handleSubmit}>
                <p>Login</p>
                <Form.Item
                    name="username"
                    rules={[{required: true, message: "Field is required"}]}
                >
                    <Input placeholder="Enter your login" className={'input'}/>
                </Form.Item>
                <p>Password</p>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: "Field is required"}]}
                >
                    <Input type="password" placeholder="Enter your password" className={'input'}/>
                </Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className={styles.loginBtn}
                    block
                    loading={fetching}
                >
                    Log In
                </Button>
            </Form>
        </Card>
    );
};

export default Auth;
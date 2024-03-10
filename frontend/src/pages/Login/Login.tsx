import React, { FC } from 'react';
// import { useHistory } from "react-routers-dom";
import { message } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IDataForAuth } from "../../types/auth";
import { authAction } from "../../store/auth/AuthActions";
import Auth from "../../components/Auth/Auth";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";

const Login: FC = () => {
    const dispatch = useAppDispatch();
    // const history = useHistory();
    const navigate = useNavigate();

    const auth = useAppSelector((state) => state.authReducer);


    const onAuth = async (data: IDataForAuth) => {
        await dispatch(authAction(data));
        if (auth.error) {
            message.error(auth.error);
        } else {
            navigate('/');
        }
    };

    return (
        <div className={styles.loginPage}>
            <Auth onAuth={onAuth} fetching={auth.fetching} />
        </div>
    );
};

export default Login;
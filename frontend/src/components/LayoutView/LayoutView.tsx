import React, { useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchProfileAction } from "../../store/profile/ProfileActions";
import Sidebar from "../Layout/Sidebar/Sidebar";
import Header from "../Layout/Header/Header";

const LayoutView = () => {
    const dispatch = useAppDispatch();
    const {data: profileData} = useAppSelector((state) => state.profileReducer);

    useEffect(() => {
        const fetchProfile = async () => {
            await dispatch(fetchProfileAction());
        };

        void fetchProfile();
    }, []);

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sidebar/>
            <Layout>
                <Header
                    profileName={profileData?.full_name || ''}
                />
                {profileData &&
                    (
                        <div className={'content'}>
                            <Outlet/>
                        </div>
                    )
                }
            </Layout>
        </Layout>
    );
};

export default LayoutView;
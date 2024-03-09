import React, { FC } from 'react';
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface IProps {
    size?: number
}

const MiniLoader: FC<IProps> = ({size = 30}) => {
    return <Spin indicator={<LoadingOutlined style={{ fontSize: size, color: '#FF6600' }} spin />} />
};

export default MiniLoader;
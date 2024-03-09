import React, { FC } from 'react';
import { Alert } from "antd";

interface IProps {
    errorMsg: string,
}

const ErrorMessage: FC<IProps> = ({errorMsg}) => {
    return (
        <Alert
            message="Error:"
            description={errorMsg}
            type="error"
            style={{margin: '20px 0'}}
        />
    );
};

export default ErrorMessage;
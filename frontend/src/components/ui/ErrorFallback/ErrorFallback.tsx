"use client";

import { FallbackProps } from "react-error-boundary";
import { Result } from "antd";
import AccentButton from "../AccentButton/AccentButton";

function ErrorFallback({error, resetErrorBoundary}: FallbackProps) {
    return (
        <Result
            status={500}
            title="An error occurred:"
            subTitle={error.message}
            extra={<AccentButton title={'Try again'} click={resetErrorBoundary}/>}
        />
    );
}

export default ErrorFallback;

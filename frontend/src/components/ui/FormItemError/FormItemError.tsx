import React, { FC } from 'react';
import { useTranslation } from "react-i18next";

interface IProps {
    errorType: string,
    errorTitle: string,
    restProps: boolean[],
}

const FormItemError: FC<IProps> = ({errorType, errorTitle, restProps}) => {
    const {t} = useTranslation();

    const showError = restProps.every(prop => prop);

    if (showError) {
        return <p className={errorType}>{t(errorTitle)}</p>;
    } else {
        return null;
    }
};

export default FormItemError;
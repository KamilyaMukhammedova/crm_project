import React, { FC, PropsWithChildren } from 'react';
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { ButtonHTMLType } from "antd/es/button";
import styles from './AccentButton.module.scss';

interface IProps {
    title: string,
    click?: () => void,
    isDisabled?: boolean,
    isLarge?: boolean,
    loading?: boolean,
    htmlType?: ButtonHTMLType,
}

const AccentButton: FC<PropsWithChildren<IProps>> = ({
                                                         title,
                                                         click,
                                                         isDisabled,
                                                         isLarge,
                                                         children,
                                                         loading,
                                                         htmlType
                                                     }) => {
    const {t} = useTranslation();

    return (
        <Button
            className={[styles.accentButton, isLarge && styles.large].join(' ')}
            onClick={click}
            disabled={isDisabled}
            loading={loading !== undefined && loading}
            htmlType={htmlType ? htmlType : 'button'}
        >
            {children}
            {t(title)}
        </Button>
    );
};

export default AccentButton;
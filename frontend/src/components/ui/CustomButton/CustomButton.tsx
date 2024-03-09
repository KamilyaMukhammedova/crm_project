import React, { FC } from 'react';
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import pencilIcon from "../../../assets/pencil_icon.svg";
import pencilGreyIcon from "../../../assets/pencil_grey.svg";
import styles from "./CustomButton.module.scss";

interface IProps {
    click?: () => void,
    isDisabled?: boolean,
    icon?: string,
    title?: string,
    alt?: string,
    isRed?: boolean,
    isGreen?: boolean,
}

const CustomButton: FC<IProps> = ({
                                      click,
                                      isDisabled,
                                      icon,
                                      title,
                                      alt,
                                      isRed,
                                      isGreen,
                                  }) => {
    const {t} = useTranslation();

    const renderIcon = () => {
        if (!isDisabled && !icon) {
            return pencilIcon;
        } else if (isDisabled && !icon) {
            return pencilGreyIcon;
        } else if ((isDisabled || !isDisabled) && icon) {
            return icon;
        } else {
            return '';
        }
    };

    return (
        <Button
            type={'text'}
            onClick={click}
            disabled={isDisabled}
            className={[styles.customButton, isGreen && styles.customButton_green, isRed && styles.customButton_red].join(' ')}
        >
            <img
                src={renderIcon()}
                alt={`${!alt ? 'Edit' : alt} icon`}
                style={{width: '20px', height: '20px'}}
            />
            <span>{t(!title ? "Edit" : title)}</span>
        </Button>
    );
};

export default CustomButton;
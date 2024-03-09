import React, { ButtonHTMLAttributes, FC } from 'react';
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import trashIcon from "../../../assets/trash_icon.svg";
import trashGreyIcon from "../../../assets/trash_grey.svg";
import styles from "./DeleteButton.module.scss";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    click?: (event: React.MouseEvent<HTMLButtonElement>) => void,
    isDisabled?: boolean,
    title?: string,
}

const DeleteButton: FC<IProps> = ({ click, isDisabled, title }) => {
    const {t} = useTranslation();

    return (
        <Button
            type={'text'}
            onClick={(event) => click?.(event as React.MouseEvent<HTMLButtonElement>)}
            className={styles.deleteButton}
            disabled={isDisabled}
        >
            <img
                src={!isDisabled ? trashIcon : trashGreyIcon}
                alt={'Trash icon'}
            />
            <span>{t(title ? title : "Delete")}</span>
        </Button>
    );
};

export default DeleteButton;
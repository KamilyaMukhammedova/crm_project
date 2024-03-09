import React, { FC, PropsWithChildren } from 'react';
import { useTranslation } from "react-i18next";
import { Button, Modal } from "antd";
import AccentButton from "../AccentButton/AccentButton";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import styles from "./ModalWindow.module.scss";

interface IProps {
    isModalOpen: boolean,
    onCancel: () => void,
    onConfirm: () => void,
    okBtnTitle: string,
    title: string,
    isFooterFlex?: boolean,
    loading?: boolean,
    confirmBtnDisabled?: boolean,
    error?: string,
}

const ModalWindow: FC<PropsWithChildren<IProps>> = ({
                                                        isModalOpen,
                                                        onCancel,
                                                        onConfirm,
                                                        okBtnTitle,
                                                        title,
                                                        children,
                                                        isFooterFlex,
                                                        loading,
                                                        confirmBtnDisabled,
                                                        error,
                                                    }) => {
    const {t} = useTranslation();
    const isModalWithForm = title.includes('Create') || title.includes('Edit') || title.includes('Change');

    return (
        <Modal
            open={isModalOpen}
            closeIcon={false}
            footer={null}
            className={styles.modalWindow}
        >
            <p className={styles.modalWindow__text}>{t(title)}</p>
            <div className={styles.modalWindow__divider}/>
            {error && <ErrorMessage errorMsg={error}/>}
            {
                isModalWithForm ?
                    <form
                        className={styles.modalWindow__wrapper}
                        onSubmit={(event) => event.preventDefault()}
                    >
                        {children}
                    </form>
                    :
                    children
            }
            <div className={isFooterFlex ? styles.modalWindow__footerFlex : ''}>
                <Button
                    type={!isFooterFlex ? 'text' : 'default'}
                    onClick={onCancel}
                    className={!isFooterFlex ? styles.modalWindow__cancelBtn : styles.modalWindow__cancelBtnOutlined}
                >
                    {t("Cancel")}
                </Button>
                <AccentButton
                    title={okBtnTitle}
                    isLarge={true}
                    click={onConfirm}
                    loading={loading}
                    isDisabled={confirmBtnDisabled}
                    htmlType={isModalWithForm ? 'submit' : 'button'}
                />
            </div>
        </Modal>
    );
};

export default ModalWindow;
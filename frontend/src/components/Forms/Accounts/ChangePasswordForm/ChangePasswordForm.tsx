import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Input } from 'antd';
import { FORM_ERROR_MESSAGES, FORM_REQUIRED_MESSAGES } from "../../../../constants/form";
import { IPasswordFormState } from "../../../../types/initialFormStates";
import ModalWindow from "../../../ui/ModalWindow/ModalWindow";
import ErrorMessage from "../../../ui/ErrorMessage/ErrorMessage";
import FormItemError from "../../../ui/FormItemError/FormItemError";

interface IProps {
    isModalOpen: boolean,
    onCancel: () => void,
    onConfirm: () => void,
    loading: boolean,
    checkRequiredFields: boolean,
    passwordState: IPasswordFormState,
    setPasswordState: React.Dispatch<React.SetStateAction<IPasswordFormState>>,
    error?: string,
}

const ChangePasswordForm: FC<IProps> = ({
                                            isModalOpen,
                                            onCancel,
                                            onConfirm,
                                            loading,
                                            checkRequiredFields,
                                            passwordState,
                                            setPasswordState,
                                            error,
                                        }) => {
    const {t} = useTranslation();

    const [passwordsMatch, setPasswordsMatch] = useState(true);

    useEffect(() => {
        setPasswordsMatch(!Boolean((passwordState.password && passwordState.passwordRepeat) && (passwordState.password !== passwordState.passwordRepeat)));
    }, [passwordState]);

    const onChange = (value: string, name: string) => {
        setPasswordState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <ModalWindow
            isModalOpen={isModalOpen}
            onCancel={onCancel}
            onConfirm={onConfirm}
            okBtnTitle={'Change'}
            title={'Change password'}
            isFooterFlex={true}
            loading={loading}
            confirmBtnDisabled={!passwordsMatch}
        >
            <div className={'formInModal'}>
                {error && <ErrorMessage errorMsg={error}/>}
                <div className={'formInModal__itemWrapper formInModal__firstItemWrapper'}>
                    <p>{t("New password")}</p>
                    <Input.Password
                        placeholder={t("Write new password")}
                        className={'input inputPassword'}
                        value={passwordState.password}
                        name={'password'}
                        onChange={event => onChange(event.target.value, event.target.name)}
                        status={(checkRequiredFields && !passwordState.password )? 'error' : ''}
                        allowClear={true}
                    />
                    <FormItemError
                        errorType={'error'}
                        errorTitle={FORM_REQUIRED_MESSAGES.password}
                        restProps={[checkRequiredFields, !passwordState.password]}
                    />
                </div>
                <div className={'formInModal__itemWrapper formInModal__lastItemWrapper'}>
                    <p>{t("Password repeat")}</p>
                    <Input.Password
                        placeholder={t("Repeat password")}
                        className={'input inputPassword'}
                        value={passwordState.passwordRepeat}
                        name={'passwordRepeat'}
                        onChange={event => onChange(event.target.value, event.target.name)}
                        status={!passwordsMatch || (checkRequiredFields && !passwordState.passwordRepeat) ? 'error' : ''}
                        allowClear={true}
                    />
                    <FormItemError
                        errorType={'error'}
                        errorTitle={FORM_ERROR_MESSAGES.passwords_match}
                        restProps={[!passwordsMatch]}
                    />
                    <FormItemError
                        errorType={'error'}
                        errorTitle={FORM_REQUIRED_MESSAGES.passwordRepeat}
                        restProps={[checkRequiredFields, !passwordState.passwordRepeat]}
                    />
                </div>
            </div>
        </ModalWindow>
    );
};

export default ChangePasswordForm;
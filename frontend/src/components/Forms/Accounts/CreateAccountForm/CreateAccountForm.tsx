import React, { FC } from 'react';
import { useTranslation } from "react-i18next";
import { Select } from "antd";
import { FORM_REQUIRED_MESSAGES, USER_ROLES } from "../../../../constants/form";
import { ICreatedAccount } from "../../../../types/accounts";
import ModalWindow from "../../../ui/ModalWindow/ModalWindow";
import FormItem from "../../../ui/FormItem/FormItem";
import Status from "../../../Status/Status";
import ErrorMessage from "../../../ui/ErrorMessage/ErrorMessage";
import FormItemError from "../../../ui/FormItemError/FormItemError";

interface IProps {
    isModalOpen: boolean,
    onCancel: () => void,
    onConfirm: () => void,
    loading: boolean,
    isEditedMode: boolean,
    checkRequiredFields: boolean,
    accountState: ICreatedAccount,
    setAccountState: React.Dispatch<React.SetStateAction<ICreatedAccount>>,
    error?: string,
}

const CreateAccountForm: FC<IProps> = ({
                                           isModalOpen,
                                           onCancel,
                                           onConfirm,
                                           loading,
                                           isEditedMode,
                                           checkRequiredFields,
                                           accountState,
                                           setAccountState,
                                           error,
                                       }) => {
    const {t} = useTranslation();

    const onChange = (value: string | boolean | number, name: string) => {
        setAccountState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <ModalWindow
            isModalOpen={isModalOpen}
            onCancel={onCancel}
            onConfirm={onConfirm}
            okBtnTitle={`${!isEditedMode ? 'Create' : 'Save'}`}
            title={`${!isEditedMode ? 'Create a new' : 'Edit an'} account`}
            isFooterFlex={true}
            loading={loading}
        >
            <div className={'formInModal'}>
                {error && <ErrorMessage errorMsg={error}/>}
                {
                    !isEditedMode &&
                    <div className={'formInModal__itemWrapper formInModal__firstItemWrapper'}>
                        <FormItem
                            title={'User name'}
                            name={'username'}
                            value={accountState.username}
                            placeholder={'Write user name'}
                            onChange={onChange}
                            requiredErrorProps={[checkRequiredFields, !accountState.username]}
                        />
                    </div>
                }
                <div className={`formInModal__itemWrapper ${isEditedMode ? 'formInModal__firstItemWrapper' : ''}`}>
                    <FormItem
                        title={'Full name'}
                        name={'full_name'}
                        value={accountState.full_name}
                        placeholder={'Write full name'}
                        onChange={onChange}
                        requiredErrorProps={[checkRequiredFields, !accountState.full_name]}
                    />
                </div>
                {
                    !isEditedMode &&
                    <div className={'formInModal__itemWrapper'}>
                        <FormItem
                            title={'Password'}
                            name={'password'}
                            value={accountState.password}
                            placeholder={'Write password'}
                            onChange={onChange}
                            requiredErrorProps={[checkRequiredFields, !accountState.password]}
                        />
                    </div>
                }
                <div className={'formInModal__itemWrapper'}>
                    <p>{t("Role")}</p>
                    <Select
                        className={checkRequiredFields && !accountState.type ? 'custom-error-select' : 'custom-select'}
                        style={{width: '100%'}}
                        placeholder={t("Choose role")}
                        onChange={value => onChange(+value, 'type')}
                        value={accountState.type ? accountState.type : undefined}
                        options={USER_ROLES.map(user => {
                            return {
                                value: user.value,
                                label: user.label,
                            }
                        })}
                    />
                    <FormItemError
                        errorType={'error'}
                        errorTitle={FORM_REQUIRED_MESSAGES.role}
                        restProps={[checkRequiredFields, !accountState.type]}
                    />
                </div>
                <div className={'formInModal__itemWrapper formInModal__lastItemWrapper'}>
                    <Status
                        statusFromParent={Boolean(accountState?.is_active)}
                        getStatusState={onChange}
                        isAlignedStart={true}
                        name={'is_active'}
                    />
                </div>
            </div>
        </ModalWindow>
    );
};

export default CreateAccountForm;
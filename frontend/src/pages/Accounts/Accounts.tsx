import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { message } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { BasicPageProps, useBasicPage } from "../../hooks/useBasicPage";
import { ICreateEditInModal, useCreateEdit } from "../../hooks/useCreateEdit";
import { INITIAL_STATE_ACCOUNT, INITIAL_STATE_PASSWORD } from "../../constants/initialState";
import { BREADCRUMBS_ITEMS, generateColumns } from "./constants";
import { FORM_ERROR_MESSAGES, FORM_SUCCESS_MESSAGES } from "../../constants/form";
import { createStateObjForEditForm, formHasEmptyValues } from "../../utils/createEditForm";
import { navigateToFirstAndFetch } from "../../utils/navigateToPage";
import { IAccount, ICreatedAccount } from "../../types/accounts";
import { IPasswordFormState } from "../../types/initialFormStates";
import {
    createAccountAction,
    editAccountAction,
    editAccountPasswordAction,
    fetchAccountsListAction
} from "../../store/accounts/AccountsActions";
import BasicPage from "../../components/BasicPage/BasicPage";
import ChangePasswordForm from "../../components/Forms/Accounts/ChangePasswordForm/ChangePasswordForm";
import CreateAccountForm from "../../components/Forms/Accounts/CreateAccountForm/CreateAccountForm";

const Accounts: FC = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const {editPasswordFetching} = useAppSelector(state => state.accountsReducer);

    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
    const [formEditPasswordError, setFormEditPasswordError] = useState('');
    const [password, setPassword] = useState<IPasswordFormState>({...INITIAL_STATE_PASSWORD});
    const [accountState, setAccountState] = useState<ICreatedAccount>({...INITIAL_STATE_ACCOUNT});

    const pageProps = useBasicPage(
        fetchAccountsListAction,
        state => state.accountsReducer,
        'accounts',
        false,
        false,
    ) as BasicPageProps;

    const createEditProps = useCreateEdit(
        true,
        state => state.accountsReducer,
        undefined,
        INITIAL_STATE_ACCOUNT,
        setAccountState,
    ) as ICreateEditInModal;

    useEffect(() => {
        setAccountState({...INITIAL_STATE_ACCOUNT});
    }, []);

    useEffect(() => {
        if (createEditProps.isEditedMode && createEditProps.currentItemId) {
            const account = pageProps.data.results.find((item: IAccount) => item._id === createEditProps.currentItemId);

            if (account) {
                const editedAccountData: ICreatedAccount = createStateObjForEditForm(INITIAL_STATE_ACCOUNT, account);

                setAccountState(editedAccountData);
            }
        }
    }, [createEditProps.isEditedMode, createEditProps.currentItemId]);

    const openChangePasswordModal = (id: string) => {
        createEditProps.setCurrentItemId(id);
        setIsChangePasswordModalOpen(true);
        setFormEditPasswordError('');
    };

    const closeChangePasswordModal = () => {
        createEditProps.setCurrentItemId(null);
        setIsChangePasswordModalOpen(false);
        createEditProps.setCheckRequiredFields(false);
        setPassword({...INITIAL_STATE_PASSWORD});
    };

    const onSearchConfirm = async (query: string) => {
        pageProps.setCurrentPage('?page=1&');

        await dispatch(fetchAccountsListAction(query));
    };

    const onChangePasswordConfirm = async () => {
        if (formHasEmptyValues(password)) {
            createEditProps.setCheckRequiredFields(true);
            message.error(t(FORM_ERROR_MESSAGES.fields_required));
        } else {
            if (createEditProps.currentItemId) {
                await dispatch(editAccountPasswordAction({
                    password: password.password,
                    accountId: createEditProps.currentItemId.toString(),
                })).unwrap()
                    .then(async () => {
                        setIsChangePasswordModalOpen(false);
                        setPassword({...INITIAL_STATE_PASSWORD});
                        await navigateToFirstAndFetch(pageProps.setCurrentPage, dispatch, fetchAccountsListAction);
                        message.success(t(FORM_SUCCESS_MESSAGES.password));
                    })
                    .catch((rejectedValueOrSerializedError) => {
                        setFormEditPasswordError(rejectedValueOrSerializedError.message);
                    });

                createEditProps.setCheckRequiredFields(false);
            }
        }
    };

    const onCreateConfirm = async () => {
        if (!createEditProps.isEditedMode) {
            if (formHasEmptyValues(accountState)) {
                createEditProps.setCheckRequiredFields(true);
                message.error(t(FORM_ERROR_MESSAGES.fields_required));
            } else {
                await dispatch(createAccountAction(accountState)).unwrap()
                    .then(async () => {
                        createEditProps.setFormCreateError('');
                        await createEditProps.onActionsAfterCreateAndEdit({
                            setCurrentPage: pageProps.setCurrentPage,
                            fetchAction: fetchAccountsListAction
                        });
                        message.success(t(FORM_SUCCESS_MESSAGES.account_created));
                    })
                    .catch((rejectedValueOrSerializedError) => {
                        createEditProps.setFormCreateError(rejectedValueOrSerializedError.message);
                    });

                createEditProps.setCheckRequiredFields(false);
            }
        } else if (createEditProps.isEditedMode && createEditProps.currentItemId) {
            const editedState = {
                full_name: accountState.full_name,
                type: accountState.type,
                is_active: accountState.is_active !== undefined ? accountState.is_active : false,
            };

            if (formHasEmptyValues(editedState)) {
                createEditProps.setCheckRequiredFields(true);
                message.error(t(FORM_ERROR_MESSAGES.fields_required));
            } else {
                await dispatch(editAccountAction({
                    dataToEdit: editedState,
                    accountId: createEditProps.currentItemId.toString()
                })).unwrap()
                    .then(async () => {
                        createEditProps.setFormEditError('');
                        await createEditProps.onActionsAfterCreateAndEdit({
                            setCurrentPage: pageProps.setCurrentPage,
                            fetchAction: fetchAccountsListAction
                        });
                        message.success(t(FORM_SUCCESS_MESSAGES.account_edited));
                    })
                    .catch((rejectedValueOrSerializedError) => {
                        createEditProps.setFormEditError(rejectedValueOrSerializedError.message);
                    });

                createEditProps.setCurrentItemId(null);
                createEditProps.setCheckRequiredFields(false);
            }
        }
    };

    return (
        <>
            <BasicPage
                fetching={pageProps.fetching}
                breadcrumbItems={BREADCRUMBS_ITEMS}
                onCreate={createEditProps.handleOpenCreateModal}
                data={pageProps.data && pageProps.data.results}
                columns={generateColumns(createEditProps.handleOpenEditModal, openChangePasswordModal)}
                totalItems={pageProps.data && pageProps.data.count}
                onPagination={pageProps.onPagination}
                errorMsg={pageProps.error}
                searchIsRequired={true}
                onSearchConfirm={onSearchConfirm}
            />
            <ChangePasswordForm
                isModalOpen={isChangePasswordModalOpen}
                onCancel={closeChangePasswordModal}
                onConfirm={onChangePasswordConfirm}
                loading={editPasswordFetching}
                passwordState={password}
                setPasswordState={setPassword}
                error={formEditPasswordError}
                checkRequiredFields={createEditProps.checkRequiredFields}
            />
            <CreateAccountForm
                isModalOpen={createEditProps.isModalCreateOpen}
                onCancel={createEditProps.handleCloseCreateModal}
                onConfirm={onCreateConfirm}
                loading={createEditProps.createFetching || createEditProps.editFetching}
                isEditedMode={createEditProps.isEditedMode}
                accountState={accountState}
                setAccountState={setAccountState}
                error={createEditProps.isEditedMode ? createEditProps.formEditError : createEditProps.formCreateError}
                checkRequiredFields={createEditProps.checkRequiredFields}
            />
        </>
    );
};

export default Accounts;
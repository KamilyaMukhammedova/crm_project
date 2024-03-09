import React, { FC, useState } from 'react';
import {  useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { message } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { BasicPageProps, useBasicPage } from "../../../hooks/useBasicPage";
import { BREADCRUMBS_ITEMS, generateColumns } from "./constants";
import { navigateToFirstAndFetch } from "../../../utils/navigateToPage";
import { editUserStatusAction, fetchUsersListAction } from "../../../store/users/UsersActions";
import BasicPage from "../../../components/BasicPage/BasicPage";
import ModalWindow from "../../../components/ui/ModalWindow/ModalWindow";

const UsersList: FC = () => {
    const {t} = useTranslation();
    // const history = useHistory();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const pageProps = useBasicPage(
        fetchUsersListAction,
        state => state.usersReducer,
        'users',
        false,
        false,
    ) as BasicPageProps;

    const {editStatusFetching} = useAppSelector(state => state.usersReducer);

    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [statusChangeError, setStatusChangeError] = useState('');
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);
    const [currentUserStatus, setCurrentUserStatus] = useState<boolean | null>(null);

    const onSearchConfirm = async (query: string) => {
        pageProps.setCurrentPage('?page=1&');

        await dispatch(fetchUsersListAction(query));
    };

    const onUserPurchases = (userId: number, userPhoneNumber: string) => {
        const languageFromUrl = new URLSearchParams(window.location.search).get('lang') || 'en';
        navigate(`/users_and_accounts/users/${userId}/${userPhoneNumber}/purchases?lang=${languageFromUrl}`);
    };

    const openStatusModal = (userId: number, userStatus: boolean) => {
        setCurrentUserId(userId);
        setCurrentUserStatus(userStatus);
        setIsStatusModalOpen(true);
        setStatusChangeError('');
    };

    const onStatusChangeConfirm = async () => {
        if (currentUserId && currentUserStatus !== null) {
            await dispatch(editUserStatusAction({
                is_active: !currentUserStatus,
                userId: currentUserId.toString(),
            })).unwrap()
                .then(async () => {
                    setStatusChangeError('');
                    setIsStatusModalOpen(false);
                    setCurrentUserId(null);
                    setCurrentUserStatus(null);

                    await navigateToFirstAndFetch(pageProps.setCurrentPage, dispatch, fetchUsersListAction);
                    message.success(t("User's status was successfully changed!"));
                })
                .catch((rejectedValueOrSerializedError) => {
                    setStatusChangeError(rejectedValueOrSerializedError.message);
                });
        }
    };

    return (
        <>
            <BasicPage
                fetching={pageProps.fetching}
                breadcrumbItems={BREADCRUMBS_ITEMS}
                data={pageProps.data && pageProps.data.results}
                columns={generateColumns(onUserPurchases, openStatusModal)}
                totalItems={pageProps.data && pageProps.data.count}
                onPagination={pageProps.onPagination}
                errorMsg={pageProps.error}
                isCreateBtnDisabled={true}
                searchIsRequired={true}
                onSearchConfirm={onSearchConfirm}
            />
            <ModalWindow
                isModalOpen={isStatusModalOpen}
                onCancel={() => setIsStatusModalOpen(false)}
                onConfirm={onStatusChangeConfirm}
                okBtnTitle={`${currentUserStatus ? 'Deactivate' : 'Activate'}`}
                title={`Are you sure to ${currentUserStatus ? 'deactivate' : 'activate'}?`}
                loading={editStatusFetching}
                error={statusChangeError}
            />
        </>
    );
};

export default UsersList;
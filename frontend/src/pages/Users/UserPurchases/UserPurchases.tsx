import React, { FC } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux";
import { PageWithParamsProps, usePageWithParams } from "../../../hooks/usePageWithParams";
import { generateBreadCrumbs, generateColumns } from "./constants";
import { fetchUserPurchasesAction } from "../../../store/users/UsersActions";
import BasicPage from "../../../components/BasicPage/BasicPage";

const UserPurchases: FC = () => {
    // const history = useHistory();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const {userId} = useParams<{ userId: string }>();
    const {userPhoneNumber} = useParams<{ userPhoneNumber: string }>();

    const pageProps = usePageWithParams(
        fetchUserPurchasesAction,
        state => state.usersReducer,
        'user_purchases',
        'purchasesData',
        'purchasesFetching',
        'purchasesError',
        {userId: userId || ''},
    ) as PageWithParamsProps;

    const onPurchaseItems = (purchaseId: number) => {
        const languageFromUrl = new URLSearchParams(window.location.search).get('lang') || 'en';
        navigate(`/users_and_accounts/users/${userId}/${userPhoneNumber}/purchases/${purchaseId}?lang=${languageFromUrl}`);
    };

    const onSearchConfirm = async (query: string) => {
        pageProps.setCurrentPage('?page=1&');

        await dispatch(fetchUserPurchasesAction({
            userId: userId || '',
            query: query,
        }));
    };

    return (
        <BasicPage
            fetching={pageProps.fetching}
            breadcrumbItems={generateBreadCrumbs(userId || '', userPhoneNumber || '')}
            data={pageProps.data && pageProps.data.results}
            columns={generateColumns(onPurchaseItems)}
            totalItems={pageProps.data && pageProps.data.count}
            onPagination={pageProps.onPagination}
            createBtnIsNotRequired={true}
            errorMsg={pageProps.error}
            searchIsRequired={true}
            onSearchConfirm={onSearchConfirm}
        />
    );
};

export default UserPurchases;
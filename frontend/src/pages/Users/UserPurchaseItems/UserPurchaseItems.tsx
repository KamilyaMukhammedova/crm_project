import React, { FC } from 'react';
import { useParams } from "react-router-dom";
import { PageWithParamsProps, usePageWithParams } from "../../../hooks/usePageWithParams";
import { COLUMNS, generateBreadCrumbs } from "./constants";
import { fetchUserPurchaseItemsAction } from "../../../store/users/UsersActions";
import BasicPage from "../../../components/BasicPage/BasicPage";

const UserPurchaseItems: FC = () => {
    const {userId} = useParams<{ userId: string }>();
    const {userPhoneNumber} = useParams<{ userPhoneNumber: string }>();
    const {purchaseId} = useParams<{ purchaseId: string }>();

    const pageProps = usePageWithParams(
        fetchUserPurchaseItemsAction,
        state => state.usersReducer,
        'user_purchase_items',
        'purchaseItemsData',
        'purchaseItemsFetching',
        'purchaseItemsError',
        {userId: userId || '', purchaseId: purchaseId || ''},
    ) as PageWithParamsProps;

    return (
        <BasicPage
            fetching={pageProps.fetching}
            breadcrumbItems={generateBreadCrumbs(userId || '', userPhoneNumber || '', purchaseId || '')}
            data={pageProps.data && pageProps.data.results}
            columns={COLUMNS}
            totalItems={pageProps.data && pageProps.data.count}
            onPagination={pageProps.onPagination}
            createBtnIsNotRequired={true}
            errorMsg={pageProps.error}
        />
    );
};

export default UserPurchaseItems;
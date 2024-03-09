import React, { FC } from 'react';
import { useAppDispatch } from "../../hooks/redux";
import { BasicPageProps, useBasicPage } from "../../hooks/useBasicPage";
import { fetchStoresListAction } from "../../store/stores/StoresActions";
import { BREADCRUMBS_ITEMS, COLUMNS } from "./constants";
import BasicPage from "../../components/BasicPage/BasicPage";

const Stores: FC = () => {
    const dispatch = useAppDispatch();

    const pageProps = useBasicPage(
        fetchStoresListAction,
        state => state.storesReducer,
        'stores',
        false,
        false,
    ) as BasicPageProps;

    const onSearchConfirm = async (query: string) => {
        pageProps.setCurrentPage('?page=1&');
        await dispatch(fetchStoresListAction(query));
    };

    return (
        <>
            <BasicPage
                fetching={pageProps.fetching}
                breadcrumbItems={BREADCRUMBS_ITEMS}
                data={pageProps.data && pageProps.data.results}
                columns={COLUMNS}
                totalItems={pageProps.data && pageProps.data.count}
                onPagination={pageProps.onPagination}
                errorMsg={pageProps.error}
                isCreateBtnDisabled
                searchIsRequired={true}
                onSearchConfirm={onSearchConfirm}
            />
        </>
    );
};

export default Stores;
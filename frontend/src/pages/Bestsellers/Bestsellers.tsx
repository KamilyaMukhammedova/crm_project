import React, { FC } from 'react';
import { BasicPageProps, useBasicPage } from "../../hooks/useBasicPage";
import { BREADCRUMBS_ITEMS, COLUMNS } from "./constants";
import { fetchBestsellersListAction } from "../../store/bestsellers/BestsellersActions";
import BasicPage from "../../components/BasicPage/BasicPage";

const Bestsellers: FC = () => {
    const pageProps = useBasicPage(
        fetchBestsellersListAction,
        state => state.bestsellersReducer,
        'bestsellers',
        false,
        false,
    ) as BasicPageProps;

    return (
        <BasicPage
            fetching={pageProps.fetching}
            breadcrumbItems={BREADCRUMBS_ITEMS}
            data={pageProps.data && pageProps.data.results}
            columns={COLUMNS}
            totalItems={pageProps.data && pageProps.data.count}
            onPagination={pageProps.onPagination}
            errorMsg={pageProps.error}
            isCreateBtnDisabled
        />
    );
};

export default Bestsellers;



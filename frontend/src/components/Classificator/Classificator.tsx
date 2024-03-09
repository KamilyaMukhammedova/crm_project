import React, { FC } from 'react';
import { useAppDispatch } from "../../hooks/redux";
import { BasicPageProps, useBasicPage } from "../../hooks/useBasicPage";
import { CLASSIFICATORS_OTHER_COLUMNS, CLASSIFICATORS_REGULAR_COLUMNS, getBreadcrumbsItems } from "./constants";
import { fetchClassificatorsListAction } from "../../store/classificators/ClassificatorsActions";
import BasicPage from "../BasicPage/BasicPage";

interface IProps {
    classificatorPath: string,
    classificatorName: string,
    queryTypeName: string,
}

const Classificator: FC<IProps> = ({classificatorName, classificatorPath, queryTypeName}) => {
    const dispatch = useAppDispatch();

    const pageProps = useBasicPage(
        fetchClassificatorsListAction,
        state => state.classificatorsReducer,
        queryTypeName,
        true,
        false,
    ) as BasicPageProps;

    const onSearchConfirm = async (query: string) => {
        pageProps.setCurrentPage('?page=1&');

        await dispatch(fetchClassificatorsListAction({
            typeNameQuery: queryTypeName,
            otherQuery: query,
        }));
    };

    return (
        <BasicPage
            fetching={pageProps.fetching}
            breadcrumbItems={getBreadcrumbsItems(classificatorPath, classificatorName)}
            data={pageProps.data && pageProps.data.results}
            columns={CLASSIFICATORS_OTHER_COLUMNS[queryTypeName as keyof typeof CLASSIFICATORS_OTHER_COLUMNS] || CLASSIFICATORS_REGULAR_COLUMNS}
            totalItems={pageProps.data && pageProps.data.count}
            onPagination={pageProps.onPagination}
            errorMsg={pageProps.error}
            isCreateBtnDisabled
            searchIsRequired={true}
            onSearchConfirm={onSearchConfirm}
        />
    );
};

export default Classificator;


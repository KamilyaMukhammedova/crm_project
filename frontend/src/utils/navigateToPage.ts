import React from "react";
import { ThunkActionCreator } from "../types/basic";
import { setupStore } from "../store/store";
import { getPreviousPageQuery, pageIsNotFirst } from "./query";

export const navigateToFirstAndFetch = (
    setCurrentPage: React.Dispatch<React.SetStateAction<string>>,
    dispatch: ReturnType<typeof setupStore>['dispatch'],
    fetchAction: ThunkActionCreator
) => {
    const languageFromUrl = new URLSearchParams(window.location.search).get('lang') || 'en';
    const languageParams = 'lang=' + languageFromUrl;
    const firstPageParams = '?page=1&';

    setCurrentPage(firstPageParams);

    window.history.pushState(
        { path: firstPageParams + languageParams },
        '',
        firstPageParams + languageParams
    );

    const thunkAction = fetchAction(firstPageParams);
    dispatch(thunkAction);
};

export const navigateToPageAfterDelete = (
    closeModalDelete: React.Dispatch<React.SetStateAction<boolean>>,
    resultsArr: any[],
    currentPage: string,
    setCurrentPage: React.Dispatch<React.SetStateAction<string>>,
    dispatch: ReturnType<typeof setupStore>['dispatch'],
    fetchAction: ThunkActionCreator,
) => {
    closeModalDelete(false);

    if (resultsArr.length > 1) {
        dispatch(fetchAction(currentPage));
    } else {
        if (pageIsNotFirst(currentPage)) {
            const languageFromUrl = new URLSearchParams(window.location.search).get('lang') || 'en';
            const languageQuery = 'lang=' + languageFromUrl;
            const previousPageQuery = getPreviousPageQuery(currentPage);

            window.history.pushState(
                {path: previousPageQuery + languageQuery},
                '',
                previousPageQuery + languageQuery
            );

            setCurrentPage(previousPageQuery);
            dispatch(fetchAction(previousPageQuery));
        } else {
            dispatch(fetchAction());
        }
    }
};
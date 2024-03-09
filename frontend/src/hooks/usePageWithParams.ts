import React, { useEffect, useState } from "react";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "./redux";
import { RootState } from "../store/store";

export interface PageWithParamsProps {
    fetching: boolean;
    data: any;
    error: any;
    currentPage: string,
    setCurrentPage: React.Dispatch<React.SetStateAction<string>>,
    onPagination: (query: string) => void,
}

export const usePageWithParams = (
    fetchAction: (page?: any) => ThunkAction<unknown, RootState, undefined, AnyAction>,
    dataSelector: (state: RootState) => any,
    pageName: string,
    dataNameInSelector: string,
    fetchingNameInSelector: string,
    fetchingErrorNameInSelector: string,
    idObj: { [key: string]: string },
): PageWithParamsProps => {
    const dispatch = useAppDispatch();

    const {
        [dataNameInSelector]: data,
        [fetchingNameInSelector]: fetching,
        [fetchingErrorNameInSelector]: error
    } = useAppSelector(dataSelector);

    const [currentPage, setCurrentPage] = useState('?page=1&');

    useEffect(() => {
        let queryParams = '?';

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const pageParam = urlParams.get('page');

        setCurrentPage(`?page=${pageParam ? pageParam : '1&'}`);

        urlParams.forEach((value, key) => {
            if (key !== 'lang') {
                queryParams += `${key}=${value}&`;
            }
        });

        switch (pageName) {
            case 'user_purchases':
                dispatch(fetchAction({
                    userId: idObj.userId,
                    query: queryParams,
                }));
                break;
            case 'user_purchase_items':
                if (idObj.purchaseId) {
                    dispatch(fetchAction({
                        userId: idObj.userId,
                        purchaseId: idObj.purchaseId,
                        query: queryParams,
                    }));
                }
                break;
            case 'cv_list':
                dispatch(fetchAction({
                    vacancyId: idObj.vacancyId,
                    query: queryParams,
                }));
                break;
            default:
                break;
        }
    }, []);

    const onPagination = async (pageQuery: string) => {
        setCurrentPage(pageQuery);

        switch (pageName) {
            case 'user_purchases':
                dispatch(fetchAction({
                    userId: idObj.userId,
                    query: pageQuery,
                }));
                break;
            case 'user_purchase_items':
                dispatch(fetchAction({
                    userId: idObj.userId,
                    purchaseId: idObj.purchaseId,
                    query: pageQuery,
                }));
                break;
            case 'cv_list':
                dispatch(fetchAction({
                    vacancyId: idObj.vacancyId,
                    query: pageQuery,
                }));
                break;
            default:
                break;
        }
    };

    return {
        fetching,
        data,
        error,
        currentPage,
        onPagination,
        setCurrentPage,
    };
};


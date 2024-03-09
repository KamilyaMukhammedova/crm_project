import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "./redux";
import { RootState } from "../store/store";

export interface BasicPageProps {
    fetching: boolean;
    data: any;
    error: any;
    currentPage: string,
    setCurrentPage: React.Dispatch<React.SetStateAction<string>>,
    onPagination: (query: string) => void,
    sectionName?: string,
}

export interface BasicPageCreateEditProps extends BasicPageProps {
    onEdit: (id: number) => void;
    onCreate: () => void;
}

export const useBasicPage = (
    fetchAction: (page?: any) => ThunkAction<unknown, RootState, undefined, AnyAction>,
    dataSelector: (state: RootState) => any,
    pageName: string,
    isClassificator: boolean,
    isNavigationToCreateEditRequired: boolean,
    sectionName = 'content_management',
): BasicPageProps | BasicPageCreateEditProps => {
    // const history = useHistory();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const {fetching, data, error} = useAppSelector(dataSelector);

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

        if (queryString) {
            !isClassificator && dispatch(fetchAction(queryParams));
            isClassificator && dispatch(fetchAction({
                typeNameQuery: pageName,
                otherQuery: queryParams,
            }));
        } else {
            !isClassificator && dispatch(fetchAction());
            isClassificator && dispatch(fetchAction({
                typeNameQuery: pageName,
                otherQuery: currentPage,
            }));
        }
    }, []);


    const onEdit = (id: number) => {
        if (isNavigationToCreateEditRequired) {
            const languageFromUrl = new URLSearchParams(window.location.search).get('lang') || 'en';
            navigate(`/${sectionName}/edit_${pageName}/${id}?lang=${languageFromUrl}`);
        }
    };

    const onCreate = () => {
        if (isNavigationToCreateEditRequired) {
            const languageFromUrl = new URLSearchParams(window.location.search).get('lang') || 'en';
            navigate(`/${sectionName}/create_${pageName}?lang=${languageFromUrl}`);
        }
    };

    const onPagination = async (pageQuery: string) => {
        setCurrentPage(pageQuery);

        if (!isClassificator) {
            dispatch(fetchAction(pageQuery));
        } else {
            dispatch(fetchAction({
                typeNameQuery: pageName,
                otherQuery: pageQuery,
            }));
        }
    };

    const basicPageData = {
        fetching,
        data,
        error,
        currentPage,
        onPagination,
        setCurrentPage,
    };

    if (isNavigationToCreateEditRequired) {
        return {
            ...basicPageData,
            onEdit,
            onCreate,
        };
    } else {
        return basicPageData;
    }
};


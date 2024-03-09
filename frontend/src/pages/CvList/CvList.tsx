import React, { FC } from 'react';
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { message } from "antd";
import { PageWithParamsProps, usePageWithParams } from "../../hooks/usePageWithParams";
import { generateBreadcrumbsItems, generateColumns } from "./constants";
import { ICv } from "../../types/cv";
import { fetchCvListAction } from "../../store/cv/CvActions";
import BasicPage from "../../components/BasicPage/BasicPage";

const CvList: FC = () => {
    const {t} = useTranslation();
    const {vacancyId} = useParams<{ vacancyId: string }>();

    const pageProps = usePageWithParams(
        fetchCvListAction,
        state => state.cvReducer,
        'cv_list',
        'cvListData',
        'cvListFetching',
        'cvListError',
        {vacancyId: vacancyId || ''},
    ) as PageWithParamsProps;

    const onCv = (cvId: number) => {
        const userCv = pageProps.data.results.find((cv: ICv) => cv.id === cvId);

        if(userCv && userCv.files.length > 0) {
            window.open(userCv.files[0].file,  '_blank', userCv.full_name);
        } else {
            void message.warning(t("Cv does not have any files to open!"));
        }
    };

    return (
        <BasicPage
            fetching={pageProps.fetching}
            breadcrumbItems={generateBreadcrumbsItems(vacancyId || '')}
            data={pageProps.data && pageProps.data.results}
            columns={generateColumns(onCv)}
            totalItems={pageProps.data && pageProps.data.count}
            onPagination={pageProps.onPagination}
            createBtnIsNotRequired={true}
            errorMsg={pageProps.error}
        />
    );
};

export default CvList;
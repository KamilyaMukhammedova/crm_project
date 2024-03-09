import React, { FC } from 'react';
import { BasicPageCreateEditProps, useBasicPage } from "../../hooks/useBasicPage";
import { useDelete } from "../../hooks/useDelete";
import { BREADCRUMBS_ITEMS, generateColumns } from "./constants";
import { DELETE_FORM_TITLES } from "../../constants/form";
import { deleteNewsAction, fetchNewsListAction } from "../../store/news/NewsActions";
import BasicPage from "../../components/BasicPage/BasicPage";
import ModalWindow from "../../components/ui/ModalWindow/ModalWindow";

const News: FC = () => {
    const pageProps = useBasicPage(
        fetchNewsListAction,
        state => state.newsReducer,
        'news',
        false,
        true
    ) as BasicPageCreateEditProps;

    const {
        deleteError, deleteFetching, isModalDeleteOpen,
        onDelete, openDeleteModal, closeDeleteModal
    } = useDelete(fetchNewsListAction, state => state.newsReducer);

    const onDeleteConfirm = async () => {
        await onDelete({
            deleteAction: deleteNewsAction,
            currentPage: pageProps.currentPage,
            setCurrentPage: pageProps.setCurrentPage,
        });
    };

    return (
        <>
            <BasicPage
                fetching={pageProps.fetching}
                breadcrumbItems={BREADCRUMBS_ITEMS}
                onCreate={pageProps.onCreate}
                data={pageProps.data && pageProps.data.results}
                columns={generateColumns(pageProps.onEdit, openDeleteModal)}
                totalItems={pageProps.data && pageProps.data.count}
                onPagination={pageProps.onPagination}
                errorMsg={pageProps.error}
            />
            <ModalWindow
                isModalOpen={isModalDeleteOpen}
                onCancel={closeDeleteModal}
                onConfirm={onDeleteConfirm}
                okBtnTitle={DELETE_FORM_TITLES.btn}
                title={DELETE_FORM_TITLES.message}
                loading={deleteFetching}
                error={deleteError}
            />
        </>
    );
};

export default News;







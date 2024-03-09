import React, { FC } from 'react';
import { BasicPageCreateEditProps, useBasicPage } from "../../hooks/useBasicPage";
import { useDelete } from "../../hooks/useDelete";
import { deletePromotionAction, fetchPromotionsListAction } from "../../store/promotions/PromotionsActions";
import { BREADCRUMBS_ITEMS, generateColumns } from "./constants";
import BasicPage from "../../components/BasicPage/BasicPage";
import ModalWindow from "../../components/ui/ModalWindow/ModalWindow";

const Promotions: FC = () => {
    const pageProps = useBasicPage(
        fetchPromotionsListAction,
        state => state.promotionsReducer,
        'promotion',
        false,
        true
    ) as BasicPageCreateEditProps;

    const {
        deleteError, deleteFetching, isModalDeleteOpen,
        onDelete, openDeleteModal, closeDeleteModal
    } = useDelete(fetchPromotionsListAction, state => state.promotionsReducer);

    const onDeleteConfirm = async () => {
        await onDelete({
            deleteAction: deletePromotionAction,
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
                okBtnTitle={'Delete'}
                title={'Are you sure to delete?'}
                loading={deleteFetching}
                error={deleteError}
            />
        </>
    );
};

export default Promotions;
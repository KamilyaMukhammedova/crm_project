import React, { FC } from 'react';
import { BasicPageCreateEditProps, useBasicPage } from "../../hooks/useBasicPage";
import { useDelete } from "../../hooks/useDelete";
import { DELETE_FORM_TITLES } from "../../constants/form";
import { BREADCRUMBS_ITEMS } from "./constants";
import { deleteFaqAction, fetchFaqListAction } from "../../store/faq/FaqActions";
import BasicPage from "../../components/BasicPage/BasicPage";
import FaqCollapseList from "../../components/FaqCollapseList/FaqCollapseList";
import ModalWindow from "../../components/ui/ModalWindow/ModalWindow";

const Faq: FC = () => {
    const pageProps = useBasicPage(
        fetchFaqListAction,
        state => state.faqReducer,
        'faq',
        false,
        true,
        'administration',
    ) as BasicPageCreateEditProps;

    const deleteProps = useDelete(fetchFaqListAction, state => state.faqReducer);

    const onDeleteConfirm = async () => {
        await deleteProps.onDelete({
            deleteAction: deleteFaqAction,
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
                totalItems={pageProps.data && pageProps.data.count}
                onPagination={pageProps.onPagination}
                errorMsg={pageProps.error}
                defaultContentTable={false}
            >
                <FaqCollapseList
                    questions={pageProps.data && pageProps.data.results}
                    onEdit={pageProps.onEdit}
                    onDelete={deleteProps.openDeleteModal}
                />
            </BasicPage>
            <ModalWindow
                isModalOpen={deleteProps.isModalDeleteOpen}
                onCancel={deleteProps.closeDeleteModal}
                onConfirm={onDeleteConfirm}
                okBtnTitle={DELETE_FORM_TITLES.btn}
                title={DELETE_FORM_TITLES.message}
                loading={deleteProps.deleteFetching}
                error={deleteProps.deleteError}
            />
        </>
    );
};

export default Faq;
import React, { FC } from 'react';
// import { useHistory } from "react-router-dom";
import { BasicPageCreateEditProps, useBasicPage } from "../../hooks/useBasicPage";
import { useDelete } from "../../hooks/useDelete";
import { BREADCRUMBS_ITEMS, generateColumns } from "./constants";
import { deleteVacancyAction, fetchVacanciesListAction } from "../../store/vacancies/VacanciesActions";
import BasicPage from "../../components/BasicPage/BasicPage";
import ModalWindow from "../../components/ui/ModalWindow/ModalWindow";
import { useNavigate } from "react-router-dom";

const Vacancies: FC = () => {
    // const history = useHistory();
    const navigate = useNavigate();


    const pageProps = useBasicPage(
        fetchVacanciesListAction,
        state => state.vacanciesReducer,
        'vacancy',
        false,
        true
    ) as BasicPageCreateEditProps;

    const deleteProps = useDelete(fetchVacanciesListAction, state => state.vacanciesReducer);

    const onDeleteConfirm = async () => {
        await deleteProps.onDelete({
            deleteAction: deleteVacancyAction,
            currentPage: pageProps.currentPage,
            setCurrentPage: pageProps.setCurrentPage,
        });
    };

    const onCvList = (vacancyId: number) => {
        const languageFromUrl = new URLSearchParams(window.location.search).get('lang') || 'en';
        navigate(`/content_management/vacancies/${vacancyId}/cv_list?lang=${languageFromUrl}`);
    };

    return (
        <>
            <BasicPage
                fetching={pageProps.fetching}
                breadcrumbItems={BREADCRUMBS_ITEMS}
                onCreate={pageProps.onCreate}
                data={pageProps.data && pageProps.data.results}
                columns={generateColumns(pageProps.onEdit, deleteProps.openDeleteModal, onCvList)}
                totalItems={pageProps.data && pageProps.data.count}
                onPagination={pageProps.onPagination}
                errorMsg={pageProps.error}
            />
            <ModalWindow
                isModalOpen={deleteProps.isModalDeleteOpen}
                onCancel={deleteProps.closeDeleteModal}
                onConfirm={onDeleteConfirm}
                okBtnTitle={'Delete'}
                title={'Are you sure to delete?'}
                loading={deleteProps.deleteFetching}
                error={deleteProps.deleteError}
            />
        </>
    );
};

export default Vacancies;



import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { message } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { BasicPageProps, useBasicPage } from "../../hooks/useBasicPage";
import { ICreateEditInModal, useCreateEdit } from "../../hooks/useCreateEdit";
import { useDelete } from "../../hooks/useDelete";
import { IBannerFormState } from "../../types/initialFormStates";
import {
    createBannerAction,
    deleteBannerAction,
    editBannerAction,
    fetchBannersListAction,
    fetchOneBannerAction
} from "../../store/banners/BannersActions";
import { createStateObjForEditForm, formHasEmptyValues } from "../../utils/createEditForm";
import { BREADCRUMBS_ITEMS, generateColumns } from "./constants";
import { INITIAL_STATE_BANNER } from "../../constants/initialState";
import { DELETE_FORM_TITLES, FORM_ERROR_MESSAGES, FORM_SUCCESS_MESSAGES } from "../../constants/form";
import BasicPage from "../../components/BasicPage/BasicPage";
import ModalWindow from "../../components/ui/ModalWindow/ModalWindow";
import BannerCreateForm from "../../components/Forms/ContentManagement/BannerCreateForm/BannerCreateForm";

const Banners: FC = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const {oneBanner, oneBannerError} = useAppSelector(state => state.bannersReducer);

    const [bannerFormState, setBannerFormState] =
        useState<IBannerFormState>({...INITIAL_STATE_BANNER});

    const pageProps = useBasicPage(
        fetchBannersListAction,
        state => state.bannersReducer,
        'banner',
        false,
        false,
    ) as BasicPageProps;

    const createEditProps = useCreateEdit(
        true,
        state => state.bannersReducer,
        fetchOneBannerAction,
        INITIAL_STATE_BANNER,
        setBannerFormState,
    ) as ICreateEditInModal;

    const deleteProps = useDelete(fetchBannersListAction, state => state.bannersReducer);

    useEffect(() => {
        setBannerFormState({...INITIAL_STATE_BANNER});
    }, []);

    useEffect(() => {
        if (oneBanner && oneBanner?.id === createEditProps.currentItemId) {
            const editedBannerData: IBannerFormState = createStateObjForEditForm(INITIAL_STATE_BANNER, oneBanner);
            setBannerFormState(editedBannerData);
        }
    }, [oneBanner]);

    const onDeleteConfirm = async () => {
        await deleteProps.onDelete({
            deleteAction: deleteBannerAction,
            currentPage: pageProps.currentPage,
            setCurrentPage: pageProps.setCurrentPage,
        });
    };

    const onCreateConfirm = async () => {
        if (formHasEmptyValues(bannerFormState)) {
            createEditProps.setCheckRequiredFields(true);
            message.error(t(FORM_ERROR_MESSAGES.fields_required));
        } else {
            if (!createEditProps.isEditedMode) {
                await dispatch(createBannerAction(bannerFormState)).unwrap()
                    .then(async () => {
                        createEditProps.setFormCreateError('');
                        await createEditProps.onActionsAfterCreateAndEdit({setCurrentPage: pageProps.setCurrentPage, fetchAction: fetchBannersListAction});
                        message.success(t(FORM_SUCCESS_MESSAGES.banner_created));
                    })
                    .catch((rejectedValueOrSerializedError) => {
                        createEditProps.setFormCreateError(rejectedValueOrSerializedError.message);
                    });
            } else {
                if (createEditProps.currentItemId) {
                    await dispatch(editBannerAction({
                        dataToEdit: bannerFormState,
                        bannerId: createEditProps.currentItemId,
                    })).unwrap()
                        .then(async () => {
                            createEditProps.setFormEditError('');
                            await createEditProps.onActionsAfterCreateAndEdit({setCurrentPage: pageProps.setCurrentPage, fetchAction: fetchBannersListAction});
                            message.success(t(FORM_SUCCESS_MESSAGES.banner_edited));
                        })
                        .catch((rejectedValueOrSerializedError) => {
                            createEditProps.setFormEditError(rejectedValueOrSerializedError.message);
                        });
                }
            }

            createEditProps.setCheckRequiredFields(false);
        }
    };

    return (
        <>
            <BasicPage
                fetching={pageProps.fetching}
                breadcrumbItems={BREADCRUMBS_ITEMS}
                onCreate={createEditProps.handleOpenCreateModal}
                data={pageProps.data && pageProps.data.results}
                columns={generateColumns(createEditProps.handleOpenEditModal, deleteProps.openDeleteModal)}
                totalItems={pageProps.data && pageProps.data.count}
                onPagination={pageProps.onPagination}
                errorMsg={pageProps.error}
            />
            <ModalWindow
                isModalOpen={deleteProps.isModalDeleteOpen}
                onCancel={deleteProps.closeDeleteModal}
                onConfirm={onDeleteConfirm}
                okBtnTitle={DELETE_FORM_TITLES.btn}
                title={DELETE_FORM_TITLES.message}
                loading={deleteProps.deleteFetching}
                error={deleteProps.deleteError}
            />
            <BannerCreateForm
                formState={bannerFormState}
                setFormState={setBannerFormState}
                isModalOpen={createEditProps.isModalCreateOpen}
                isEditedMode={createEditProps.isEditedMode}
                onCancel={createEditProps.handleCloseCreateModal}
                onConfirm={onCreateConfirm}
                loading={createEditProps.createFetching}
                oneBannerError={oneBannerError}
                error={createEditProps.isEditedMode ? createEditProps.formEditError : createEditProps.formCreateError}
                checkRequiredFields={createEditProps.checkRequiredFields}
            />
        </>
    );
};

export default Banners;
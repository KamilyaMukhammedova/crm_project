import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { message } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { BasicPageProps, useBasicPage } from "../../hooks/useBasicPage";
import { useDelete } from "../../hooks/useDelete";
import { ICreateEditInModal, useCreateEdit } from "../../hooks/useCreateEdit";
import { ICollectionFormState } from "../../types/initialFormStates";
import {
    createCollectionAction,
    deleteCollectionAction,
    editCollectionAction,
    fetchCollectionsListAction,
    fetchOneCollectionAction
} from "../../store/collections/CollectionsActions";
import { createStateObjForEditForm, formHasEmptyValues } from "../../utils/createEditForm";
import { BREADCRUMBS_ITEMS, generateColumns } from "./constants";
import { INITIAL_STATE_COLLECTION } from "../../constants/initialState";
import { DELETE_FORM_TITLES, FORM_ERROR_MESSAGES, FORM_SUCCESS_MESSAGES } from "../../constants/form";
import BasicPage from "../../components/BasicPage/BasicPage";
import ModalWindow from "../../components/ui/ModalWindow/ModalWindow";
import CollectionCreateForm from "../../components/Forms/ContentManagement/CollectionCreateForm/CollectionCreateForm";


const Collections: FC = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const {oneCollection, oneCollectionError} = useAppSelector(state => state.collectionsReducer);

    const [collectionFormState, setCollectionFormState] =
        useState<ICollectionFormState>({...INITIAL_STATE_COLLECTION});

    const pageProps = useBasicPage(
        fetchCollectionsListAction,
        state => state.collectionsReducer,
        'collection',
        false,
        false,
    ) as BasicPageProps;

    const createEditProps = useCreateEdit(
        true,
        state => state.collectionsReducer,
        fetchOneCollectionAction,
        INITIAL_STATE_COLLECTION,
        setCollectionFormState,
    ) as ICreateEditInModal;

    const deleteProps = useDelete(fetchCollectionsListAction, state => state.collectionsReducer);

    useEffect(() => {
        setCollectionFormState({...INITIAL_STATE_COLLECTION});
    }, []);

    useEffect(() => {
        if(createEditProps.isModalCreateOpen && createEditProps.isEditedMode) {
            if (oneCollection && oneCollection?.id === createEditProps.currentItemId) {
                const editedCollectionData: ICollectionFormState = createStateObjForEditForm(INITIAL_STATE_COLLECTION, oneCollection);
                setCollectionFormState(editedCollectionData);
            }
        }
    }, [oneCollection, createEditProps.isModalCreateOpen, createEditProps.isEditedMode]);

    const onDeleteConfirm = async () => {
        await deleteProps.onDelete({
            deleteAction: deleteCollectionAction,
            currentPage: pageProps.currentPage,
            setCurrentPage: pageProps.setCurrentPage,
        });
    };

    const onCreateConfirm = async () => {
        if (formHasEmptyValues(collectionFormState)) {
            createEditProps.setCheckRequiredFields(true);
            message.error(t(FORM_ERROR_MESSAGES.fields_required));
        } else if (createEditProps.formHasRegexWarning) {
            createEditProps.setCheckRequiredFields(true);
            message.error(t(FORM_ERROR_MESSAGES.regex_primary_warning));
        } else {
            if (!createEditProps.isEditedMode) {
                await dispatch(createCollectionAction(collectionFormState)).unwrap()
                    .then(async () => {
                        createEditProps.setFormCreateError('');
                        await createEditProps.onActionsAfterCreateAndEdit({
                            setCurrentPage: pageProps.setCurrentPage,
                            fetchAction: fetchCollectionsListAction
                        });
                        message.success(t(FORM_SUCCESS_MESSAGES.collection_created));
                    })
                    .catch((rejectedValueOrSerializedError) => {
                        createEditProps.setFormCreateError(rejectedValueOrSerializedError.message);
                    });
            } else {
                if (createEditProps.currentItemId) {
                    await dispatch(editCollectionAction({
                        dataToEdit: collectionFormState,
                        collectionId: createEditProps.currentItemId,
                    })).unwrap()
                        .then(async () => {
                            createEditProps.setFormEditError('');
                            await createEditProps.onActionsAfterCreateAndEdit({
                                setCurrentPage: pageProps.setCurrentPage,
                                fetchAction: fetchCollectionsListAction
                            });
                            message.success(t(FORM_SUCCESS_MESSAGES.collection_edited));
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
            <CollectionCreateForm
                onCancel={createEditProps.handleCloseCreateModal}
                onConfirm={onCreateConfirm}
                isModalOpen={createEditProps.isModalCreateOpen}
                isEditedMode={createEditProps.isEditedMode}
                oneCollectionError={oneCollectionError}
                collectionFormState={collectionFormState}
                setCollectionFormState={setCollectionFormState}
                loading={createEditProps.createFetching || createEditProps.editFetching}
                error={createEditProps.isEditedMode ? createEditProps.formEditError : createEditProps.formCreateError}
                checkRequiredFields={createEditProps.checkRequiredFields}
                getFormRegexWarning={(hasRegexWarning: boolean) => createEditProps.setFormHasRegexWarning(hasRegexWarning)}
            />
        </>
    );
};

export default Collections;



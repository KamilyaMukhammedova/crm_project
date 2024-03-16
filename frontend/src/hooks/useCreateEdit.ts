import React, { useEffect, useState } from "react";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "./redux";
import { RootState } from "../store/store";
import { IBannerFormState, ICollectionFormState } from "../types/initialFormStates";
import { ThunkActionCreator } from "../types/basic";
import { ICreatedAccount } from "../types/accounts";
import { navigateToFirstAndFetch } from "../utils/navigateToPage";

export interface IBasicCreateEdit {
    createFetching: boolean,
    editFetching: boolean,
    checkRequiredFields: boolean,
    formHasRegexWarning: boolean,
    formCreateError: string
    formEditError: string,
    setCheckRequiredFields: React.Dispatch<React.SetStateAction<boolean>>,
    setFormHasRegexWarning: React.Dispatch<React.SetStateAction<boolean>>,
    setFormCreateError: React.Dispatch<React.SetStateAction<string>>,
    setFormEditError: React.Dispatch<React.SetStateAction<string>>,
    setCurrentItemId: React.Dispatch<React.SetStateAction<string | null>>,
}

export interface ICreateEditInModal extends IBasicCreateEdit {
    currentItemId: string | null,
    isModalCreateOpen: boolean,
    isEditedMode: boolean,
    handleOpenCreateModal: () => void,
    handleOpenEditModal: (itemId: string) => void,
    handleCloseCreateModal: () => void,
    onActionsAfterCreateAndEdit: (data: IActionsAfterCreateEditProps) => Promise<void>,
}

interface IActionsAfterCreateEditProps {
    setCurrentPage: React.Dispatch<React.SetStateAction<string>>,
    fetchAction: ThunkActionCreator,
}

type FormState = ICollectionFormState | IBannerFormState | ICreatedAccount;

export const useCreateEdit = <T extends FormState>(
    isCreateEditFormInModal: boolean,
    dataSelector: (state: RootState) => any,
    fetchOneItem?: (itemId: string) => ThunkAction<unknown, RootState, undefined, AnyAction>,
    initialFormState?: T,
    setFormState?: React.Dispatch<React.SetStateAction<T>>,
): IBasicCreateEdit | ICreateEditInModal => {
    const dispatch = useAppDispatch();
    const {createFetching, editFetching} = useAppSelector(dataSelector);

    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [isEditedMode, setIsEditedMode] = useState(false);
    const [checkRequiredFields, setCheckRequiredFields] = useState(false);
    const [formHasRegexWarning, setFormHasRegexWarning] = useState(false);

    const [formCreateError, setFormCreateError] = useState('');
    const [formEditError, setFormEditError] = useState('');
    const [currentItemId, setCurrentItemId] = useState<string | null>(null);

    useEffect(() => {
        if(!isCreateEditFormInModal) {
            setFormCreateError('');
            setFormEditError('');
            setCheckRequiredFields(false);
        }
    }, []);

    const handleOpenCreateModal = () => {
        (setFormState && initialFormState) && setFormState({...initialFormState});
        setCurrentItemId(null);
        setIsModalCreateOpen(true);
        setIsEditedMode(false);
        setCheckRequiredFields(false);
        setFormCreateError('');
    };

    const handleOpenEditModal = async (itemId: string) => {
        setCurrentItemId(itemId);
        fetchOneItem && await dispatch(fetchOneItem(itemId));
        setIsModalCreateOpen(true);
        setIsEditedMode(true);
        setCheckRequiredFields(false);
        setFormEditError('');
    };

    const handleCloseCreateModal = () => {
        if (isEditedMode && setFormState && initialFormState) {
            setFormState({...initialFormState});
            setCurrentItemId(null);
        }
        setIsModalCreateOpen(false);
        setCheckRequiredFields(false);

        setFormHasRegexWarning(false);
    };

    const onActionsAfterCreateAndEdit = async ({setCurrentPage, fetchAction}: IActionsAfterCreateEditProps) => {
        if (isCreateEditFormInModal && initialFormState && setFormState) {
            setIsModalCreateOpen(false);
            setFormState({...initialFormState});
            await navigateToFirstAndFetch(setCurrentPage, dispatch, fetchAction);
        }
    };

    const basicCreateEditData = {
        createFetching,
        editFetching,
        checkRequiredFields,
        formCreateError,
        formEditError,
        formHasRegexWarning,
        setFormHasRegexWarning,
        setCheckRequiredFields,
        setFormCreateError,
        setFormEditError,
        setCurrentItemId,
    };

    if (isCreateEditFormInModal) {
        return {
            ...basicCreateEditData,
            currentItemId,
            isModalCreateOpen,
            isEditedMode,
            handleOpenCreateModal,
            handleOpenEditModal,
            handleCloseCreateModal,
            onActionsAfterCreateAndEdit,
        };
    } else {
        return basicCreateEditData;
    }
};

import React, { useState } from "react";
import { AnyAction, AsyncThunk, ThunkAction } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";
import { message } from "antd";
import { useAppDispatch, useAppSelector } from "./redux";
import { RootState } from "../store/store";
import { AsyncThunkConfig } from "../types/basic";
import { navigateToPageAfterDelete } from "../utils/navigateToPage";

interface DeleteProps {
    deleteAction: AsyncThunk<void, string, AsyncThunkConfig>,
    currentPage: string,
    setCurrentPage: React.Dispatch<React.SetStateAction<string>>,
}

export const useDelete = (
    fetchAction: (page?: string) => ThunkAction<void, RootState, undefined, AnyAction>,
    dataSelector: (state: RootState) => any,
) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const {data, deleteFetching} = useAppSelector(dataSelector);

    const [deleteError, setDeleteError] = useState('');
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [currentItemId, setCurrentItemId] = useState<string | null>(null);

    const openDeleteModal = (itemId: string) => {
        setCurrentItemId(itemId);
        setIsModalDeleteOpen(true);
    };

    const closeDeleteModal = () => {
        setIsModalDeleteOpen(false);
        setDeleteError('');
    };

    const onDelete = async ({
                                    deleteAction,
                                    currentPage,
                                    setCurrentPage
                                }: DeleteProps
    ) => {
        if (currentItemId) {
            await dispatch(deleteAction(currentItemId)).unwrap()
                .then(async () => {
                    setDeleteError('');

                    await navigateToPageAfterDelete(
                        setIsModalDeleteOpen,
                        data.results,
                        currentPage,
                        setCurrentPage,
                        dispatch,
                        fetchAction
                    );
                    message.success(t("Item was successfully deleted!"));
                })
                .catch((rejectedValueOrSerializedError: any) => {
                    setDeleteError(rejectedValueOrSerializedError.message);
                });
        }
    };

    return {
        deleteError,
        isModalDeleteOpen,
        deleteFetching,
        onDelete,
        openDeleteModal,
        closeDeleteModal,
    };
};
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPI } from "../../axios";
import { COLLECTIONS_URL } from "../../constants/api";
import {
    CreatedCollection,
    ICollection,
    ICollectionFullData, ICollectionsFullData,
    IEditedCollectionFullData
} from "../../types/collections";

export const fetchCollectionsListAction = createAsyncThunk<ICollectionsFullData | null, string | undefined>(
    'collectionsList/fetch',
    async (queryPage= '?page=1') => {
        const response = await axiosAPI.get<ICollectionsFullData | null>(COLLECTIONS_URL + queryPage);

        return response.data;
    }
);

export const fetchOneCollectionAction = createAsyncThunk<ICollectionFullData | null, string>(
    'oneCollection/fetch',
    async (collectionId) => {
        const response = await axiosAPI.get<ICollectionFullData | null>(`${COLLECTIONS_URL}${collectionId}/`);

        return response.data;
    }
);

export const deleteCollectionAction = createAsyncThunk<void, string>(
    'collection/delete',
    async (collectionId) => {
        await axiosAPI.delete(`${COLLECTIONS_URL}${collectionId}/`);
    }
);

export const createCollectionAction = createAsyncThunk<void, CreatedCollection>(
    'collection/create',
    async (data) => {
        await axiosAPI.post<Omit<ICollection, 'created_date'> | null>(COLLECTIONS_URL, data);
    }
);

export const editCollectionAction = createAsyncThunk<void, IEditedCollectionFullData>(
    'collection/edit',
    async (data) => {
        await axiosAPI.patch<Omit<ICollection, 'created_date'> | null>(`${COLLECTIONS_URL}${data.collectionId}/`, data.dataToEdit);
    }
);
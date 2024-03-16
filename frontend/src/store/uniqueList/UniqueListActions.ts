import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPI } from "../../axios";
import { UNIQUE_LIST_URL } from "../../constants/api";
import { ICreatedUniqueListItem, IUniqueListFullData, IUniqueListItem } from "../../types/uniqueList";

export const fetchUniqueListAction = createAsyncThunk<IUniqueListFullData | null, string | undefined>(
    'uniqueList/fetch',
    async (query = '?page=1') => {
        const response =
            await axiosAPI.get<IUniqueListFullData | null>(`${UNIQUE_LIST_URL}${query}`);

        return response.data;
    }
);

export const deleteUniqueListItemAction = createAsyncThunk<void, string>(
    'uniqueListItem/delete',
    async (itemId) => {
        await axiosAPI.delete(`${UNIQUE_LIST_URL}${itemId}/`);
    }
);

export const createUniqueListItemAction = createAsyncThunk<void, ICreatedUniqueListItem>(
    'uniqueListItem/create',
    async (data) => {
        await axiosAPI.post<IUniqueListItem | null>(UNIQUE_LIST_URL, data);
    }
);


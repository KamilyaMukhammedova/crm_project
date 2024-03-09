import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPI } from "../../axios";
import { BLACK_LIST_URL, PRODUCTS_URL } from "../../constants/api";
import {
    IBlackListFullData,
    IBlackListItem,
    IBlackListProductListFullData,
    ICreatedBlackListItem
} from "../../types/blackList";

export const fetchBlackListAction = createAsyncThunk<IBlackListFullData | null, string | undefined>(
    'blackList/fetch',
    async (query = '?page=1') => {
        const response =
            await axiosAPI.get<IBlackListFullData | null>(`${BLACK_LIST_URL}${query}`);

        return response.data;
    }
);

export const fetchBlackListProductsAction = createAsyncThunk<IBlackListProductListFullData | null, string | undefined>(
    'blackListProducts/fetch',
    async (query = '') => {
        const response = await axiosAPI.get(`${PRODUCTS_URL}${query}`);

        return response.data;
    }
);

export const deleteBlackListItemAction = createAsyncThunk<void, number>(
    'blackListItem/delete',
    async (itemId) => {
        await axiosAPI.delete(`${BLACK_LIST_URL}${itemId}/`);
    }
);

export const createBlackListItemAction = createAsyncThunk<void, ICreatedBlackListItem>(
    'blackListItem/create',
    async (data) => {
        await axiosAPI.post<IBlackListItem | null>(BLACK_LIST_URL, data);
    }
);
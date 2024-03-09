import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPI } from "../../axios";
import { STORES_URL } from "../../constants/api";
import { IStoresFullData } from "../../types/stores";

export const fetchStoresListAction = createAsyncThunk<IStoresFullData | null, string | undefined>(
    'storesList/fetch',
    async (query = '?page=1') => {
        const response = await axiosAPI.get<IStoresFullData | null>(STORES_URL + query);

        return response.data;
    }
);

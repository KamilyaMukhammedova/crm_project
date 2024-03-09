import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPI } from "../../axios";
import { BESTSELLERS_URL } from "../../constants/api";
import { IBestsellersFullData } from "../../types/bestsellers";

export const fetchBestsellersListAction = createAsyncThunk<IBestsellersFullData | null, string | undefined>(
    'bestsellersList/fetch',
    async (queryPage= '?page=1') => {
        const response = await axiosAPI.get<IBestsellersFullData | null>(BESTSELLERS_URL + queryPage);

        return response.data;
    }
);


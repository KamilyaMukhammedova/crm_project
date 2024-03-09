import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPI } from "../../axios";
import {
    CreatedPromotion,
    IEditedPromFullData,
    IPromotionsBasic,
    IPromotionsFullData,
    Promotion
} from "../../types/promotions";
import { PROMOTIONS_URL } from "../../constants/api";

export const fetchPromotionsListAction = createAsyncThunk<IPromotionsFullData | null, string | undefined>(
    'promotionsList/fetch',
    async (queryPage= '?page=1') => {
        const response = await axiosAPI.get<IPromotionsFullData | null>(PROMOTIONS_URL + queryPage);

        return {
            ...response.data,
            current: queryPage ? queryPage : '?page=1'
        } as IPromotionsFullData | null;
    }
);

export const fetchOnePromotionAction = createAsyncThunk<IPromotionsBasic | null, number>(
    'onePromotion/fetch',
    async (promId) => {
        const response = await axiosAPI.get<IPromotionsBasic | null>(`${PROMOTIONS_URL}${promId}/`);

        return response.data;
    }
);

export const deletePromotionAction = createAsyncThunk<void, number>(
    'promotion/delete',
    async (promotionId) => {
        await axiosAPI.delete(`${PROMOTIONS_URL}${promotionId}/`);
    }
);

export const createPromotionAction = createAsyncThunk<void, CreatedPromotion>(
    'promotion/create',
    async (data) => {
        await axiosAPI.post<Promotion | null>(PROMOTIONS_URL, data);
    }
);

export const editPromotionAction = createAsyncThunk<void, IEditedPromFullData>(
    'promotion/edit',
    async (data) => {
        await axiosAPI.patch<Promotion | null>(`${PROMOTIONS_URL}${data.promId}/`, data.dataToEdit);
    }
);


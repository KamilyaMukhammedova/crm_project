import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPI } from "../../axios";
import { FAQ_URL, VACANCIES_URL } from "../../constants/api";
import { CreatedFaq, Faq, IEditedFaqFullData, IFaqFullData } from "../../types/faq";

export const fetchFaqListAction = createAsyncThunk<IFaqFullData | null, string | undefined>(
    'faqList/fetch',
    async (queryPage= '?page=1') => {
        const response = await axiosAPI.get<IFaqFullData | null>(FAQ_URL + queryPage);

        return response.data;
    }
);

export const fetchOneFaqAction = createAsyncThunk<Faq | null, string>(
    'oneFaq/fetch',
    async (faqId) => {
        const response = await axiosAPI.get<Faq | null>(`${FAQ_URL}${faqId}/`);

        return response.data;
    }
);

export const createFaqAction = createAsyncThunk<void, CreatedFaq>(
    'faq/create',
    async (data) => {
        await axiosAPI.post<Faq | null>(FAQ_URL, data);
    }
);

export const editFaqAction = createAsyncThunk<void, IEditedFaqFullData>(
    'faq/edit',
    async (data) => {
        await axiosAPI.put<Faq | null>(`${FAQ_URL}${data.faqId}/`, data.dataToEdit);
    }
);

export const deleteFaqAction = createAsyncThunk<void, string>(
    'faq/delete',
    async (faqId) => {
        await axiosAPI.delete(`${FAQ_URL}${faqId}/`);
    }
);
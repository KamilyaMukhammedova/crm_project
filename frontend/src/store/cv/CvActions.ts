import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPI } from "../../axios";
import { VACANCIES_URL } from "../../constants/api";
import { ICv, ICvListFullData } from "../../types/cv";

export const fetchCvListAction = createAsyncThunk<ICvListFullData | null, {vacancyId: string, query: string}>(
    'cvList/fetch',
    async ({vacancyId, query}) => {
        const response = await axiosAPI.get<ICvListFullData | null>(`${VACANCIES_URL}${vacancyId}/cv/${query}`);

        return response.data;
    }
);

export const fetchOneCvAction = createAsyncThunk<ICv | null, {vacancyId: string, cvId: string, query: string}>(
    'oneCv/fetch',
    async ({vacancyId, cvId, query}) => {
        const response = await axiosAPI.get<ICv | null>(
            `${VACANCIES_URL}${vacancyId}/cv/${cvId}/${query}`
        );

        return response.data;
    }
);
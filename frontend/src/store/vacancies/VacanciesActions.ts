import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPI } from "../../axios";
import { VACANCIES_URL } from "../../constants/api";
import { CreatedVacancy, IEditedVacancyFullData, IVacanciesFullData, Vacancy } from "../../types/vacancies";

export const fetchVacanciesListAction = createAsyncThunk<IVacanciesFullData | null, string | undefined>(
    'vacanciesList/fetch',
    async (queryPage= '?page=1') => {
        const response = await axiosAPI.get<IVacanciesFullData | null>(VACANCIES_URL + queryPage);

        return {
            ...response.data,
            current: queryPage ? queryPage : '?page=1'
        } as IVacanciesFullData | null;
    }
);

export const fetchOneVacancyAction = createAsyncThunk<Vacancy | null, string>(
    'oneVacancy/fetch',
    async (vacancyId) => {
        const response = await axiosAPI.get<Vacancy | null>(`${VACANCIES_URL}${vacancyId}/`);

        return response.data;
    }
);

export const deleteVacancyAction = createAsyncThunk<void, string>(
    'vacancy/delete',
    async (vacancyId) => {
        await axiosAPI.delete(`${VACANCIES_URL}${vacancyId}/`);
    }
);

export const createVacancyAction = createAsyncThunk<void, CreatedVacancy>(
    'vacancy/create',
    async (data) => {
        await axiosAPI.post<Vacancy | null>(VACANCIES_URL, data);
    }
);

export const editVacancyAction = createAsyncThunk<void, IEditedVacancyFullData>(
    'vacancy/edit',
    async (data) => {
        await axiosAPI.patch<Vacancy | null>(`${VACANCIES_URL}${data.vacancyId}/`, data.dataToEdit);
    }
);


import { createSlice } from "@reduxjs/toolkit";
import { IVacanciesFullData, Vacancy } from "../../types/vacancies";
import {
    createVacancyAction,
    deleteVacancyAction,
    editVacancyAction,
    fetchOneVacancyAction,
    fetchVacanciesListAction
} from "./VacanciesActions";

interface VacanciesState {
    fetching: boolean,
    data: IVacanciesFullData | null,
    oneVacancy: Vacancy | null,
    error?: string,
    deleteFetching: boolean,
    deleteError?: string,
    createFetching: boolean,
    createError?: string,
    oneVacancyFetching: boolean,
    oneVacancyError?: string,
    editFetching: boolean,
    editError?: string,
}

const initialState: VacanciesState = {
    fetching: false,
    data: null,
    oneVacancy: null,
    error: '',
    deleteFetching: false,
    deleteError: '',
    createFetching: false,
    createError: '',
    oneVacancyFetching: false,
    oneVacancyError: '',
    editFetching: false,
    editError: '',
};

export const vacanciesSlice = createSlice({
    name: 'Vacancies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchVacanciesListAction.pending, (state) => {
            state.fetching = true;
            state.error = '';
        });
        builder.addCase(fetchVacanciesListAction.fulfilled, (state, action) => {
            state.fetching = false;
            state.data = action.payload;
        });
        builder.addCase(fetchVacanciesListAction.rejected, (state, action) => {
            state.fetching = false;
            state.error = action.error.message;
        });

        builder.addCase(fetchOneVacancyAction.pending, (state) => {
            state.oneVacancyFetching = true;
            state.oneVacancy = null;
            state.oneVacancyError = '';
        });
        builder.addCase(fetchOneVacancyAction.fulfilled, (state, action) => {
            state.oneVacancyFetching = false;
            state.oneVacancy = action.payload;
        });
        builder.addCase(fetchOneVacancyAction.rejected, (state, action) => {
            state.oneVacancyFetching = false;
            state.oneVacancyError = action.error.message;
        });

        builder.addCase(deleteVacancyAction.pending, (state) => {
            state.deleteFetching = true;
            state.deleteError = '';
        });
        builder.addCase(deleteVacancyAction.fulfilled, (state) => {
            state.deleteFetching = false;
        });
        builder.addCase(deleteVacancyAction.rejected, (state, action) => {
            state.deleteFetching = false;
            state.deleteError = action.error.message;
        });

        builder.addCase(createVacancyAction.pending, (state) => {
            state.createFetching = true;
            state.createError = '';
        });
        builder.addCase(createVacancyAction.fulfilled, (state) => {
            state.createFetching = false;
        });
        builder.addCase(createVacancyAction.rejected, (state, action) => {
            state.createFetching = false;
            state.createError = action.error.message;
        });

        builder.addCase(editVacancyAction.pending, (state) => {
            state.editFetching = true;
            state.editError = '';
        });
        builder.addCase(editVacancyAction.fulfilled, (state) => {
            state.editFetching = false;
        });
        builder.addCase(editVacancyAction.rejected, (state, action) => {
            state.editFetching = false;
            state.editError = action.error.message;
        });
    },
});

export default vacanciesSlice.reducer;
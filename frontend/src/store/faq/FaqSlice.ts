import { createSlice } from "@reduxjs/toolkit";
import { Faq, IFaqFullData } from "../../types/faq";
import { createFaqAction, deleteFaqAction, editFaqAction, fetchFaqListAction, fetchOneFaqAction } from "./FaqActions";

interface FaqState {
    fetching: boolean,
    data: IFaqFullData | null,
    error?: string,
    oneFaq: Faq | null,
    deleteFetching: boolean,
    deleteError?: string,
    createFetching: boolean,
    createError?: string,
    oneFaqFetching: boolean,
    oneFaqError?: string,
    editFetching: boolean,
    editError?: string,
}

const initialState: FaqState = {
    fetching: false,
    data: null,
    error: '',
    oneFaq: null,
    deleteFetching: false,
    deleteError: '',
    createFetching: false,
    createError: '',
    oneFaqFetching: false,
    oneFaqError: '',
    editFetching: false,
    editError: '',
};

export const faqSlice = createSlice({
    name: 'Faq',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFaqListAction.pending, (state) => {
            state.fetching = true;
            state.error = '';
        });
        builder.addCase(fetchFaqListAction.fulfilled, (state, action) => {
            state.fetching = false;
            state.data = action.payload;
        });
        builder.addCase(fetchFaqListAction.rejected, (state, action) => {
            state.fetching = false;
            state.error = action.error.message;
        });

        builder.addCase(fetchOneFaqAction.pending, (state) => {
            state.oneFaqFetching = true;
            state.oneFaq = null;
            state.oneFaqError = '';
        });
        builder.addCase(fetchOneFaqAction.fulfilled, (state, action) => {
            state.oneFaqFetching = false;
            state.oneFaq = action.payload;
        });
        builder.addCase(fetchOneFaqAction.rejected, (state, action) => {
            state.oneFaqFetching = false;
            state.oneFaqError = action.error.message;
        });

        builder.addCase(createFaqAction.pending, (state) => {
            state.createFetching = true;
            state.createError = '';
        });
        builder.addCase(createFaqAction.fulfilled, (state) => {
            state.createFetching = false;
        });
        builder.addCase(createFaqAction.rejected, (state, action) => {
            state.createFetching = false;
            state.createError = action.error.message;
        });

        builder.addCase(editFaqAction.pending, (state) => {
            state.editFetching = true;
            state.editError = '';
        });
        builder.addCase(editFaqAction.fulfilled, (state) => {
            state.editFetching = false;
        });
        builder.addCase(editFaqAction.rejected, (state, action) => {
            state.editFetching = false;
            state.editError = action.error.message;
        });

        builder.addCase(deleteFaqAction.pending, (state) => {
            state.deleteFetching = true;
            state.deleteError = '';
        });
        builder.addCase(deleteFaqAction.fulfilled, (state) => {
            state.deleteFetching = false;
        });
        builder.addCase(deleteFaqAction.rejected, (state, action) => {
            state.deleteFetching = false;
            state.deleteError = action.error.message;
        });
    },
});

export default faqSlice.reducer;
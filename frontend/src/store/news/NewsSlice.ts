import { createSlice } from "@reduxjs/toolkit";
import { INewsFullData, IOneNews } from "../../types/news";
import {
    createNewsAction,
    deleteNewsAction,
    editNewsAction,
    fetchNewsListAction,
    fetchOneNewsAction
} from "./NewsActions";


interface NewsState {
    fetching: boolean,
    data: INewsFullData | null,
    oneNewsData: IOneNews | null,
    error?: string,
    deleteFetching: boolean,
    deleteError?: string,
    createFetching: boolean,
    createError?: string,
    oneNewsFetching: boolean,
    oneNewsError?: string,
    editFetching: boolean,
    editError?: string,
}

const initialState: NewsState = {
    fetching: false,
    data: null,
    oneNewsData: null,
    error: '',
    deleteFetching: false,
    deleteError: '',
    createFetching: false,
    createError: '',
    oneNewsFetching: false,
    oneNewsError: '',
    editFetching: false,
    editError: '',
};

export const newsSlice = createSlice({
    name: 'News',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNewsListAction.pending, (state) => {
            state.fetching = true;
            state.error = '';
        });
        builder.addCase(fetchNewsListAction.fulfilled, (state, action) => {
            state.fetching = false;
            state.data = action.payload;
        });
        builder.addCase(fetchNewsListAction.rejected, (state, action) => {
            state.fetching = false;
            state.error = action.error.message;
        });


        builder.addCase(fetchOneNewsAction.pending, (state) => {
            state.oneNewsFetching = true;
            state.oneNewsData = null;
            state.oneNewsError = '';
        });
        builder.addCase(fetchOneNewsAction.fulfilled, (state, action) => {
            state.oneNewsFetching = false;
            state.oneNewsData = action.payload;
        });
        builder.addCase(fetchOneNewsAction.rejected, (state, action) => {
            state.oneNewsFetching = false;
            state.oneNewsError = action.error.message;
        });

        builder.addCase(deleteNewsAction.pending, (state) => {
            state.deleteFetching = true;
            state.deleteError = '';
        });
        builder.addCase(deleteNewsAction.fulfilled, (state) => {
            state.deleteFetching = false;
        });
        builder.addCase(deleteNewsAction.rejected, (state, action) => {
            state.deleteFetching = false;
            state.deleteError = action.error.message;
        });

        builder.addCase(createNewsAction.pending, (state) => {
            state.createFetching = true;
            state.createError = '';
        });
        builder.addCase(createNewsAction.fulfilled, (state) => {
            state.createFetching = false;
        });
        builder.addCase(createNewsAction.rejected, (state, action) => {
            state.createFetching = false;
            state.createError = action.error.message;
        });

        builder.addCase(editNewsAction.pending, (state) => {
            state.editFetching = true;
            state.editError = '';
        });
        builder.addCase(editNewsAction.fulfilled, (state) => {
            state.editFetching = false;
        });
        builder.addCase(editNewsAction.rejected, (state, action) => {
            state.editFetching = false;
            state.editError = action.error.message;
        });
    },
});

export default newsSlice.reducer;



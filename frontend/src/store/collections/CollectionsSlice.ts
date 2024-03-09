import { createSlice } from "@reduxjs/toolkit";
import { ICollectionFullData, ICollectionsFullData } from "../../types/collections";
import {
    createCollectionAction,
    deleteCollectionAction,
    editCollectionAction,
    fetchCollectionsListAction,
    fetchOneCollectionAction
} from "./CollectionsActions";

interface CollectionsState {
    fetching: boolean,
    data: ICollectionsFullData | null,
    oneCollection: ICollectionFullData | null,
    error?: string,
    deleteFetching: boolean,
    deleteError?: string,
    createFetching: boolean,
    createError?: string,
    oneCollectionFetching: boolean,
    oneCollectionError?: string,
    editFetching: boolean,
    editError?: string,
}

const initialState: CollectionsState = {
    fetching: false,
    data: null,
    oneCollection: null,
    error: '',
    deleteFetching: false,
    deleteError: '',
    createFetching: false,
    createError: '',
    oneCollectionFetching: false,
    oneCollectionError: '',
    editFetching: false,
    editError: '',
};

export const collectionsSlice = createSlice({
    name: 'Collections',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCollectionsListAction.pending, (state) => {
            state.fetching = true;
            state.error = '';
        });
        builder.addCase(fetchCollectionsListAction.fulfilled, (state, action) => {
            state.fetching = false;
            state.data = action.payload;
        });
        builder.addCase(fetchCollectionsListAction.rejected, (state, action) => {
            state.fetching = false;
            state.error = action.error.message;
        });

        builder.addCase(fetchOneCollectionAction.pending, (state) => {
            state.oneCollectionFetching = true;
            state.oneCollection = null;
            state.oneCollectionError = '';
        });
        builder.addCase(fetchOneCollectionAction.fulfilled, (state, action) => {
            state.oneCollectionFetching = false;
            state.oneCollection = action.payload;
        });
        builder.addCase(fetchOneCollectionAction.rejected, (state, action) => {
            state.oneCollectionFetching = false;
            state.oneCollectionError = action.error.message;
        });

        builder.addCase(deleteCollectionAction.pending, (state) => {
            state.deleteFetching = true;
            state.deleteError = '';
        });
        builder.addCase(deleteCollectionAction.fulfilled, (state) => {
            state.deleteFetching = false;
        });
        builder.addCase(deleteCollectionAction.rejected, (state, action) => {
            state.deleteFetching = false;
            state.deleteError = action.error.message;
        });

        builder.addCase(createCollectionAction.pending, (state) => {
            state.createFetching = true;
            state.createError = '';
        });
        builder.addCase(createCollectionAction.fulfilled, (state) => {
            state.createFetching = false;
        });
        builder.addCase(createCollectionAction.rejected, (state, action) => {
            state.createFetching = false;
            state.createError = action.error.message;
        });

        builder.addCase(editCollectionAction.pending, (state) => {
            state.editFetching = true;
            state.editError = '';
        });
        builder.addCase(editCollectionAction.fulfilled, (state) => {
            state.editFetching = false;
        });
        builder.addCase(editCollectionAction.rejected, (state, action) => {
            state.editFetching = false;
            state.editError = action.error.message;
        });
    },
});

export default collectionsSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { createUniqueListItemAction, deleteUniqueListItemAction, fetchUniqueListAction } from "./UniqueListActions";
import { IUniqueListFullData } from "../../types/uniqueList";

interface UniqueListState {
    data: IUniqueListFullData | null,
    fetching: boolean,
    error?: string,
    deleteFetching: boolean,
    deleteError?: string,
    createFetching: boolean,
    createError?: string,
}

const initialState: UniqueListState = {
    data: null,
    fetching: false,
    error: '',
    deleteFetching: false,
    deleteError: '',
    createFetching: false,
    createError: '',
};

export const uniqueListSlice = createSlice({
    name: 'UniqueList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUniqueListAction.pending, (state) => {
            state.fetching = true;
            state.error = '';
        });
        builder.addCase(fetchUniqueListAction.fulfilled, (state, action) => {
            state.fetching = false;
            state.data = action.payload;
        });
        builder.addCase(fetchUniqueListAction.rejected, (state, action) => {
            state.fetching = false;
            state.error = action.error.message;
        });

        builder.addCase(deleteUniqueListItemAction.pending, (state) => {
            state.deleteFetching = true;
            state.deleteError = '';
        });
        builder.addCase(deleteUniqueListItemAction.fulfilled, (state) => {
            state.deleteFetching = false;
        });
        builder.addCase(deleteUniqueListItemAction.rejected, (state, action) => {
            state.deleteFetching = false;
            state.deleteError = action.error.message;
        });

        builder.addCase(createUniqueListItemAction.pending, (state) => {
            state.createFetching = true;
            state.createError = '';
        });
        builder.addCase(createUniqueListItemAction.fulfilled, (state) => {
            state.createFetching = false;
        });
        builder.addCase(createUniqueListItemAction.rejected, (state, action) => {
            state.createFetching = false;
            state.createError = action.error.message;
        });
    },
});

export default uniqueListSlice.reducer;

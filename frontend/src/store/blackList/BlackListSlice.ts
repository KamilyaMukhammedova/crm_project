import { createSlice } from "@reduxjs/toolkit";
import { IBlackListFullData, IBlackListProductListFullData } from "../../types/blackList";
import {
    createBlackListItemAction,
    deleteBlackListItemAction,
    fetchBlackListAction,
    fetchBlackListProductsAction
} from "./BlackListActions";

interface BlackListState {
    fetching: boolean,
    data: IBlackListFullData | null,
    productsData: IBlackListProductListFullData | null,
    error?: string,
    deleteFetching: boolean,
    deleteError?: string,
    createFetching: boolean,
    createError?: string,
    productsFetching: boolean,
    productsError?: string,
}

const initialState: BlackListState = {
    fetching: false,
    data: null,
    productsData: null,
    error: '',
    deleteFetching: false,
    deleteError: '',
    createFetching: false,
    createError: '',
    productsFetching: false,
    productsError: '',
};

export const blackListSlice = createSlice({
    name: 'BlackList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBlackListAction.pending, (state) => {
            state.fetching = true;
            state.data = null;
            state.error = '';
        });
        builder.addCase(fetchBlackListAction.fulfilled, (state, action) => {
            state.fetching = false;
            state.data = action.payload;
        });
        builder.addCase(fetchBlackListAction.rejected, (state, action) => {
            state.fetching = false;
            state.error = action.error.message;
        });

        builder.addCase(fetchBlackListProductsAction.pending, (state) => {
            state.productsFetching = true;
            state.productsError = '';
        });
        builder.addCase(fetchBlackListProductsAction.fulfilled, (state, action) => {
            state.productsFetching = false;
            state.productsData = action.payload;
        });
        builder.addCase(fetchBlackListProductsAction.rejected, (state, action) => {
            state.productsFetching = false;
            state.productsError = action.error.message;
        });

        builder.addCase(deleteBlackListItemAction.pending, (state) => {
            state.deleteFetching = true;
            state.deleteError = '';
        });
        builder.addCase(deleteBlackListItemAction.fulfilled, (state) => {
            state.deleteFetching = false;
        });
        builder.addCase(deleteBlackListItemAction.rejected, (state, action) => {
            state.deleteFetching = false;
            state.deleteError = action.error.message;
        });

        builder.addCase(createBlackListItemAction.pending, (state) => {
            state.createFetching = true;
            state.createError = '';
        });
        builder.addCase(createBlackListItemAction.fulfilled, (state) => {
            state.createFetching = false;
        });
        builder.addCase(createBlackListItemAction.rejected, (state, action) => {
            state.createFetching = false;
            state.createError = action.error.message;
        });
    },
});

export default blackListSlice.reducer;
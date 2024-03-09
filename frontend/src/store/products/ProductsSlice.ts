import { createSlice } from "@reduxjs/toolkit";
import { addProductToBestsellersAction, fetchProductsListAction } from "./ProductsActions";
import { IProductsFullData } from "../../types/products";

interface ProductsState {
    data: IProductsFullData | null,
    fetching: boolean,
    error?: string,
    addToBestsellersFetching: boolean,
    addToBestsellersError?: string,
}

const initialState: ProductsState = {
    data: null,
    fetching: false,
    error: '',
    addToBestsellersFetching: false,
    addToBestsellersError: '',
};

export const productsSlice = createSlice({
    name: 'Products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProductsListAction.pending, (state) => {
            state.fetching = true;
            state.error = '';
        });
        builder.addCase(fetchProductsListAction.fulfilled, (state, action) => {
            state.fetching = false;
            state.data = action.payload;
        });
        builder.addCase(fetchProductsListAction.rejected, (state, action) => {
            state.fetching = false;
            state.error = action.error.message;
        });

        builder.addCase(addProductToBestsellersAction.pending, (state) => {
            state.addToBestsellersFetching = true;
            state.addToBestsellersError = '';
        });
        builder.addCase(addProductToBestsellersAction.fulfilled, (state) => {
            state.addToBestsellersFetching = false;
        });
        builder.addCase(addProductToBestsellersAction.rejected, (state, action) => {
            state.addToBestsellersFetching = false;
            state.addToBestsellersError = action.error.message;
        });
    },
});

export default productsSlice.reducer;
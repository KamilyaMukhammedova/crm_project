import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPI } from "../../axios";
import { PRODUCTS_URL } from "../../constants/api";
import { IProductInBestsellers, IProduct, IProductsFullData } from "../../types/products";

export const fetchProductsListAction = createAsyncThunk<IProductsFullData | null, string | undefined>(
    'productsList/fetch',
    async (queryPage= '?page=1') => {
        const response = await axiosAPI.get<IProductsFullData | null>(PRODUCTS_URL + queryPage);

        return response.data;
    }
);

export const addProductToBestsellersAction = createAsyncThunk<void, IProductInBestsellers>(
    'product/addToBestsellers',
    async (data) => {
        await axiosAPI.post<IProduct | null>(PRODUCTS_URL, data);
    }
);
import { createSlice } from "@reduxjs/toolkit";
import { IPromotionsBasic, IPromotionsFullData } from "../../types/promotions";
import {
    createPromotionAction,
    deletePromotionAction,
    editPromotionAction,
    fetchOnePromotionAction,
    fetchPromotionsListAction
} from "./PromotionsActions";

interface PromotionsState {
    fetching: boolean,
    data: IPromotionsFullData | null,
    onePromotion: IPromotionsBasic | null,
    error?: string,
    deleteFetching: boolean,
    deleteError?: string,
    createFetching: boolean,
    createError?: string,
    onePromFetching: boolean,
    onePromError?: string,
    editFetching: boolean,
    editError?: string,
}

const initialState: PromotionsState = {
    fetching: false,
    data: null,
    onePromotion: null,
    error: '',
    deleteFetching: false,
    deleteError: '',
    createFetching: false,
    createError: '',
    onePromFetching: false,
    onePromError: '',
    editFetching: false,
    editError: '',
};

export const promotionsSlice = createSlice({
    name: 'Promotions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPromotionsListAction.pending, (state) => {
            state.fetching = true;
            state.error = '';
        });
        builder.addCase(fetchPromotionsListAction.fulfilled, (state, action) => {
            state.fetching = false;
            state.data = action.payload;
        });
        builder.addCase(fetchPromotionsListAction.rejected, (state, action) => {
            state.fetching = false;
            state.error = action.error.message;
        });

        builder.addCase(fetchOnePromotionAction.pending, (state) => {
            state.onePromFetching = true;
            state.onePromotion = null;
            state.onePromError = '';
        });
        builder.addCase(fetchOnePromotionAction.fulfilled, (state, action) => {
            state.onePromFetching = false;
            state.onePromotion = action.payload;
        });
        builder.addCase(fetchOnePromotionAction.rejected, (state, action) => {
            state.onePromFetching = false;
            state.onePromError = action.error.message;
        });

        builder.addCase(deletePromotionAction.pending, (state) => {
            state.deleteFetching = true;
            state.deleteError = '';
        });
        builder.addCase(deletePromotionAction.fulfilled, (state) => {
            state.deleteFetching = false;
        });
        builder.addCase(deletePromotionAction.rejected, (state, action) => {
            state.deleteFetching = false;
            state.deleteError = action.error.message;
        });

        builder.addCase(createPromotionAction.pending, (state) => {
            state.createFetching = true;
            state.createError = '';
        });
        builder.addCase(createPromotionAction.fulfilled, (state) => {
            state.createFetching = false;
        });
        builder.addCase(createPromotionAction.rejected, (state, action) => {
            state.createFetching = false;
            state.createError = action.error.message;
        });

        builder.addCase(editPromotionAction.pending, (state) => {
            state.editFetching = true;
            state.editError = '';
        });
        builder.addCase(editPromotionAction.fulfilled, (state) => {
            state.editFetching = false;
        });
        builder.addCase(editPromotionAction.rejected, (state, action) => {
            state.editFetching = false;
            state.editError = action.error.message;
        });
    },
});

export default promotionsSlice.reducer;
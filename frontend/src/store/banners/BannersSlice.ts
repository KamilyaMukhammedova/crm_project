import { createSlice } from "@reduxjs/toolkit";
import {
    createBannerAction,
    deleteBannerAction,
    editBannerAction,
    fetchBannersListAction,
    fetchOneBannerAction
} from "./BannersActions";
import { IBanner, IBannersFullData } from "../../types/banners";

interface BannersState {
    data: IBannersFullData | null,
    oneBanner: IBanner | null,
    fetching: boolean,
    error?: string,
    deleteFetching: boolean,
    deleteError?: string,
    createFetching: boolean,
    createError?: string,
    oneBannerFetching: boolean,
    oneBannerError?: string,
    editFetching: boolean,
    editError?: string,
}

const initialState: BannersState = {
    data: null,
    oneBanner: null,
    fetching: false,
    error: '',
    deleteFetching: false,
    deleteError: '',
    createFetching: false,
    createError: '',
    oneBannerFetching: false,
    oneBannerError: '',
    editFetching: false,
    editError: '',
};

export const bannersSlice = createSlice({
    name: 'Banners',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBannersListAction.pending, (state) => {
            state.fetching = true;
            state.error = '';
        });
        builder.addCase(fetchBannersListAction.fulfilled, (state, action) => {
            state.fetching = false;
            state.data = action.payload;
        });
        builder.addCase(fetchBannersListAction.rejected, (state, action) => {
            state.fetching = false;
            state.error = action.error.message;
        });

        builder.addCase(fetchOneBannerAction.pending, (state) => {
            state.oneBannerFetching = true;
            state.oneBanner = null;
            state.oneBannerError = '';
        });
        builder.addCase(fetchOneBannerAction.fulfilled, (state, action) => {
            state.oneBannerFetching = false;
            state.oneBanner = action.payload;
        });
        builder.addCase(fetchOneBannerAction.rejected, (state, action) => {
            state.oneBannerFetching = false;
            state.oneBannerError = action.error.message;
        });

        builder.addCase(deleteBannerAction.pending, (state) => {
            state.deleteFetching = true;
            state.deleteError = '';
        });
        builder.addCase(deleteBannerAction.fulfilled, (state) => {
            state.deleteFetching = false;
        });
        builder.addCase(deleteBannerAction.rejected, (state, action) => {
            state.deleteFetching = false;
            state.deleteError = action.error.message;
        });

        builder.addCase(createBannerAction.pending, (state) => {
            state.createFetching = true;
            state.createError = '';
        });
        builder.addCase(createBannerAction.fulfilled, (state) => {
            state.createFetching = false;
        });
        builder.addCase(createBannerAction.rejected, (state, action) => {
            state.createFetching = false;
            state.createError = action.error.message;
        });

        builder.addCase(editBannerAction.pending, (state) => {
            state.editFetching = true;
            state.editError = '';
        });
        builder.addCase(editBannerAction.fulfilled, (state) => {
            state.editFetching = false;
        });
        builder.addCase(editBannerAction.rejected, (state, action) => {
            state.editFetching = false;
            state.editError = action.error.message;
        });
    },
});

export default bannersSlice.reducer;
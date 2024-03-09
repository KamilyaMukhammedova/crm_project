import { createSlice } from "@reduxjs/toolkit";
import { fetchBestsellersListAction } from "./BestsellersActions";
import { IBestsellersFullData } from "../../types/bestsellers";

interface BestsellersState {
    fetching: boolean,
    data: IBestsellersFullData | null,
    error?: string,
}

const initialState: BestsellersState = {
    fetching: false,
    data: null,
    error: '',
};

export const bestsellersSlice = createSlice({
    name: 'Bestsellers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBestsellersListAction.pending, (state) => {
            state.fetching = true;
            state.error = '';
        });
        builder.addCase(fetchBestsellersListAction.fulfilled, (state, action) => {
            state.fetching = false;
            state.data = action.payload;
        });
        builder.addCase(fetchBestsellersListAction.rejected, (state, action) => {
            state.fetching = false;
            state.error = action.error.message;
        });
    },
});

export default bestsellersSlice.reducer;
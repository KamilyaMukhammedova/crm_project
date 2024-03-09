import { createSlice } from "@reduxjs/toolkit";
import { fetchStoresListAction } from "./StoresActions";
import { IStoresFullData } from "../../types/stores";

interface StoresState {
    data: IStoresFullData | null,
    fetching: boolean,
    error?: string,
}

const initialState: StoresState = {
    data: null,
    fetching: false,
    error: '',
};

export const storesSlice = createSlice({
    name: 'Stores',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(fetchStoresListAction.pending, (state) => {
            state.fetching = true;
            state.error = '';
        });
        builder.addCase(fetchStoresListAction.fulfilled, (state, action) => {
            state.fetching = false;
            state.data = action.payload;
        });
        builder.addCase(fetchStoresListAction.rejected, (state, action) => {
            state.fetching = false;
            state.error = action.error.message;
        });
    },
});

export default storesSlice.reducer;


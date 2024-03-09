import { createSlice } from "@reduxjs/toolkit";
import { IClassificatorFullData } from "../../types/classificators";
import { fetchClassificatorsListAction } from "./ClassificatorsActions";

interface ClassificatorsState {
    fetching: boolean,
    data: IClassificatorFullData | null,
    error?: string,
}

const initialState: ClassificatorsState = {
    fetching: false,
    data: null,
    error: '',
};

export const classificatorsSlice = createSlice({
    name: 'Classificators',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchClassificatorsListAction.pending, (state) => {
            state.fetching = true;
            state.data = null;
            state.error = '';
        });
        builder.addCase(fetchClassificatorsListAction.fulfilled, (state, action) => {
            state.fetching = false;
            state.data = action.payload;
        });
        builder.addCase(fetchClassificatorsListAction.rejected, (state, action) => {
            state.fetching = false;
            state.error = action.error.message;
        });
    },
});

export default classificatorsSlice.reducer;
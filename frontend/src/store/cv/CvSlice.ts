import { createSlice } from "@reduxjs/toolkit";
import { fetchCvListAction, fetchOneCvAction } from "./CvActions";
import { ICv, ICvListFullData } from "../../types/cv";

interface CvState {
    cvListData: ICvListFullData | null,
    oneCvData: ICv | null,
    cvListFetching: boolean,
    cvListError?: string,
    oneCvFetching: boolean,
    oneCvError?: string,
}

const initialState: CvState = {
    cvListData: null,
    oneCvData: null,
    cvListFetching: false,
    cvListError: '',
    oneCvFetching: false,
    oneCvError: '',
};

export const cvSlice = createSlice({
    name: 'Cv',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCvListAction.pending, (state) => {
            state.cvListFetching = true;
            state.cvListError = '';
        });
        builder.addCase(fetchCvListAction.fulfilled, (state, action) => {
            state.cvListFetching = false;
            state.cvListData = action.payload;
        });
        builder.addCase(fetchCvListAction.rejected, (state, action) => {
            state.cvListFetching = false;
            state.cvListError = action.error.message;
        });

        builder.addCase(fetchOneCvAction.pending, (state) => {
            state.oneCvFetching = true;
            state.oneCvError = '';
        });
        builder.addCase(fetchOneCvAction.fulfilled, (state, action) => {
            state.oneCvFetching = false;
            state.oneCvData = action.payload;
        });
        builder.addCase(fetchOneCvAction.rejected, (state, action) => {
            state.oneCvFetching = false;
            state.oneCvError = action.error.message;
        });
    },
});

export default cvSlice.reducer;
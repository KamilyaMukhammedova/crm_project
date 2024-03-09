import { createSlice } from "@reduxjs/toolkit";
import { ITokens } from "../../types/auth";
import { authAction, authRefreshAction, authVerifyAction } from "./AuthActions";


interface AuthState {
    fetching: boolean,
    data: ITokens | null,
    verified: boolean,
    error?: string,
}

const initialState: AuthState = {
    fetching: false,
    data: null,
    verified: false,
    error: '',
};

export const authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(authAction.pending, (state) => {
            state.fetching = true;
            state.error = '';
        });
        builder.addCase(authAction.fulfilled, (state, action) => {
            state.fetching = false;
            state.data = action.payload;
        });
        builder.addCase(authAction.rejected, (state, action) => {
            state.fetching = false;
            state.error = action.error.message;
        });

        builder.addCase(authVerifyAction.pending, (state) => {
            state.fetching = true;
            state.error = '';
        });
        builder.addCase(authVerifyAction.fulfilled, (state, action) => {
            state.fetching = false;
            state.verified = action.payload;
        });
        builder.addCase(authVerifyAction.rejected, (state, action) => {
            state.fetching = false;
            state.error = action.error.message;
        });

        builder.addCase(authRefreshAction.pending, (state) => {
            state.fetching = true;
            state.error = '';
        });
        builder.addCase(authRefreshAction.fulfilled, (state, action) => {
            state.fetching = false;
            state.data = action.payload;
        });
        builder.addCase(authRefreshAction.rejected, (state, action) => {
            state.fetching = false;
            state.error = action.error.message;
        });
    },
});

export default authSlice.reducer;
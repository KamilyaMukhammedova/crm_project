import { IAccountsFullData } from "../../types/accounts";
import { createSlice } from "@reduxjs/toolkit";
import {
    createAccountAction,
    editAccountAction,
    editAccountPasswordAction,
    fetchAccountsListAction
} from "./AccountsActions";

interface AccountsState {
    data: IAccountsFullData | null,
    fetching: boolean,
    error?: string,
    createFetching: boolean,
    createError?: string,
    editFetching: boolean,
    editError?: string,
    editPasswordFetching: boolean,
    editPasswordError?: string,
}

const initialState: AccountsState = {
    data: null,
    fetching: false,
    error: '',
    createFetching: false,
    createError: '',
    editFetching: false,
    editError: '',
    editPasswordFetching: false,
    editPasswordError: '',
};

export const accountsSlice = createSlice({
    name: 'Accounts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAccountsListAction.pending, (state) => {
            state.fetching = true;
            state.error = '';
        });
        builder.addCase(fetchAccountsListAction.fulfilled, (state, action) => {
            state.fetching = false;
            state.data = action.payload;
        });
        builder.addCase(fetchAccountsListAction.rejected, (state, action) => {
            state.fetching = false;
            state.error = action.error.message;
        });

        builder.addCase(createAccountAction.pending, (state) => {
            state.createFetching = true;
            state.createError = '';
        });
        builder.addCase(createAccountAction.fulfilled, (state) => {
            state.createFetching = false;
        });
        builder.addCase(createAccountAction.rejected, (state, action) => {
            state.createFetching = false;
            state.createError = action.error.message;
        });

        builder.addCase(editAccountAction.pending, (state) => {
            state.editFetching = true;
            state.editError = '';
        });
        builder.addCase(editAccountAction.fulfilled, (state) => {
            state.editFetching = false;
        });
        builder.addCase(editAccountAction.rejected, (state, action) => {
            state.editFetching = false;
            state.editError = action.error.message;
        });

        builder.addCase(editAccountPasswordAction.pending, (state) => {
            state.editPasswordFetching = true;
            state.editPasswordError = '';
        });
        builder.addCase(editAccountPasswordAction.fulfilled, (state) => {
            state.editPasswordFetching = false;
        });
        builder.addCase(editAccountPasswordAction.rejected, (state, action) => {
            state.editPasswordFetching = false;
            state.editPasswordError = action.error.message;
        });
    },
});

export default accountsSlice.reducer;
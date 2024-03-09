import { createSlice } from "@reduxjs/toolkit";
import { IUserPurchaseItemsFullData, IUserPurchasesFullData, IUsersFullData } from "../../types/users";
import {
    editUserStatusAction,
    fetchUserPurchaseItemsAction,
    fetchUserPurchasesAction,
    fetchUsersListAction
} from "./UsersActions";

interface UsersState {
    data: IUsersFullData | null,
    purchasesData: IUserPurchasesFullData | null,
    purchaseItemsData: IUserPurchaseItemsFullData | null,
    fetching: boolean,
    error?: string,
    editStatusFetching: boolean,
    editStatusError?: string,
    purchasesFetching: boolean,
    purchasesError?: string,
    purchaseItemsFetching: boolean,
    purchaseItemsError?: string,
}

const initialState: UsersState = {
    data: null,
    purchasesData: null,
    purchaseItemsData: null,
    fetching: false,
    error: '',
    editStatusFetching: false,
    editStatusError: '',
    purchasesFetching: false,
    purchasesError: '',
    purchaseItemsFetching: false,
    purchaseItemsError: '',
};

export const usersSlice = createSlice({
    name: 'Bestsellers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsersListAction.pending, (state) => {
            state.fetching = true;
            state.error = '';
        });
        builder.addCase(fetchUsersListAction.fulfilled, (state, action) => {
            state.fetching = false;
            state.data = action.payload;
        });
        builder.addCase(fetchUsersListAction.rejected, (state, action) => {
            state.fetching = false;
            state.error = action.error.message;
        });

        builder.addCase(editUserStatusAction.pending, (state) => {
            state.editStatusFetching = true;
            state.editStatusError = '';
        });
        builder.addCase(editUserStatusAction.fulfilled, (state) => {
            state.editStatusFetching = false;
        });
        builder.addCase(editUserStatusAction.rejected, (state, action) => {
            state.editStatusFetching = false;
            state.editStatusError = action.error.message;
        });

        builder.addCase(fetchUserPurchasesAction.pending, (state) => {
            state.purchasesFetching = true;
            state.purchasesError = '';
        });
        builder.addCase(fetchUserPurchasesAction.fulfilled, (state, action) => {
            state.purchasesFetching = false;
            state.purchasesData = action.payload;
        });
        builder.addCase(fetchUserPurchasesAction.rejected, (state, action) => {
            state.purchasesFetching = false;
            state.purchasesError = action.error.message;
        });

        builder.addCase(fetchUserPurchaseItemsAction.pending, (state) => {
            state.purchaseItemsFetching = true;
            state.purchaseItemsError = '';
        });
        builder.addCase(fetchUserPurchaseItemsAction.fulfilled, (state, action) => {
            state.purchaseItemsFetching = false;
            state.purchaseItemsData = action.payload;
        });
        builder.addCase(fetchUserPurchaseItemsAction.rejected, (state, action) => {
            state.purchaseItemsFetching = false;
            state.purchaseItemsError = action.error.message;
        });
    },
});

export default usersSlice.reducer;
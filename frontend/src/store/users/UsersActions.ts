import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPI } from "../../axios";
import { USERS_URL } from "../../constants/api";
import {
    IEditedUserStatusData,
    IUser,
    IUserPurchaseItemsFullData,
    IUserPurchasesFullData,
    IUsersFullData
} from "../../types/users";

export const fetchUsersListAction = createAsyncThunk<IUsersFullData | null, string | undefined>(
    'usersList/fetch',
    async (queryPage= '?page=1') => {
        const response = await axiosAPI.get<IUsersFullData | null>(USERS_URL + queryPage);

        return response.data;
    }
);

export const editUserStatusAction = createAsyncThunk<void, IEditedUserStatusData>(
    'userStatus/edit',
    async (data) => {
        await axiosAPI.patch<IUser | null>(`${USERS_URL}${data.userId}/`, {is_active: data.is_active});
    }
);

export const fetchUserPurchasesAction = createAsyncThunk<IUserPurchasesFullData | null, {userId: string, query: string}>(
    'userPurchases/fetch',
    async ({userId, query}) => {
        const response = await axiosAPI.get<IUserPurchasesFullData | null>(`${USERS_URL}${userId}/orders/${query}`);

        return response.data;
    }
);

export const fetchUserPurchaseItemsAction = createAsyncThunk<IUserPurchaseItemsFullData | null, {userId: string, purchaseId: string, query: string}>(
    'userPurchaseItems/fetch',
    async ({userId, purchaseId, query}) => {
        const response =
            await axiosAPI.get<IUserPurchaseItemsFullData | null>(`${USERS_URL}${userId}/orders/${purchaseId}/${query}`);

        return response.data;
    }
);


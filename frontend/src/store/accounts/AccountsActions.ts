import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPI } from "../../axios";
import { ACCOUNTS_URL } from "../../constants/api";
import {
    IAccount,
    IAccountPasswordToEdit,
    IAccountsFullData,
    ICreatedAccount,
    IEditedAccountFullData
} from "../../types/accounts";

export const fetchAccountsListAction = createAsyncThunk<IAccountsFullData | null, string | undefined>(
    'accountsList/fetch',
    async (queryPage = '?page=1') => {
        const response = await axiosAPI.get<IAccountsFullData | null>(ACCOUNTS_URL + queryPage);

        return response.data;
    }
);

export const createAccountAction = createAsyncThunk<void, ICreatedAccount>(
    'account/create',
    async (data) => {
        await axiosAPI.post<IAccount | null>(ACCOUNTS_URL, data);
    }
);

export const editAccountAction = createAsyncThunk<void, IEditedAccountFullData>(
    'account/edit',
    async (data) => {
        await axiosAPI.put<IAccount | null>(`${ACCOUNTS_URL}${data.accountId}/`, data.dataToEdit);
    }
);

export const editAccountPasswordAction = createAsyncThunk<void, IAccountPasswordToEdit>(
    'accountPassword/edit',
    async (data) => {
        await axiosAPI.patch<IAccount | null>(`${ACCOUNTS_URL}${data.accountId}/`, {password: data.password});
    }
);


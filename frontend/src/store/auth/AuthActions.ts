// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { message } from "antd";
// import { axiosAPI } from "../../axios";
// import { AUTH_ADMIN_URL, AUTH_REFRESH_URL, AUTH_VERIFY_URL } from "../../constants/api";
// import { IDataForAuth, ITokens } from "../../types/auth";
//
// export const authAction = createAsyncThunk<ITokens | null, IDataForAuth>(
//     'auth/fetch',
//     async (data, thunkAPI) => {
//         try {
//             const response = await axiosAPI.post<ITokens | null>(AUTH_ADMIN_URL, data);
//
//             if (response.data) {
//                 localStorage.setItem('indenim:a:token', response.data.access);
//                 localStorage.setItem('indenim:r:token', response.data.refresh);
//             }
//
//             return response.data;
//         } catch (e) {
//             localStorage.removeItem('indenim:a:token');
//             localStorage.removeItem('indenim:r:token');
//             message.error('Login was failed! Try again.');
//
//             return thunkAPI.rejectWithValue("Error! Authorization is failed!");
//         }
//     }
// );
//
// export const authVerifyAction = createAsyncThunk<boolean, {token: string}>(
//     'auth/verify',
//     async (data, thunkAPI) => {
//         try {
//             const response = await axiosAPI.post(AUTH_VERIFY_URL, data);
//
//             return response.status >= 200 && response.status < 299;
//         } catch (e) {
//             return thunkAPI.rejectWithValue("Error! Token verification is failed!");
//         }
//     }
// );
//
// export const authRefreshAction = createAsyncThunk<ITokens | null, {refresh: string}>(
//     'auth/refresh',
//     async (data, thunkAPI) => {
//         try {
//             const response = await axiosAPI.post<ITokens | null>(AUTH_REFRESH_URL, data);
//
//             if (response.data) {
//                 localStorage.setItem('indenim:a:token', response.data.access);
//             }
//
//             return response.data;
//         } catch (e) {
//             return thunkAPI.rejectWithValue("Error! Token refresh is failed!");
//         }
//     }
// );
//


import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { axiosAPI } from "../../axios";
import { AUTH_ADMIN_URL, AUTH_REFRESH_URL, AUTH_VERIFY_URL } from "../../constants/api";
import { IDataForAuth, ITokens } from "../../types/auth";

export const authAction = createAsyncThunk<ITokens | null, IDataForAuth>(
    'auth/fetch',
    async (data: IDataForAuth, {rejectWithValue, dispatch}) => {
        try {
            const response = await axiosAPI.post<ITokens | null>(AUTH_ADMIN_URL, data);

            if (response.data) {
                localStorage.setItem('indenim:a:token', response.data.access);
                localStorage.setItem('indenim:r:token', response.data.refresh);
                await dispatch(authVerifyAction({token: response.data.access}));
            }

            return response.data;
        } catch (e) {
            localStorage.removeItem('indenim:a:token');
            localStorage.removeItem('indenim:r:token');
            message.error('Login was failed! Try again.');
            return rejectWithValue("Error! Authorization is failed!");
        }
    }
);

export const authVerifyAction = createAsyncThunk<boolean, { token: string }>(
    'auth/verify',
    async (data, thunkAPI) => {
        try {
            const response = await axiosAPI.post(AUTH_VERIFY_URL, data);
            return response.status >= 200 && response.status < 299;
        } catch (e) {
            return thunkAPI.rejectWithValue("Error! Token verification is failed!");
        }
    }
);

export const authRefreshAction = createAsyncThunk<ITokens | null, { refresh: string }>(
    'auth/refresh',
    async (data, thunkAPI) => {
        try {
            const response = await axiosAPI.post<ITokens | null>(AUTH_REFRESH_URL, data);

            if (response.data) {
                localStorage.setItem('indenim:a:token', response.data.access);
            }

            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Error! Token refresh is failed!");
        }
    }
);


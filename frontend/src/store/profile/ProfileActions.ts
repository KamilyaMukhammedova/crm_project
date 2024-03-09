import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPI } from "../../axios";
import { IUserProfile } from "../../types/profile";

export const fetchProfileAction = createAsyncThunk<IUserProfile | null>(
    'profile/fetch',
    async () => {
        const response = await axiosAPI.get<IUserProfile | null>('/api/v1/users/profile/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('indenim:a:token')}`
            }
        });

        return response.data;
    }
);
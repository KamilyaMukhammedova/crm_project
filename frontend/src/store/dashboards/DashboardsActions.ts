import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPI } from "../../axios";
import { DASHBOARD_BONUSES_URL, DASHBOARD_USERS_URL } from "../../constants/api";
import { IBonusesDashboardData, IUsersDashboardData } from "../../types/dashboards";

export const fetchUsersDashboardDataAction = createAsyncThunk<IUsersDashboardData | null>(
    'usersDashboardData/fetch',
    async () => {
        const response = await axiosAPI.get<IUsersDashboardData | null>(DASHBOARD_USERS_URL);

        return response.data;
    }
);

export const fetchBonusesDashboardDataAction = createAsyncThunk<IBonusesDashboardData | null>(
    'bonusesDashboardData/fetch',
    async () => {
        const response = await axiosAPI.get<IBonusesDashboardData | null>(DASHBOARD_BONUSES_URL);

        return response.data;
    }
);
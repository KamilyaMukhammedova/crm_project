import { createSlice } from "@reduxjs/toolkit";
import { IBonusesDashboardData, IUsersDashboardData } from "../../types/dashboards";
import { fetchBonusesDashboardDataAction, fetchUsersDashboardDataAction } from "./DashboardsActions";

interface DashboardsState {
    usersData: IUsersDashboardData | null,
    usersDataFetching: boolean,
    usersDataError?: string,
    bonusesData: IBonusesDashboardData | null,
    bonusesDataFetching: boolean,
    bonusesDataError?: string,
}

const initialState: DashboardsState = {
    usersData: null,
    usersDataFetching: false,
    usersDataError: '',
    bonusesData: null,
    bonusesDataFetching: false,
    bonusesDataError: '',
};

export const dashboardsSlice = createSlice({
    name: 'Dashboards',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsersDashboardDataAction.pending, (state) => {
            state.usersDataFetching = true;
            state.usersDataError = '';
        });
        builder.addCase(fetchUsersDashboardDataAction.fulfilled, (state, action) => {
            state.usersDataFetching = false;
            state.usersData = action.payload;
        });
        builder.addCase(fetchUsersDashboardDataAction.rejected, (state, action) => {
            state.usersDataFetching = false;
            state.usersDataError = action.error.message;
        });

        builder.addCase(fetchBonusesDashboardDataAction.pending, (state) => {
            state.bonusesDataFetching = true;
            state.bonusesDataError = '';
        });
        builder.addCase(fetchBonusesDashboardDataAction.fulfilled, (state, action) => {
            state.bonusesDataFetching = false;
            state.bonusesData = action.payload;
        });
        builder.addCase(fetchBonusesDashboardDataAction.rejected, (state, action) => {
            state.bonusesDataFetching = false;
            state.bonusesDataError = action.error.message;
        });
    },
});

export default dashboardsSlice.reducer;
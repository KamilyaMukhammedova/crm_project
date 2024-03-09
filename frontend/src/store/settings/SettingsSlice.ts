import { createSlice } from "@reduxjs/toolkit";
import { ISetting } from "../../types/settings";
import { editSettingAction, fetchSettingsListAction } from "./SettingsActions";


interface SettingsState {
    fetching: boolean,
    data: ISetting[],
    error?: string,
    editFetching: boolean,
    editError?: string,
}

const initialState: SettingsState = {
    fetching: false,
    data: [],
    error: '',
    editFetching: false,
    editError: '',
};

export const settingsSlice = createSlice({
    name: 'Settings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSettingsListAction.pending, (state) => {
            state.fetching = true;
            state.error = '';
        });
        builder.addCase(fetchSettingsListAction.fulfilled, (state, action) => {
            state.fetching = false;
            state.data = action.payload;
        });
        builder.addCase(fetchSettingsListAction.rejected, (state, action) => {
            state.fetching = false;
            state.error = action.error.message;
        });

        builder.addCase(editSettingAction.pending, (state) => {
            state.editFetching = true;
            state.editError = '';
        });
        builder.addCase(editSettingAction.fulfilled, (state) => {
            state.editFetching = false;
        });
        builder.addCase(editSettingAction.rejected, (state, action) => {
            state.editFetching = false;
            state.editError = action.error.message;
        });
    },
});

export default settingsSlice.reducer;
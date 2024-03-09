import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPI } from "../../axios";
import { SETTINGS_URL } from "../../constants/api";
import { EditedSetting, ISetting } from "../../types/settings";

export const fetchSettingsListAction = createAsyncThunk<ISetting[]>(
    'settingsList/fetch',
    async () => {
        const response = await axiosAPI.get<ISetting[]>(SETTINGS_URL);

        return response.data;
    }
);

export const editSettingAction = createAsyncThunk<void, EditedSetting>(
    'setting/edit',
    async (data) => {
        await axiosAPI.put<ISetting | null>(SETTINGS_URL, data);
    }
);
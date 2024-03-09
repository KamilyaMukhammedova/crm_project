import { createSlice } from "@reduxjs/toolkit";
import { IUserProfile } from "../../types/profile";
import { fetchProfileAction } from "./ProfileActions";

interface ProfileState {
    fetching: boolean,
    data: IUserProfile | null,
    error?: string,
}

const initialState: ProfileState = {
    fetching: false,
    data: null,
    error: '',
};

export const profileSlice = createSlice({
    name: 'Profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProfileAction.pending, (state) => {
            state.fetching = true;
            state.error = '';
        });
        builder.addCase(fetchProfileAction.fulfilled, (state, action) => {
            state.fetching = false;
            state.data = action.payload;
        });
        builder.addCase(fetchProfileAction.rejected, (state, action) => {
            state.fetching = false;
            state.error = action.error.message;
        });
    },
});

export default profileSlice.reducer;
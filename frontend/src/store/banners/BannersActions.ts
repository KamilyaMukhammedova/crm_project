import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPI } from "../../axios";
import { BANNERS_URL } from "../../constants/api";
import { CreatedBanner, IBanner, IBannersFullData, IEditedBannerFullData } from "../../types/banners";


export const fetchBannersListAction = createAsyncThunk<IBannersFullData | null, string | undefined>(
    'bannersList/fetch',
    async (queryPage= '?page=1') => {
        const response = await axiosAPI.get<IBannersFullData | null>(BANNERS_URL + queryPage);

        return response.data;
    }
);

export const fetchOneBannerAction = createAsyncThunk<IBanner | null, string>(
    'oneBanner/fetch',
    async (bannerId) => {
        const response = await axiosAPI.get<IBanner | null>(`${BANNERS_URL}${bannerId}/`);

        return response.data;
    }
);

export const deleteBannerAction = createAsyncThunk<void, string>(
    'banner/delete',
    async (bannerId) => {
        await axiosAPI.delete(`${BANNERS_URL}${bannerId}/`);
    }
);

export const createBannerAction = createAsyncThunk<void, CreatedBanner>(
    'banner/create',
    async (data) => {
        await axiosAPI.post<IBanner| null>(BANNERS_URL, data);
    }
);

export const editBannerAction = createAsyncThunk<void, IEditedBannerFullData>(
    'banner/edit',
    async (data) => {
        await axiosAPI.patch<IBanner| null>(`${BANNERS_URL}${data.bannerId}/`, data.dataToEdit);
    }
);


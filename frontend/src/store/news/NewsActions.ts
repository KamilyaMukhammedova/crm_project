import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPI } from "../../axios";
import { NEWS_URL } from "../../constants/api";
import { CreatedNews, IEditedNewsFullData, INewsFullData, News, IOneNews } from "../../types/news";

export const fetchNewsListAction = createAsyncThunk<INewsFullData | null, string | undefined>(
    'newsList/fetch',
    async (queryPage= '?page=1') => {
        const response = await axiosAPI.get<INewsFullData | null>(NEWS_URL + queryPage);

        return {
            ...response.data,
            current: queryPage ? queryPage : '?page=1'
        } as INewsFullData | null;
    }
);

export const fetchOneNewsAction = createAsyncThunk<IOneNews | null, string>(
    'oneNews/fetch',
    async (newsId) => {
        const response = await axiosAPI.get<IOneNews | null>(`${NEWS_URL}${newsId}/`);

        return response.data;
    }
);

export const deleteNewsAction = createAsyncThunk<void, string>(
    'news/delete',
    async (newsId) => {
        await axiosAPI.delete(`${NEWS_URL}${newsId}/`);
    }
);

export const createNewsAction = createAsyncThunk<void, CreatedNews>(
    'news/create',
    async (data) => {
        await axiosAPI.post<News | null>(NEWS_URL, data);
    }
);

export const editNewsAction = createAsyncThunk<void, IEditedNewsFullData>(
    'news/edit',
    async (data) => {
        await axiosAPI.patch<News | null>(`${NEWS_URL}${data.newsId}/`, data.dataToEdit);
    }
);
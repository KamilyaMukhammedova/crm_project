import { IBasicModel, IResponseWithPagination } from "./basic";

export type News = Omit<IBasicModel, 'small_description_ru' | 'small_description_en' | 'small_description_uz'> & { detail_image: string, preview: string };

export type CreatedNews = Omit<IBasicModel, 'id' | 'created_date'> & { detail_image: string, preview: string };

export type EditedNews = Omit<IBasicModel, 'id' | 'created_date'> & { detail_image: string, preview: string };

export interface IEditedNewsFullData {
    dataToEdit: EditedNews,
    newsId: string,
}

export interface IOneNews extends IBasicModel {
    detail_image: string,
    preview: string,
}

export interface INewsFullData extends IResponseWithPagination {
    results: News[],
    current: string | undefined,
}
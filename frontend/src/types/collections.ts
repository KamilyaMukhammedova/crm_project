import { ICategory, IDepartement, IResponseWithPagination } from "./basic";

export interface ICollection {
    _id: string,
    detail_image: string,
    preview: string,
    title_ru: string,
    title_en: string,
    title_uz: string,
    position: number,
    is_title_black: boolean,
    is_active: boolean,
    created_date: string,
}

export interface ICollectionsFullData extends IResponseWithPagination {
    results: ICollection[]
}

export interface ICollectionFullData {
    _id: string,
    detail_image: string,
    preview: string,
    title_ru: string,
    title_en: string,
    title_uz: string,
    position: number,
    is_title_black: boolean,
    products : {
        id: number,
        preview: string,
        title: string,
        price: number,
        is_hit: boolean,
        category: ICategory,
        department: IDepartement,
        model: string,
    }[],
    is_active: boolean,
}

export interface IEditedCollectionFullData {
    dataToEdit: CreatedCollection,
    collectionId: string,
}

export type CreatedCollection = Omit<ICollection, '_id' | 'created_date' | 'is_title_black' | 'detail_image'>;
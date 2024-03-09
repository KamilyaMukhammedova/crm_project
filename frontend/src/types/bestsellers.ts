import { ICategory, IDepartement, IResponseWithPagination } from "./basic";

export interface IBestseller {
    id: number,
    preview: string,
    title: string,
    price: number,
    is_hit: boolean,
    model: string,
    category: ICategory | null,
    department: IDepartement | null,
    collections: ICollectionBestseller[],
}

export interface ICollectionBestseller {
    id: number,
    title_ru: string,
    title_en: string,
    title_uz: string,
}

export interface IBestsellersFullData extends IResponseWithPagination {
    results: IBestseller[]
}
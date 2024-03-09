import { IResponseWithPagination } from "./basic";

export interface IStore {
    id: number,
    created_at: string,
    updated_at: string,
    code: string,
    name_en: string,
    name_ru: string,
    address: string,
    address_en: string,
    address_ru: string,
    address_uz: string,
    longitude: string,
    latitude: string,
    from_time: string | null,
    to_time: string | null,
    contact: string,
    city: IStoreCity | null,
}

export interface IStoreCity {
    id: number,
    name: string,
    name_en: string,
    code: string,
}

export interface IStoresFullData extends IResponseWithPagination {
    results: IStore[],
}
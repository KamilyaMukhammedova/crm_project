import { IResponseWithPagination } from "./basic";

export interface IClassificator {
    id: number,
    code: string,
    name: string,
    name_en: string,
    created_date: string,
    modified_date: string,

    size_code: string,
    barcode: string,
    size: string,
}

export interface IClassificatorFullData extends IResponseWithPagination {
    results: IClassificator[]
}
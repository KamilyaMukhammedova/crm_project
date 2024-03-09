import { IResponseWithPagination } from "./basic";

export interface ICv {
    id: number,
    vacancy: number,
    full_name: string,
    email: string,
    phone: string,
    created_date: string,
    files: ICvFile[],
    created_by: ICvCreator,
}

export interface ICvListFullData extends IResponseWithPagination {
    results: ICv[]
}

interface ICvFile {
    id: number,
    file: string,
}

interface ICvCreator {
    id: number,
    full_name: string,
    email: string,
    birth_date: string,
    gender: number,
    phone: string,
}
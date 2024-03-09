import { IResponseWithPagination } from "./basic";

export interface IBlackListItem {
    id: number,
    product: IBasicProduct,
    product_color: IProductColor | null,
    created_at: string,
    updated_at: string,
}

export interface IBlackListFullData extends IResponseWithPagination {
    results: IBlackListItem[]
}

export interface IBlackListProductListFullData extends IResponseWithPagination {
    results: IBlackListProduct[]
}

export interface ICreatedBlackListItem {
    product_id: number | string,
    product_colors: (number | undefined)[],
}

export interface IBlackListProduct {
    id: number,
    model: string,
    title: string,
    colors: IBlackListProductColor[],
}

export interface IBlackListProductColor {
    id: number,
    article: string,
    title: string,
    color: string,
    sizes: number[],
    images: any[],
}

export interface IBasicProduct {
    id: number,
    model: string,
    title: string,
    compound: string,
    category: IProductCategoryOrDepartment | null,
    department: IProductCategoryOrDepartment | null,
    is_hit: boolean,
    price: number,
}

export interface IProductCategoryOrDepartment {
    id: number,
    code: string,
    name: string,
    name_en: string,
    created_date: string,
    modified_date: string,
}

interface IProductColor {
    id: number,
    article: string,
    title: string,
    color: string,
}




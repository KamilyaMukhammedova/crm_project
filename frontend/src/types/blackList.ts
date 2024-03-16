import { IResponseWithPagination } from "./basic";

export interface IBlackListItem {
    _id: string,
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
    _id: string,
    model: string,
    title: string,
    colors: IBlackListProductColor[],
}

export interface IBlackListProductColor {
    _id: string,
    article: string,
    title: string,
    color: string,
    sizes: number[],
    images: any[],
}

export interface IBasicProduct {
    _id: string,
    model: string,
    title: string,
    compound: string,
    category: IProductCategoryOrDepartment | null,
    department: IProductCategoryOrDepartment | null,
    is_hit: boolean,
    price: number,
}

export interface IProductCategoryOrDepartment {
    _id: string,
    code: string,
    name: string,
    name_en: string,
    created_date: string,
    modified_date: string,
}

interface IProductColor {
    _id: string,
    article: string,
    title: string,
    color: string,
}




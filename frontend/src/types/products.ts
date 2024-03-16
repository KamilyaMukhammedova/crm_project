import { IBasicProduct } from "./blackList";
import { IResponseWithPagination } from "./basic";

export interface IProduct extends IBasicProduct {
    bestsellers: any[],
}

export interface IProductsFullData extends IResponseWithPagination {
    results: IProduct[],
}

export interface IProductInBestsellers {
    product_id: string,
    collections: (number | undefined)[],
}
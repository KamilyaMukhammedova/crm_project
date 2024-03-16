import { IResponseWithPagination } from "./basic";
import { IBlackListItem } from "./blackList";

export interface IUniqueListItem extends IBlackListItem {
    percent: number,
}

export interface IUniqueListFullData extends IResponseWithPagination {
    results: IUniqueListItem[],
}

export interface ICreatedUniqueListItem {
    product_id: string,
    product_color_id: string | null,
    percent: number,
}
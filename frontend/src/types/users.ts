import { IResponseWithPagination } from "./basic";

export interface IUser {
    id: number,
    full_name: string,
    is_active: boolean,
    last_login: string | null,
    orders: number,
    phone: string,
    balance: IBalance | null,
}

export interface IUserPurchase {
    id: number,
    added_bonus: number,
    date: string | null,
    items_amount: number,
    order_uid: string,
    price: number,
    return_receipt: string[],
    store_obj: IUserPurchaseStore | null,
}

export interface IUserPurchaseItem {
    id: number,
    amount: number,
    barcode: string,
    bonus_applicable: string,
    created_at: string,
    updated_at: string,
    model: string,
    option_code: string,
    order: number,
    order_reviewed: boolean,
    percent: number,
    price: number,
    product: {
        id: number,
        category: { id: number, name: string },
        department: { id: number, code: string, name: string },
    },
    product_color: number,
    qty: number,
    refund: boolean,
    size: string,
    size_code: string,
}

export interface IUserPurchaseStore {
    id: number,
    code: string,
    name_en: string,
    name_ru: string,
}

export interface IUsersFullData extends IResponseWithPagination {
    results: IUser[],
}

export interface IUserPurchasesFullData extends IResponseWithPagination {
    results: IUserPurchase[],
}

export interface IUserPurchaseItemsFullData extends IResponseWithPagination {
    results: IUserPurchaseItem[],
}

export interface IEditedUserStatusData {
    is_active: boolean,
    userId: string,
}

interface IBalance {
    full_name: string,
    phone: string,
    user_id: number,
    value: number,
}
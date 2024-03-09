import { IResponseWithPagination } from "./basic";

export interface IAccount {
    id: number,
    avatar: string,
    phone: string,
    username: string,
    email: string,
    full_name: string,
    is_active: boolean,
    gender: string | null,
    birth_date: string | null,
    date_joined: string,
    qr_hash: string,
    notifications: boolean,
    type: number,
    qr_hash_expiration_date: string,
    city: {id: number, name: string} | null,
    card_number: string,
    orders_count: number,
    balance_value: number,
    promocode: string,
    received_promocode: string | null,
}

export interface IAccountsFullData extends IResponseWithPagination {
    results: IAccount[],
}

export interface ICreatedAccount {
    username: string,
    full_name: string,
    password: string,
    type: number | null,
    is_active: boolean,
}

export interface IEditedAccountFullData {
    dataToEdit: Omit<ICreatedAccount, 'username' | 'password'>,
    accountId: string,
}

export interface IAccountPasswordToEdit {
    password: string,
    accountId: string,
}
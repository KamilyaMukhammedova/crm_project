import { ICategory } from "./basic";

export interface IUserProfile {
    id: number,
    avatar: string,
    birth_date: string | null,
    card_number: string,
    city: ICategory | null,
    date_joined: string,
    email: string,
    full_name: string,
    gender: string | null,
    phone: string,
    notifications: boolean,
    orders_count: number,
    promocode: string,
    qr_hash: string,
    qr_hash_expiration_date: string,
    type: number,
}
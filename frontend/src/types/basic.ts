import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export interface IBasicModel {
    _id: string,
    created_date: string,
    is_active: boolean,
    title_ru: string,
    title_en: string,
    title_uz: string,
    small_description_ru: string,
    small_description_en: string,
    small_description_uz: string,
    description_ru: string,
    description_en: string,
    description_uz: string,
}

export interface IBreadcrumbsItem {
    title: string,
    href: string,
}

export interface IImage {
    // id: number,
    _id: string,
    file: string,
}

export interface ITab {
    key: string,
    title: string,
}

export interface ICategory {
    id: number,
    name: string,
}

export interface IDepartement {
    id: number,
    code: string,
    name: string,
}

export interface ISidebarBoard {
    key: string,
    title: string,
    icon: string,
    path: string,
    isPrimary: boolean,
}

export interface ISidebarDropDown {
    key: string,
    title: string,
    path: string,
}

export interface IResponseWithPagination {
    count: number,
    next: string | null,
    previous: string | null,
}

export type ThunkActionCreator = (page?: string) => ThunkAction<void, RootState, undefined, AnyAction>;

export type AsyncThunkConfig = {
    state: RootState;
};


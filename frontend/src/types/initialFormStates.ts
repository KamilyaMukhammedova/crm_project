import { IBasicModel } from "./basic";

export type BasicFormState = Omit<IBasicModel, '_id' | 'created_date' | 'is_active'> & {
    detail_image: string,
    preview: string
};

export type DrugAndDropPropsFormState = ICollectionFormState | BasicFormState | IBannerFormState;

export type RegexCollectionFormState = Pick<IBasicRegexFormState, 'title_en' | 'title_ru' | 'title_uz'>;

export type FaqFormState = Omit<IBasicModel, 'small_description_ru' | 'small_description_en' | 'small_description_uz' | 'created_date' | '_id' | 'is_active'>;

export interface ICollectionFormState {
    title_ru: string,
    title_en: string,
    title_uz: string,
    is_active: boolean,
    position: number,
    preview: string,
}

export interface IPeriodFormState {
    start_date: string,
    end_date: string,
}

export interface IStatusFormState {
    is_active: boolean
}

export interface IPasswordFormState {
    password: string,
    passwordRepeat: string,
}

export interface IBannerFormState {
    image: string,
    position: number,
}

export interface IBasicRegexFormState {
    title_en: false,
    title_ru: false,
    title_uz: false,
    small_description_en: false,
    small_description_ru: false,
    small_description_uz: false,
    description_en: false,
    description_ru: false,
    description_uz: false,
}




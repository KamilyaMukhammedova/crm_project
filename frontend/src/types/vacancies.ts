import { IBasicModel, IResponseWithPagination } from "./basic";

export type Vacancy = Omit<IBasicModel, 'image'> & {requests: number};

export type CreatedVacancy = Omit<IBasicModel, 'image' | 'created_date' | 'id'>;

export interface IEditedVacancyFullData {
    dataToEdit: CreatedVacancy,
    vacancyId: string,
}

export interface IVacanciesFullData extends IResponseWithPagination {
    results: Vacancy[],
    current: string | undefined,
}

export interface IVacancyCreationFormState {
    title_ru: string;
    title_en: string;
    title_uz: string;
    small_description_ru: string;
    small_description_en: string;
    small_description_uz: string;
    description_ru: string;
    description_en: string;
    description_uz: string;
    detail_image?: string,
    preview?: string,
}
import { IBasicModel, IResponseWithPagination } from "./basic";

export type Faq = Omit<IBasicModel, 'small_description_ru' | 'small_description_en' | 'small_description_uz' | 'created_date'>;

export type CreatedFaq = Omit<Faq, 'id'>;

export interface IEditedFaqFullData {
    dataToEdit: CreatedFaq,
    faqId: string,
}

export interface IFaqFullData extends IResponseWithPagination {
    results: Faq[],
}
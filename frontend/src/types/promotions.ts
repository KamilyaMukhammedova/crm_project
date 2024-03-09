import { IBasicModel, IResponseWithPagination } from "./basic";

export type Promotion = Omit<IPromotionsBasic, 'description_ru' | 'description_en' | 'description_uz'>;

export type CreatedPromotion = Omit<Promotion, 'id' | 'created_date'>;

export type EditedPromotion = Omit<IPromotionsBasic, 'id' | 'created_date' | 'is_active'>;

export interface IEditedPromFullData {
    dataToEdit: EditedPromotion,
    promId: string,
}

export interface IPromotionsBasic extends IBasicModel {
    start_date: string,
    end_date: string,
    detail_image: string,
    preview: string,
}

export interface IPromotionsFullData extends IResponseWithPagination {
    results: Promotion[],
    current: string | undefined,
}
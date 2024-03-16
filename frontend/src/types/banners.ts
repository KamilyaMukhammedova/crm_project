import { IResponseWithPagination } from "./basic";

export interface IBanner {
    _id: string,
    image: string,
    position: number,
}

export interface IBannersFullData extends IResponseWithPagination {
    results: IBanner[]
}

export interface IEditedBannerFullData {
    dataToEdit: CreatedBanner,
    bannerId: string,
}

export type CreatedBanner = Omit<IBanner, '_id'>;
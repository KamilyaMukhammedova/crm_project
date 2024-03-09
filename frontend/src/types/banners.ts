import { IResponseWithPagination } from "./basic";

export interface IBanner {
    id: number,
    image: string,
    position: number,
}

export interface IBannersFullData extends IResponseWithPagination {
    results: IBanner[]
}

export interface IEditedBannerFullData {
    dataToEdit: CreatedBanner,
    bannerId: number,
}

export type CreatedBanner = Omit<IBanner, 'id'>;
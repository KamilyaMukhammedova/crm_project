import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPI } from "../../axios";
import { CLASSIFICATORS_URL } from "../../constants/api";
import { IClassificatorFullData } from "../../types/classificators";

interface IClassificatorDataForList {
    typeNameQuery: string,
    otherQuery: string,
}

export const fetchClassificatorsListAction = createAsyncThunk<IClassificatorFullData | null, IClassificatorDataForList>(
    'classificators/fetch',
    async ({typeNameQuery, otherQuery}) => {
        const response =
            await axiosAPI.get<IClassificatorFullData | null>(`${CLASSIFICATORS_URL}${otherQuery}&type=${typeNameQuery}`);

        return response.data;
    }
);
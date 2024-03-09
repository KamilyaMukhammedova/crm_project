import React from 'react';
import Classificator from "../../../components/Classificator/Classificator";

const SaleSeasons = () => {
    return (
        <Classificator
            classificatorPath={'sale_seasons'}
            classificatorName={'Sale seasons'}
            queryTypeName={'sale_season'}
        />
    );
};

export default SaleSeasons;
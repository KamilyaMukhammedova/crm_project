import React from 'react';
import Classificator from "../../../components/Classificator/Classificator";

const CollectionSeasons = () => {
    return (
        <Classificator
            classificatorPath={'collection_seasons'}
            classificatorName={'Collection seasons'}
            queryTypeName={'collection_season'}
        />
    );
};

export default CollectionSeasons;
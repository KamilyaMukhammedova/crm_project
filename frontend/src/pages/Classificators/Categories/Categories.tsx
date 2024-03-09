import React from 'react';
import Classificator from "../../../components/Classificator/Classificator";

const Categories = () => {
    return (
        <Classificator
            classificatorPath={'categories'}
            classificatorName={'Categories'}
            queryTypeName={'category'}
        />
    );
};

export default Categories;
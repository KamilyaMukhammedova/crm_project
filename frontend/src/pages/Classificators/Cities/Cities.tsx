import React from 'react';
import Classificator from "../../../components/Classificator/Classificator";

const Cities = () => {
    return (
        <Classificator
            classificatorPath={'cities'}
            classificatorName={'Cities'}
            queryTypeName={'city'}
        />
    );
};

export default Cities;
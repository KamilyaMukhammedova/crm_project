import React from 'react';
import Classificator from "../../../components/Classificator/Classificator";

const Sizes = () => {
    return (
        <Classificator
            classificatorPath={'sizes'}
            classificatorName={'Sizes'}
            queryTypeName={'size'}
        />
    );
};

export default Sizes;
import React from 'react';
import Classificator from "../../../components/Classificator/Classificator";

const Themes = () => {
    return (
        <Classificator
            classificatorPath={'themes'}
            classificatorName={'Themes'}
            queryTypeName={'theme'}
        />
    );
};

export default Themes;
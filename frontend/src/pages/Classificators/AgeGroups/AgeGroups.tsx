import React from 'react';
import Classificator from "../../../components/Classificator/Classificator";

const AgeGroups = () => {
    return (
        <Classificator
            classificatorPath={'age_groups'}
            classificatorName={'Age groups'}
            queryTypeName={'age_group'}
        />
    );
};

export default AgeGroups;
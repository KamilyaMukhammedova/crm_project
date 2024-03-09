import React from 'react';
import Classificator from "../../../components/Classificator/Classificator";

const BuyingGroups = () => {
    return (
        <Classificator
            classificatorPath={'buying_groups'}
            classificatorName={'Buying groups'}
            queryTypeName={'buying_group'}
        />
    );
};

export default BuyingGroups;
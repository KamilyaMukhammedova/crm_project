import React from 'react';
import Classificator from "../../../components/Classificator/Classificator";

const Departments = () => {
    return (
        <Classificator
            classificatorPath={'departments'}
            classificatorName={'Departments'}
            queryTypeName={'department'}
        />
    );
};

export default Departments;
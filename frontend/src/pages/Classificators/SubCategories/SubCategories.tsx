import React from 'react';
import Classificator from "../../../components/Classificator/Classificator";

const SubCategories = () => {
    return (
        <Classificator
            classificatorPath={'sub_categories'}
            classificatorName={'Sub Categories'}
            queryTypeName={'sub_category'}
        />
    );
};

export default SubCategories;
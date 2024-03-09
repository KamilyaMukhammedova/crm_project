import React, { FC, useEffect } from 'react';
import { FaqFormState, IStatusFormState } from "../../../types/initialFormStates";
import { useForm } from "../../../hooks/useForm";
import { getFormItemsWidth } from "../../../utils/createEditForm";
import { checkRegexState } from "../../../utils/checkRegexp";
import { TABS_LANGUAGE } from "../../../constants/tabsLanguage";
import Status from "../../Status/Status";
import BasicCreateItems from "../ContentManagement/BasicCreateForm/BasicCreateItems/BasicCreateItems";
import Tabs from "../../Tabs/Tabs";
import styles from "../ContentManagement/BasicCreateForm/BasicCreateForm.module.scss";

interface IProps {
    formState: FaqFormState,
    setFormState: React.Dispatch<React.SetStateAction<FaqFormState>>,
    statusState: IStatusFormState,
    setStatusState: React.Dispatch<React.SetStateAction<IStatusFormState>>,
    isEditedForm: boolean,
    checkRequiredFields: boolean,
    getFormRegexWarning: (hasRegexWarning: boolean) => void,
}

const FaqCreateForm: FC<IProps> = ({
                                       formState,
                                       setFormState,
                                       statusState,
                                       setStatusState,
                                       isEditedForm,
                                       checkRequiredFields,
                                       getFormRegexWarning
                                   }) => {
    const useFormProps = useForm(setFormState);

    useEffect(() => {
        getFormRegexWarning(checkRegexState(useFormProps.regexWarning));
    }, [useFormProps.regexWarning]);

    const getStatusState = (value: boolean, name: string) => {
        setStatusState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const generateForm = (
        language: string,
        titleKey: keyof FaqFormState,
        descriptionKey: keyof FaqFormState,
    ) => {
        return (
            <BasicCreateItems
                language={language}
                getState={useFormProps.handleSetState}
                onBlur={useFormProps.onBlur}
                titleFromParent={formState[titleKey]}
                descriptionFromParent={formState[descriptionKey]}
                widthInputsWrapper={getFormItemsWidth(false, true)?.widthInputsWrapper}
                widthChildrenWrapper={getFormItemsWidth(false, true)?.widthChildrenWrapper}
                regexWarning={useFormProps.regexWarning}
                checkRequiredFields={checkRequiredFields}
            >
                <Status
                    statusFromParent={Boolean(statusState?.is_active)}
                    getStatusState={getStatusState}
                    name={'is_active'}
                />
            </BasicCreateItems>
        );
    };

    const enForm = generateForm('en', 'title_en', 'description_en');
    const ruForm = generateForm('ru', 'title_ru', 'description_ru');
    const uzForm = generateForm('uz', 'title_uz', 'description_uz');

    return (
        <div className={styles.basicCreateForm}>
            <Tabs tabs={TABS_LANGUAGE} onClick={useFormProps.onLanguage}/>
            {useFormProps.currentLanguage === 'en' && enForm}
            {useFormProps.currentLanguage === 'ru' && ruForm}
            {useFormProps.currentLanguage === 'uz' && uzForm}
        </div>
    );
};

export default FaqCreateForm;
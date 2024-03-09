import React, { FC, useEffect, useState } from 'react';
import { UploadFile } from "antd";
import { useForm } from "../../../../hooks/useForm";
import {
    BasicFormState,
    DrugAndDropPropsFormState,
    IPeriodFormState,
    IStatusFormState
} from "../../../../types/initialFormStates";
import { TABS_LANGUAGE } from "../../../../constants/tabsLanguage";
import { getFormItemsWidth } from "../../../../utils/createEditForm";
import { generateDrugAndDropProps } from "../../../../utils/drugAndDropProps";
import { checkRegexState } from "../../../../utils/checkRegexp";
import Tabs from "../../../Tabs/Tabs";
import BasicCreateItems from "./BasicCreateItems/BasicCreateItems";
import DragAndDrop from "../../../DragAndDrop/DragAndDrop";
import Period from "../../../Period/Period";
import Status from "../../../Status/Status";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from "./BasicCreateForm.module.scss";


interface IProps {
    formState: BasicFormState,
    setFormState: React.Dispatch<React.SetStateAction<BasicFormState>>,
    isEditedForm: boolean,
    hasPeriod: boolean,
    hasStatus: boolean,
    checkRequiredFields: boolean,
    hasNewsStatus?: boolean,
    periodState?: IPeriodFormState,
    setPeriodState?: React.Dispatch<React.SetStateAction<IPeriodFormState>>,
    statusState?: IStatusFormState,
    setStatusState?: React.Dispatch<React.SetStateAction<IStatusFormState>>,
    periodError?: string | null,
    setPeriodError?: React.Dispatch<React.SetStateAction<string | null>>,
    getFormRegexWarning?: (hasRegexWarning: boolean) => void,
}

const BasicCreateForm: FC<IProps> = ({
                                         formState,
                                         setFormState,
                                         isEditedForm,
                                         hasPeriod,
                                         hasStatus,
                                         checkRequiredFields,
                                         hasNewsStatus,
                                         periodState,
                                         setPeriodState,
                                         statusState,
                                         setStatusState,
                                         periodError,
                                         setPeriodError,
                                         getFormRegexWarning,
                                     }) => {
    const [fileListDetailImg, setFileListDetailImg] = useState<UploadFile<any>[]>([]);
    const [imgUrlFromApiDetailImg, setImgUrlFromApiDetailImg] = useState('');

    const [fileListPreviewImg, setFileListPreviewImg] = useState<UploadFile<any>[]>([]);
    const [imgUrlFromApiPreviewImg, setImgUrlFromApiPreviewImg] = useState('');

    const useFormProps = useForm(setFormState as React.Dispatch<React.SetStateAction<BasicFormState>>);

    useEffect(() => {
        if (isEditedForm) {
            setFileListDetailImg([]);
            setFileListPreviewImg([]);
            setImgUrlFromApiDetailImg(formState.detail_image || '');
            setImgUrlFromApiPreviewImg(formState.preview || '');
        }
    }, [isEditedForm, formState]);

    useEffect(() => {
        if (getFormRegexWarning) {
            getFormRegexWarning(checkRegexState(useFormProps.regexWarning));
        }
    }, [useFormProps.regexWarning]);

    const getPeriodState = (value: string, name: string) => {
        if (hasPeriod && periodState && setPeriodState) {
            setPeriodState(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const getStatusState = (value: boolean, name: string) => {
        if ((hasStatus || hasNewsStatus) && statusState && setStatusState) {
            setStatusState(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const drugAndDrops = (
        <div
            className={`formInModal__drugAndDropWrapper ${hasPeriod && hasStatus ? 'formInModal_dgMedium' : 'formInModal_dgLarge'}`}
        >
            <DragAndDrop
                props={generateDrugAndDropProps(
                    {
                        fileList: fileListPreviewImg,
                        setFileList: setFileListPreviewImg,
                        setImageUrlFromApi: setImgUrlFromApiPreviewImg,
                        setFormState: setFormState as React.Dispatch<React.SetStateAction<DrugAndDropPropsFormState>>,
                        nameInState: 'preview',
                    }
                )}
                isEditedForm={isEditedForm}
                imageUrlFromApi={imgUrlFromApiPreviewImg}
                setImageUrlFromApi={setImgUrlFromApiPreviewImg}
                widthPercent={'48'}
                imagePlaceholder={'Preview'}
                setFormState={setFormState}
                nameInState={'preview'}
                error={(checkRequiredFields && !formState.preview)}
            />
            <DragAndDrop
                props={generateDrugAndDropProps(
                    {
                        fileList: fileListDetailImg,
                        setFileList: setFileListDetailImg,
                        setImageUrlFromApi: setImgUrlFromApiDetailImg,
                        setFormState: setFormState as React.Dispatch<React.SetStateAction<DrugAndDropPropsFormState>>,
                        nameInState: 'detail_image',
                    }
                )}
                isEditedForm={isEditedForm}
                imageUrlFromApi={imgUrlFromApiDetailImg}
                setImageUrlFromApi={setImgUrlFromApiDetailImg}
                widthPercent={'48'}
                imagePlaceholder={'Main'}
                setFormState={setFormState}
                nameInState={'detail_image'}
                error={(checkRequiredFields && !formState.detail_image)}
            />
        </div>
    );

    const status = (
        <Status
            statusFromParent={Boolean(statusState?.is_active)}
            getStatusState={getStatusState}
            name={'is_active'}
        />
    );

    const periodWithStatus = (
        <div className={styles.basicCreateForm__periodStatusWrapper}>
            <Period
                getPeriodState={getPeriodState}
                startDateFromParent={periodState?.start_date}
                endDateFromParent={periodState?.end_date}
                periodError={periodError}
                setPeriodError={setPeriodError}
                checkRequiredFields={checkRequiredFields}
            />
            {status}
        </div>
    );

    const generateForm = (
        language: string,
        titleKey: keyof BasicFormState,
        shortTextKey: keyof BasicFormState,
        descriptionKey: keyof BasicFormState,
    ) => {
        return (
            <BasicCreateItems
                language={language}
                getState={(value: string, name: string) => useFormProps.handleSetState(value, name)}
                onBlur={useFormProps.onBlur}
                titleFromParent={formState[titleKey]}
                shortTextFromParent={formState[shortTextKey]}
                descriptionFromParent={formState[descriptionKey]}
                widthInputsWrapper={getFormItemsWidth(hasPeriod, hasStatus)?.widthInputsWrapper}
                widthChildrenWrapper={getFormItemsWidth(hasPeriod, hasStatus)?.widthChildrenWrapper}
                regexWarning={useFormProps.regexWarning}
                checkRequiredFields={checkRequiredFields}
            >
                {(hasPeriod && hasStatus) && periodWithStatus}
                {((!hasStatus && !hasPeriod) || (hasStatus && hasPeriod)) && drugAndDrops}
                {hasNewsStatus && (<div className={styles.basicCreateForm__newsStatusWrapper}>{status}</div>)}
                {(hasStatus && !hasPeriod) && status}
            </BasicCreateItems>
        );
    };

    const enForm = generateForm('en', 'title_en', 'small_description_en', 'description_en');
    const ruForm = generateForm('ru', 'title_ru', 'small_description_ru', 'description_ru');
    const uzForm = generateForm('uz', 'title_uz', 'small_description_uz', 'description_uz');

    return (
        <div className={styles.basicCreateForm}>
            <Tabs tabs={TABS_LANGUAGE} onClick={useFormProps.onLanguage}/>
            {useFormProps.currentLanguage === 'en' && enForm}
            {useFormProps.currentLanguage === 'ru' && ruForm}
            {useFormProps.currentLanguage === 'uz' && uzForm}
        </div>
    );
};

export default BasicCreateForm;
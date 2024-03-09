import React, { FC, useEffect, useState } from 'react';
import { UploadFile } from "antd";
import { regForCollectionFormItems, WRONG_REGEX_TITLE_MESSAGE } from "../../../../constants/regexp";
import { REGEX_COLLECTION_INITIAL_STATE } from "../../../../constants/initialState";
import { FORM_RETRIEVED_DATA_ERROR } from "../../../../constants/form";
import { generateDrugAndDropProps } from "../../../../utils/drugAndDropProps";
import { checkRegexp, checkRegexState } from "../../../../utils/checkRegexp";
import {
    DrugAndDropPropsFormState,
    ICollectionFormState,
    RegexCollectionFormState
} from "../../../../types/initialFormStates";
import ModalWindow from "../../../ui/ModalWindow/ModalWindow";
import FormItem from "../../../ui/FormItem/FormItem";
import DragAndDrop from "../../../DragAndDrop/DragAndDrop";
import Status from "../../../Status/Status";
import ErrorMessage from "../../../ui/ErrorMessage/ErrorMessage";


interface IProps {
    isModalOpen: boolean,
    isEditedMode: boolean,
    checkRequiredFields: boolean,
    oneCollectionError: string | undefined,
    onCancel: () => void,
    onConfirm: () => void,
    collectionFormState: ICollectionFormState,
    setCollectionFormState: React.Dispatch<React.SetStateAction<ICollectionFormState>>,
    getFormRegexWarning: (hasRegexWarning: boolean) => void,
    loading?: boolean,
    error?: string,
}

const CollectionCreateForm: FC<IProps> = ({
                                              isModalOpen,
                                              isEditedMode,
                                              checkRequiredFields,
                                              oneCollectionError,
                                              onCancel,
                                              onConfirm,
                                              collectionFormState,
                                              setCollectionFormState,
                                              getFormRegexWarning,
                                              loading,
                                              error,
                                          }) => {
    const [fileListPreviewImg, setFileListPreviewImg] = useState<UploadFile<any>[]>([]);
    const [imgUrlFromApiPreviewImg, setImgUrlFromApiPreviewImg] = useState('');

    const [regexWarning, setRegexWarning] = useState<RegexCollectionFormState>(
        {...REGEX_COLLECTION_INITIAL_STATE}
    );

    useEffect(() => {
        setImgUrlFromApiPreviewImg(collectionFormState.preview || '');
    }, [collectionFormState]);

    useEffect(() => {
        if (isModalOpen) {
            setFileListPreviewImg([]);
            setRegexWarning({...REGEX_COLLECTION_INITIAL_STATE});
        }
    }, [isModalOpen]);

    useEffect(() => {
        getFormRegexWarning(checkRegexState(regexWarning));
    }, [regexWarning]);

    const onChange = (value: string | boolean, name: string) => {
        if (typeof value !== 'string') {
            setCollectionFormState(prevState => ({
                ...prevState,
                [name]: value,
            }));
        } else {
            const regex = regForCollectionFormItems[name as keyof typeof regForCollectionFormItems];
            const regexIsValid = checkRegexp(regex, value);

            setCollectionFormState(prevState => ({
                ...prevState,
                [name]: value,
            }));

            setRegexWarning(prevState => ({
                ...prevState,
                [name]: !regexIsValid,
            }));
        }
    };

    const onBlur = (value: string, name: string) => {
        const regex = regForCollectionFormItems[name as keyof typeof regForCollectionFormItems];
        const regexIsValid = checkRegexp(regex, value);
        setRegexWarning(prevState => ({
            ...prevState,
            [name]: !regexIsValid,
        }));
    };

    return (
        <ModalWindow
            isModalOpen={isModalOpen}
            onCancel={onCancel}
            onConfirm={onConfirm}
            okBtnTitle={`${!isEditedMode ? 'Create' : 'Edit'}`}
            title={`${!isEditedMode ? 'Create a new' : 'Edit'} Collection`}
            isFooterFlex={true}
            loading={loading}
        >
            <div className={'formInModal'}>
                {error && <ErrorMessage errorMsg={error}/>}
                {oneCollectionError &&
                    <ErrorMessage errorMsg={oneCollectionError + FORM_RETRIEVED_DATA_ERROR.one_collection}/>}
                <div className={'formInModal__itemWrapper formInModal__firstItemWrapper'}>
                    <FormItem
                        title={'Title (english)'}
                        name={'title_en'}
                        value={collectionFormState.title_en}
                        placeholder={'Collection '}
                        onChange={onChange}
                        onBlur={onBlur}
                        requiredErrorProps={[checkRequiredFields, !collectionFormState.title_en, !regexWarning.title_en]}
                        regexErrorProps={[regexWarning.title_en]}
                        regexErrorMsg={WRONG_REGEX_TITLE_MESSAGE}
                    />
                </div>
                <div className={'formInModal__itemWrapper'}>
                    <FormItem
                        title={'Title (russian)'}
                        name={'title_ru'}
                        value={collectionFormState.title_ru}
                        placeholder={'Коллекция'}
                        onChange={onChange}
                        onBlur={onBlur}
                        requiredErrorProps={[checkRequiredFields, !collectionFormState.title_ru, !regexWarning.title_ru]}
                        regexErrorProps={[regexWarning.title_ru]}
                        regexErrorMsg={WRONG_REGEX_TITLE_MESSAGE}
                    />
                </div>
                <div className={'formInModal__itemWrapper'}>
                    <FormItem
                        title={'Title (uzbek)'}
                        name={'title_uz'}
                        value={collectionFormState.title_uz}
                        placeholder={'To’plam'}
                        onChange={onChange}
                        onBlur={onBlur}
                        requiredErrorProps={[checkRequiredFields, !collectionFormState.title_uz, !regexWarning.title_uz]}
                        regexErrorProps={[regexWarning.title_uz]}
                        regexErrorMsg={WRONG_REGEX_TITLE_MESSAGE}
                    />
                </div>
                <div className={'formInModal__drugAndDropWrapper2'}>
                    <DragAndDrop
                        props={generateDrugAndDropProps(
                            {
                                fileList: fileListPreviewImg,
                                setFileList: setFileListPreviewImg,
                                setImageUrlFromApi: setImgUrlFromApiPreviewImg,
                                setFormState: setCollectionFormState as React.Dispatch<React.SetStateAction<DrugAndDropPropsFormState>>,
                                nameInState: 'preview',
                            }
                        )}
                        isEditedForm={isEditedMode}
                        imageUrlFromApi={imgUrlFromApiPreviewImg}
                        setImageUrlFromApi={setImgUrlFromApiPreviewImg}
                        widthPercent={'97'}
                        imagePlaceholder={'Preview'}
                        setCollectionFormState={setCollectionFormState}
                        nameInState={'preview'}
                        error={(checkRequiredFields && !collectionFormState.preview)}
                    />
                </div>
                <div className={'formInModal__statusWrapper'}>
                    <Status
                        statusFromParent={Boolean(collectionFormState?.is_active)}
                        getStatusState={onChange}
                        name={'is_active'}
                        isAlignedStart={true}
                    />
                </div>
            </div>
        </ModalWindow>
    );
};

export default CollectionCreateForm;
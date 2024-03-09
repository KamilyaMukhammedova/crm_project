import React, { FC, useEffect, useState } from 'react';
import { UploadFile } from "antd";
import { DrugAndDropPropsFormState, IBannerFormState } from "../../../../types/initialFormStates";
import { FORM_ERROR_MESSAGES, FORM_RETRIEVED_DATA_ERROR } from "../../../../constants/form";
import { generateDrugAndDropProps } from "../../../../utils/drugAndDropProps";
import ModalWindow from "../../../ui/ModalWindow/ModalWindow";
import ErrorMessage from "../../../ui/ErrorMessage/ErrorMessage";
import DragAndDrop from "../../../DragAndDrop/DragAndDrop";
import FormItem from "../../../ui/FormItem/FormItem";

interface IProps {
    formState: IBannerFormState,
    setFormState: React.Dispatch<React.SetStateAction<IBannerFormState>>,
    isModalOpen: boolean,
    isEditedMode: boolean,
    checkRequiredFields: boolean,
    oneBannerError: string | undefined,
    onCancel: () => void,
    onConfirm: () => void,
    loading?: boolean,
    error?: string,
}

const BannerCreateForm: FC<IProps> = ({
                                          formState,
                                          setFormState,
                                          isModalOpen,
                                          isEditedMode,
                                          checkRequiredFields,
                                          oneBannerError,
                                          onCancel,
                                          onConfirm,
                                          loading,
                                          error,
                                      }) => {
    const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
    const [imgUrlFromApi, setImgUrlFromApi] = useState('');
    const [positionError, setPositionError] = useState(false);

    useEffect(() => {
        if(isModalOpen) {
            setFileList([]);
        }
    }, [isModalOpen]);

    useEffect(() => {
        // setImgUrlFromApi(formState.image ? formState.image : '');
        setImgUrlFromApi(formState.image || '');
    }, [formState]);

    useEffect(() => {
        if (+formState.position === 0 || !Number.isInteger(+formState.position)) {
            setPositionError(true);
        } else {
            setPositionError(false);
        }
    }, [formState.position]);

    const onChange = (value: string, name: string) => {
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <ModalWindow
            isModalOpen={isModalOpen}
            onCancel={onCancel}
            onConfirm={onConfirm}
            okBtnTitle={`${!isEditedMode ? 'Create' : 'Edit'}`}
            title={`${!isEditedMode ? 'Create a new' : 'Edit'} Banner`}
            isFooterFlex={true}
            loading={loading}
            confirmBtnDisabled={positionError}
        >
            <div className={'formInModal'}>
                {error && <ErrorMessage errorMsg={error}/>}
                {oneBannerError && <ErrorMessage errorMsg={oneBannerError + FORM_RETRIEVED_DATA_ERROR.one_banner}/>}
                <div className={'formInModal__itemWrapper formInModal__firstItemWrapper'}>
                    <DragAndDrop
                        props={generateDrugAndDropProps(
                            {
                                fileList: fileList,
                                setFileList: setFileList,
                                setImageUrlFromApi: setImgUrlFromApi,
                                setFormState: setFormState as React.Dispatch<React.SetStateAction<DrugAndDropPropsFormState>>,
                                nameInState: 'image',
                            }
                        )}
                        isEditedForm={isEditedMode}
                        imageUrlFromApi={imgUrlFromApi}
                        setImageUrlFromApi={setImgUrlFromApi}
                        widthPercent={'100'}
                        imagePlaceholder={'Image'}
                        setBannerFormState={setFormState}
                        nameInState={'image'}
                        truncateNum={20}
                        error={(checkRequiredFields && !formState.image)}
                    />
                </div>
                <div className={'formInModal__itemWrapper formInModal__lastItemWrapper'}>
                    <FormItem
                        title={'Position'}
                        name={'position'}
                        value={formState.position}
                        placeholder={'Position'}
                        onChange={onChange}
                        requiredErrorProps={[]}
                        restErrorProps={[positionError]}
                        restErrorMsg={FORM_ERROR_MESSAGES.position}
                        inputType={'number'}
                        minValue={1}
                    />
                </div>
            </div>
        </ModalWindow>
    );
};

export default BannerCreateForm;
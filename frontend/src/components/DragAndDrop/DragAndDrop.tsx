import React, { FC } from 'react';
import { useTranslation } from "react-i18next";
import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import { DeleteOutlined, PaperClipOutlined } from "@ant-design/icons";
import { FORM_REQUIRED_MESSAGES } from "../../constants/form";
import { BasicFormState, IBannerFormState, ICollectionFormState } from "../../types/initialFormStates";
import { checkAndRenderImageUrl, truncateFileName } from "../../utils/drugAndDrop";
import drugAndDropIcon from "../../assets/drug_and_drop_icon.svg";
import styles from "./DragAndDrop.module.scss";


interface IProps {
    props: UploadProps,
    isEditedForm: boolean,
    imageUrlFromApi: string,
    setImageUrlFromApi: React.Dispatch<React.SetStateAction<string>>,
    widthPercent: string,
    imagePlaceholder: string,
    nameInState: string,
    setFormState?: React.Dispatch<React.SetStateAction<BasicFormState>>,
    setCollectionFormState?: React.Dispatch<React.SetStateAction<ICollectionFormState>>,
    setBannerFormState?: React.Dispatch<React.SetStateAction<IBannerFormState>>,
    truncateNum?: number,
    error?: boolean,
}

const DragAndDrop: FC<IProps> = ({
                                     props,
                                     imageUrlFromApi,
                                     isEditedForm,
                                     setImageUrlFromApi,
                                     widthPercent,
                                     imagePlaceholder,
                                     nameInState,
                                     setFormState,
                                     setCollectionFormState,
                                     setBannerFormState,
                                     truncateNum,
                                     error,
                                 }) => {
    const {t} = useTranslation();

    const onCustomReset = () => {
        setImageUrlFromApi('');

        setFormState && setFormState(prevState => ({
            ...prevState,
            [nameInState]: ''
        }));

        setCollectionFormState && setCollectionFormState(prevState => ({
            ...prevState,
            [nameInState]: ''
        }));

        setBannerFormState && setBannerFormState(prevState => ({
            ...prevState,
            [nameInState]: ''
        }));
    };

    return (
        <div style={{width: `${widthPercent}%`}}>
            <Upload.Dragger
                {...props}
                disabled={isEditedForm && props.fileList?.length === 0 && Boolean(imageUrlFromApi)}
                className={styles.drugAndDrop}
                style={{
                    padding: '20px',
                    boxShadow: '2px 4px 10px 0px rgba(55, 55, 55, 0.20)',
                    border: `1px dashed ${error ? '#FF0000' : '#B4B4B4'}`,
                }}
            >
                {
                    imageUrlFromApi ?
                        <img
                            src={checkAndRenderImageUrl(imageUrlFromApi)}
                            alt="Drug and drop uploaded"
                            className={styles.drugAndDrop__imagePreview}
                        /> :
                        <>
                            <p className="ant-upload-drag-icon">
                                <img src={drugAndDropIcon} alt={'Drug and drop icon'}/>
                            </p>
                            <div className="ant-upload-text">
                                <p className={styles.drugAndDrop__title}>Drag & Drop or</p>
                                <p className={[styles.drugAndDrop__title, styles.drugAndDrop__text].join(' ')}>
                                    Choose file to upload
                                </p>
                            </div>
                            <p className="ant-upload-hint">{imagePlaceholder}</p>
                        </>
                }
            </Upload.Dragger>
            {
                (isEditedForm && props.fileList?.length === 0 && imageUrlFromApi) &&
                <div className={styles.customRemoveWrapper} onClick={onCustomReset}>
                    <p>
                        <PaperClipOutlined/>
                        <span>{truncateFileName(imageUrlFromApi, truncateNum ? truncateNum : 10)}</span>
                    </p>
                    <DeleteOutlined/>
                </div>
            }
            {error && <p className={'error'}>{t(FORM_REQUIRED_MESSAGES.image)}</p>}
        </div>
    );
};

export default DragAndDrop;


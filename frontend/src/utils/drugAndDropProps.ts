// import React from "react";
// import { message, UploadFile, UploadProps } from "antd";
// import { axiosAPI } from "../axios";
// import { DrugAndDropPropsFormState } from "../types/initialFormStates";
// import { IImage } from "../types/basic";
// import { getImagePathFromUrl } from "./drugAndDrop";
//
//
// interface IData {
//     fileList: UploadFile<any>[],
//     setFileList: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>,
//     setImageUrlFromApi: React.Dispatch<React.SetStateAction<string>>,
//     setFormState: React.Dispatch<React.SetStateAction<DrugAndDropPropsFormState>>,
//     nameInState: string,
// }
//
// const setImageState = (
//     setFormState: React.Dispatch<React.SetStateAction<DrugAndDropPropsFormState>>,
//     imageUrl: string,
//     name: string,
// ) => {
//     if (setFormState) {
//         setFormState(prevState => ({
//             ...prevState,
//             [name]: imageUrl,
//         }));
//     }
// };
//
// export const generateDrugAndDropProps = (data: IData): UploadProps => {
//     const {
//         fileList,
//         setFileList,
//         setImageUrlFromApi,
//         setFormState,
//         nameInState,
//     } = data;
//
//     return {
//         name: 'file',
//         multiple: false,
//         accept: '.jpeg, .jpg, .png',
//         fileList: fileList,
//         onRemove: file => {
//             setFileList([]);
//             setImageUrlFromApi('');
//             setImageState(setFormState as React.Dispatch<React.SetStateAction<DrugAndDropPropsFormState>>, '', nameInState);
//         },
//         beforeUpload: async (file) => {
//             if (fileList.length >= 1) {
//                 message.error("You can upload only one image!");
//                 return false;
//             }
//
//             if (file) {
//                 try {
//                     const formData = new FormData();
//                     formData.append('file', file);
//
//                     const response = await axiosAPI.post<IImage | null>('/api/v1/classificators/file_upload/', formData);
//                     if (response.data) {
//                         setImageState(
//                             setFormState as React.Dispatch<React.SetStateAction<DrugAndDropPropsFormState>>,
//                             response.data ? getImagePathFromUrl(response.data.file) : '',
//                             nameInState
//                         );
//                         setImageUrlFromApi(response.data.file);
//                     }
//                 } catch (e) {
//                     setImageState(
//                         setFormState as React.Dispatch<React.SetStateAction<DrugAndDropPropsFormState>>,
//                         '',
//                         nameInState
//                     );
//                     setImageUrlFromApi('');
//                     message.error('Try upload image again!');
//                 }
//             }
//
//             setFileList([file]);
//             return false;
//         },
//         onChange(info) {
//             const {status} = info.file;
//
//             if (status === 'done') {
//                 message.success(`${info.file.name} file uploaded successfully.`);
//             } else if (status === 'error') {
//                 message.error(`${info.file.name} file upload failed.`);
//             }
//         },
//     }
// };
//

import React from "react";
import { message, UploadFile, UploadProps } from "antd";
import { axiosAPI } from "../axios";
import { DrugAndDropPropsFormState } from "../types/initialFormStates";
import { IImage } from "../types/basic";
import { getImagePathFromUrl } from "./drugAndDrop";


interface IData {
    fileList: UploadFile<any>[],
    setFileList: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>,
    setImageUrlFromApi: React.Dispatch<React.SetStateAction<string>>,
    setFormState: React.Dispatch<React.SetStateAction<DrugAndDropPropsFormState>>,
    nameInState: string,
}

const setImageState = (
    setFormState: React.Dispatch<React.SetStateAction<DrugAndDropPropsFormState>>,
    imageUrl: string,
    name: string,
) => {
    if (setFormState) {
        setFormState(prevState => ({
            ...prevState,
            [name]: imageUrl,
        }));
    }
};

export const generateDrugAndDropProps = (data: IData): UploadProps => {
    const {
        fileList,
        setFileList,
        setImageUrlFromApi,
        setFormState,
        nameInState,
    } = data;

    return {
        name: 'file',
        multiple: false,
        accept: '.jpeg, .jpg, .png',
        fileList: fileList,
        onRemove: file => {
            setFileList([]);
            setImageUrlFromApi('');
            setImageState(setFormState as React.Dispatch<React.SetStateAction<DrugAndDropPropsFormState>>, '', nameInState);
        },
        beforeUpload: async (file) => {
            if (fileList.length >= 1) {
                message.error("You can upload only one image!");
                return false;
            }

            if (file) {
                try {
                    const formData = new FormData();
                    formData.append('file', file);

                    const response = await axiosAPI.post<IImage | null>('/api/v1/classificators/file_upload/', formData);
                    if (response.data) {
                        setImageState(
                            setFormState as React.Dispatch<React.SetStateAction<DrugAndDropPropsFormState>>,
                            response.data ? getImagePathFromUrl(response.data.file) : '',
                            nameInState
                        );
                        setImageUrlFromApi(response.data.file);
                    }
                } catch (e) {
                    setImageState(
                        setFormState as React.Dispatch<React.SetStateAction<DrugAndDropPropsFormState>>,
                        '',
                        nameInState
                    );
                    setImageUrlFromApi('');
                    message.error('Try upload image again!');
                }
            }

            setFileList([file]);
            return false;
        },
        onChange(info) {
            const {status} = info.file;

            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    }
};


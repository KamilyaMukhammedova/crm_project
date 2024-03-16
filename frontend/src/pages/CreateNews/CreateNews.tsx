import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { message } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IBasicCreateEdit, useCreateEdit } from "../../hooks/useCreateEdit";
import { BasicFormState, IStatusFormState } from "../../types/initialFormStates";
import { INITIAL_BASIC_CREATE_EDIT_STATE, INITIAL_STATUS_STATE } from "../../constants/initialState";
import { FORM_ERROR_MESSAGES, FORM_RETRIEVED_DATA_ERROR, FORM_SUCCESS_MESSAGES } from "../../constants/form";
import { getBreadcrumbsItems } from "./constants";
import { createStateObjForEditForm, formHasEmptyValues } from "../../utils/createEditForm";
import { createNewsAction, editNewsAction, fetchOneNewsAction } from "../../store/news/NewsActions";
import Breadcrumbs from "../../components/ui/Breadcrumbs/Breadcrumbs";
import AccentButton from "../../components/ui/AccentButton/AccentButton";
import BasicCreateForm from "../../components/Forms/ContentManagement/BasicCreateForm/BasicCreateForm";
import ErrorMessage from "../../components/ui/ErrorMessage/ErrorMessage";


const CreateNews: FC = () => {
    const {t} = useTranslation();
    // const history = useHistory();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const {newsId} = useParams<{ newsId: string }>();

    const {oneNewsData, oneNewsError} = useAppSelector(state => state.newsReducer);

    const [formState, setFormState] =
        useState<BasicFormState>({...INITIAL_BASIC_CREATE_EDIT_STATE});

    const [statusState, setStatusState] =
        useState<IStatusFormState>({...INITIAL_STATUS_STATE});

    const createEditProps = useCreateEdit(
        false,
        state => state.newsReducer,
    ) as IBasicCreateEdit;

    useEffect(() => {
        const getOneNewsData = async () => {
            if (newsId) {
                await dispatch(fetchOneNewsAction(newsId));
            }
        };

        if (newsId) {
            void getOneNewsData();
        } else {
            setFormState({...INITIAL_BASIC_CREATE_EDIT_STATE});
            setStatusState({...INITIAL_STATUS_STATE});
        }
    }, [newsId]);

    useEffect(() => {
        if(newsId) {
            if (oneNewsData && oneNewsData?._id === newsId) {
                const editedNewsData: BasicFormState = createStateObjForEditForm(INITIAL_BASIC_CREATE_EDIT_STATE, oneNewsData);
                setFormState(editedNewsData);
                setStatusState({is_active: oneNewsData.is_active});
            }
        }
    }, [oneNewsData]);

    const createNews = async () => {
        const languageFromUrl = new URLSearchParams(window.location.search).get('lang') || 'en';

        if (formHasEmptyValues(formState)) {
            createEditProps.setCheckRequiredFields(true);
            message.error(t(FORM_ERROR_MESSAGES.fields_required));
        } else if (createEditProps.formHasRegexWarning) {
            createEditProps.setCheckRequiredFields(true);
            message.error(t(FORM_ERROR_MESSAGES.regex_primary_warning));
        } else {
            if (!newsId) {
                await dispatch(createNewsAction({...formState, ...statusState})).unwrap()
                    .then(() => {
                        createEditProps.setFormCreateError('');
                        navigate(`/content_management/news?lang=${languageFromUrl}`);
                        message.success(t(FORM_SUCCESS_MESSAGES.news_created));
                    })
                    .catch((rejectedValueOrSerializedError) => {
                        createEditProps.setFormCreateError(rejectedValueOrSerializedError.message);
                    });
            } else {
                await dispatch(editNewsAction({
                    dataToEdit: {...formState, ...statusState},
                    newsId,
                })).unwrap()
                    .then(() => {
                        createEditProps.setFormEditError('');
                        navigate(`/content_management/news?lang=${languageFromUrl}`);
                        message.success(t(FORM_SUCCESS_MESSAGES.news_edited));
                    })
                    .catch((rejectedValueOrSerializedError) => {
                        createEditProps.setFormEditError(rejectedValueOrSerializedError.message);
                    });
            }

            createEditProps.setCheckRequiredFields(false);
        }
    };

    return (
        <>
            <div className={'basicPage'}>
                <div className={'topBlock'}>
                    <Breadcrumbs items={getBreadcrumbsItems(newsId ? newsId : '')}/>
                    <AccentButton
                        title={'Save'}
                        click={createNews}
                        loading={createEditProps.createFetching || createEditProps.editFetching}
                        isDisabled={Boolean(oneNewsError)}
                    />
                </div>
                {createEditProps.formCreateError && <ErrorMessage errorMsg={createEditProps.formCreateError}/>}
                {createEditProps.formEditError && <ErrorMessage errorMsg={createEditProps.formEditError}/>}
                {oneNewsError && <ErrorMessage errorMsg={oneNewsError + FORM_RETRIEVED_DATA_ERROR.one_news}/>}
                <BasicCreateForm
                    formState={formState}
                    setFormState={setFormState}
                    statusState={statusState}
                    setStatusState={setStatusState}
                    isEditedForm={Boolean(newsId)}
                    hasStatus={false}
                    hasPeriod={false}
                    hasNewsStatus={true}
                    checkRequiredFields={createEditProps.checkRequiredFields}
                    getFormRegexWarning={(hasRegexWarning: boolean) => createEditProps.setFormHasRegexWarning(hasRegexWarning)}
                />
            </div>
        </>
    );
};

export default CreateNews;
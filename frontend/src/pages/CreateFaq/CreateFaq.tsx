import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IBasicCreateEdit, useCreateEdit } from "../../hooks/useCreateEdit";
import { FaqFormState, IStatusFormState } from "../../types/initialFormStates";
import { FAQ_FORM_INITIAL_STATE, INITIAL_STATUS_STATE } from "../../constants/initialState";
import { FORM_ERROR_MESSAGES, FORM_RETRIEVED_DATA_ERROR, FORM_SUCCESS_MESSAGES } from "../../constants/form";
import { getBreadcrumbsItems } from "./constants";
import { createStateObjForEditForm, formHasEmptyValues } from "../../utils/createEditForm";
import { createFaqAction, editFaqAction, fetchOneFaqAction } from "../../store/faq/FaqActions";
import Breadcrumbs from "../../components/ui/Breadcrumbs/Breadcrumbs";
import AccentButton from "../../components/ui/AccentButton/AccentButton";
import ErrorMessage from "../../components/ui/ErrorMessage/ErrorMessage";
import FaqCreateForm from "../../components/Forms/FaqCreateForm/FaqCreateForm";

const CreateFaq: FC = () => {
    const {t} = useTranslation();
    // const history = useHistory();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const {faqId} = useParams<{ faqId: string }>();

    const {oneFaq, oneFaqError} = useAppSelector(state => state.faqReducer);

    const [formState, setFormState] =
        useState<FaqFormState>({...FAQ_FORM_INITIAL_STATE});

    const [statusState, setStatusState] =
        useState<IStatusFormState>({...INITIAL_STATUS_STATE});

    const createEditProps = useCreateEdit(
        false,
        state => state.faqReducer,
    ) as IBasicCreateEdit;

    useEffect(() => {
        const getOneFaqData = async () => {
            faqId && await dispatch(fetchOneFaqAction(parseInt(faqId)));
        };

        if (faqId) {
            void getOneFaqData();
        } else {
            setFormState({...FAQ_FORM_INITIAL_STATE});
            setStatusState({...INITIAL_STATUS_STATE});
        }
    }, [faqId]);

    useEffect(() => {
        if(faqId) {
            if (oneFaq && oneFaq?.id === parseInt(faqId)) {
                const editedFaqDataBasic: FaqFormState = createStateObjForEditForm(FAQ_FORM_INITIAL_STATE, oneFaq);
                const editedFaqDataStatus: IStatusFormState = createStateObjForEditForm(INITIAL_STATUS_STATE, oneFaq);

                setFormState(editedFaqDataBasic);
                setStatusState(editedFaqDataStatus);
            }
        }
    }, [oneFaq]);

    const createFaq = async () => {
        const languageFromUrl = new URLSearchParams(window.location.search).get('lang') || 'en';

        if (formHasEmptyValues(formState, true) && !oneFaqError) {
            createEditProps.setCheckRequiredFields(true);
            message.error(t(FORM_ERROR_MESSAGES.fields_required));
        } else if (createEditProps.formHasRegexWarning) {
            createEditProps.setCheckRequiredFields(true);
            message.error(t(FORM_ERROR_MESSAGES.regex_primary_warning));
        } else {
            if (!faqId) {
                if (statusState) {
                    await dispatch(createFaqAction({
                        ...formState,
                        ...statusState,
                    })).unwrap()
                        .then(() => {
                            createEditProps.setFormCreateError('');
                            navigate(`/administration/faq?lang=${languageFromUrl}`);
                            message.success(t(FORM_SUCCESS_MESSAGES.faq_created));
                        })
                        .catch((rejectedValueOrSerializedError) => {
                            createEditProps.setFormCreateError(rejectedValueOrSerializedError.message);
                        });
                }
            } else {
                if (statusState) {
                    await dispatch(editFaqAction({
                        dataToEdit: {
                            ...formState,
                            ...statusState
                        },
                        faqId,
                    })).unwrap()
                        .then(() => {
                            createEditProps.setFormEditError('');
                            navigate(`/administration/faq?lang=${languageFromUrl}`);
                            message.success(t(FORM_SUCCESS_MESSAGES.faq_edited));
                        })
                        .catch((rejectedValueOrSerializedError) => {
                            createEditProps.setFormEditError(rejectedValueOrSerializedError.message);
                        });
                }
            }

            createEditProps.setCheckRequiredFields(false);
        }
    };


    return (
        <>
            <div className={'basicPage'}>
                <div className={'topBlock'}>
                    <Breadcrumbs items={getBreadcrumbsItems(faqId || '')}/>
                    <AccentButton
                        title={'Save'}
                        click={createFaq}
                        loading={createEditProps.createFetching || createEditProps.editFetching}
                        isDisabled={Boolean(oneFaqError)}
                    />
                </div>
                {createEditProps.formCreateError && <ErrorMessage errorMsg={createEditProps.formCreateError}/>}
                {createEditProps.formEditError && <ErrorMessage errorMsg={createEditProps.formEditError}/>}
                {oneFaqError && <ErrorMessage errorMsg={oneFaqError + +FORM_RETRIEVED_DATA_ERROR.one_faq}/>}
                <FaqCreateForm
                    formState={formState}
                    setFormState={setFormState}
                    statusState={statusState}
                    setStatusState={setStatusState}
                    checkRequiredFields={createEditProps.checkRequiredFields}
                    isEditedForm={Boolean(faqId)}
                    getFormRegexWarning={(hasRegexWarning: boolean) => createEditProps.setFormHasRegexWarning(hasRegexWarning)}
                />
            </div>
        </>
    );
};

export default CreateFaq;
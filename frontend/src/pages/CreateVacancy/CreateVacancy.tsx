import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { message } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IBasicCreateEdit, useCreateEdit } from "../../hooks/useCreateEdit";
import { getBreadcrumbsItems } from "./constants";
import { INITIAL_BASIC_CREATE_EDIT_STATE, INITIAL_STATUS_STATE } from "../../constants/initialState";
import { FORM_ERROR_MESSAGES, FORM_RETRIEVED_DATA_ERROR, FORM_SUCCESS_MESSAGES } from "../../constants/form";
import { createVacancyAction, editVacancyAction, fetchOneVacancyAction } from "../../store/vacancies/VacanciesActions";
import { createStateObjForEditForm, formHasEmptyValues } from "../../utils/createEditForm";
import { IVacancyCreationFormState } from "../../types/vacancies";
import { BasicFormState, IStatusFormState } from "../../types/initialFormStates";
import Breadcrumbs from "../../components/ui/Breadcrumbs/Breadcrumbs";
import AccentButton from "../../components/ui/AccentButton/AccentButton";
import BasicCreateForm from "../../components/Forms/ContentManagement/BasicCreateForm/BasicCreateForm";
import ErrorMessage from "../../components/ui/ErrorMessage/ErrorMessage";

const CreateVacancy: FC = () => {
    const {t} = useTranslation();
    // const history = useHistory();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const {vacancyId} = useParams<{ vacancyId: string }>();

    const {oneVacancy, oneVacancyError} = useAppSelector(state => state.vacanciesReducer);

    const [formState, setFormState] =
        useState<BasicFormState>({...INITIAL_BASIC_CREATE_EDIT_STATE});

    const [statusState, setStatusState] =
        useState<IStatusFormState>({...INITIAL_STATUS_STATE});

    const createEditProps = useCreateEdit(
        false,
        state => state.vacanciesReducer,
    ) as IBasicCreateEdit;

    useEffect(() => {
        const getOneVacancyData = async () => {
            vacancyId && await dispatch(fetchOneVacancyAction(vacancyId));
        };

        if (vacancyId) {
            void getOneVacancyData();
        } else {
            setFormState({...INITIAL_BASIC_CREATE_EDIT_STATE});
            setStatusState({...INITIAL_STATUS_STATE});
        }
    }, [vacancyId]);

    useEffect(() => {
        if(vacancyId) {
            if (oneVacancy && oneVacancy?._id === vacancyId) {
                const editedVacancyDataBasic: BasicFormState = createStateObjForEditForm(INITIAL_BASIC_CREATE_EDIT_STATE, {
                    ...oneVacancy,
                    detail_image: '',
                    preview: '',
                });

                const editedVacancyDataStatus: IStatusFormState = createStateObjForEditForm(INITIAL_STATUS_STATE, oneVacancy);

                setFormState(editedVacancyDataBasic);
                setStatusState(editedVacancyDataStatus);
            }
        }
    }, [oneVacancy]);

    const createVacancy = async () => {
        const languageFromUrl = new URLSearchParams(window.location.search).get('lang') || 'en';

        if (formHasEmptyValues(formState, true) && !oneVacancyError) {
            createEditProps.setCheckRequiredFields(true);
            message.error(t(FORM_ERROR_MESSAGES.fields_required));
        } else if (createEditProps.formHasRegexWarning) {
            createEditProps.setCheckRequiredFields(true);
            message.error(t(FORM_ERROR_MESSAGES.regex_primary_warning));
        } else {
            if (!vacancyId) {
                if (statusState) {
                    const formStateWithoutImg: IVacancyCreationFormState = {...formState};
                    delete formStateWithoutImg.detail_image;
                    delete formStateWithoutImg.preview;

                    await dispatch(createVacancyAction({
                        ...formStateWithoutImg,
                        ...statusState,
                    })).unwrap()
                        .then(() => {
                            createEditProps.setFormCreateError('');
                            navigate(`/content_management/vacancies?lang=${languageFromUrl}`);
                            message.success(t(FORM_SUCCESS_MESSAGES.vacancy_created));
                        })
                        .catch((rejectedValueOrSerializedError) => {
                            createEditProps.setFormCreateError(rejectedValueOrSerializedError.message);
                        });
                }
            } else {
                if (statusState) {
                    const formStateWithoutImg: IVacancyCreationFormState = {...formState};
                    delete formStateWithoutImg.detail_image;
                    delete formStateWithoutImg.preview;

                    await dispatch(editVacancyAction({
                        dataToEdit: {
                            ...formStateWithoutImg,
                            ...statusState
                        },
                        vacancyId,
                    })).unwrap()
                        .then(() => {
                            createEditProps.setFormEditError('');
                            navigate(`/content_management/vacancies?lang=${languageFromUrl}`);
                            message.success(t(FORM_SUCCESS_MESSAGES.vacancy_edited));
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
                    <Breadcrumbs items={getBreadcrumbsItems(vacancyId || '')}/>
                    <AccentButton
                        title={'Save'}
                        click={createVacancy}
                        loading={createEditProps.createFetching || createEditProps.editFetching}
                        isDisabled={Boolean(oneVacancyError)}
                    />
                </div>
                {createEditProps.formCreateError && <ErrorMessage errorMsg={createEditProps.formCreateError}/>}
                {createEditProps.formEditError && <ErrorMessage errorMsg={createEditProps.formEditError}/>}
                {oneVacancyError && <ErrorMessage errorMsg={oneVacancyError + + FORM_RETRIEVED_DATA_ERROR.one_vacancy}/>}
                <BasicCreateForm
                    formState={formState}
                    setFormState={setFormState}
                    isEditedForm={Boolean(vacancyId)}
                    hasStatus={true}
                    hasPeriod={false}
                    statusState={statusState}
                    setStatusState={setStatusState}
                    checkRequiredFields={createEditProps.checkRequiredFields}
                    getFormRegexWarning={(hasRegexWarning: boolean) => createEditProps.setFormHasRegexWarning(hasRegexWarning)}
                />
            </div>
        </>
    );
};

export default CreateVacancy;
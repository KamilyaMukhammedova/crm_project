import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { message } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IBasicCreateEdit, useCreateEdit } from "../../hooks/useCreateEdit";
import { getBreadcrumbsItems } from "./constants";
import {
    INITIAL_BASIC_CREATE_EDIT_STATE,
    INITIAL_PERIOD_STATE,
    INITIAL_STATUS_STATE
} from "../../constants/initialState";
import { FORM_ERROR_MESSAGES, FORM_RETRIEVED_DATA_ERROR, FORM_SUCCESS_MESSAGES } from "../../constants/form";
import { BasicFormState, IPeriodFormState, IStatusFormState } from "../../types/initialFormStates";
import { createStateObjForEditForm, formHasEmptyValues } from "../../utils/createEditForm";
import {
    createPromotionAction,
    editPromotionAction,
    fetchOnePromotionAction
} from "../../store/promotions/PromotionsActions";
import Breadcrumbs from "../../components/ui/Breadcrumbs/Breadcrumbs";
import AccentButton from "../../components/ui/AccentButton/AccentButton";
import BasicCreateForm from "../../components/Forms/ContentManagement/BasicCreateForm/BasicCreateForm";
import ErrorMessage from "../../components/ui/ErrorMessage/ErrorMessage";


const CreatePromotion: FC = () => {
    const {t} = useTranslation();
    // const history = useHistory();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const {promId} = useParams<{ promId: string }>();

    const {onePromotion, onePromError} = useAppSelector(state => state.promotionsReducer);

    const [formState, setFormState] =
        useState<BasicFormState>({...INITIAL_BASIC_CREATE_EDIT_STATE});

    const [periodState, setPeriodState] =
        useState<IPeriodFormState>({...INITIAL_PERIOD_STATE});

    const [statusState, setStatusState] =
        useState<IStatusFormState>({...INITIAL_STATUS_STATE});

    const createEditProps = useCreateEdit(
        false,
        state => state.promotionsReducer,
    ) as IBasicCreateEdit;

    const [periodError, setPeriodError] = useState<string | null>(null);

    useEffect(() => {
        const getOnePromData = async () => {
            promId && await dispatch(fetchOnePromotionAction(promId));
        };

        if (promId) {
            void getOnePromData();
        } else {
            setFormState({...INITIAL_BASIC_CREATE_EDIT_STATE});
            setPeriodState({...INITIAL_PERIOD_STATE});
            setStatusState({...INITIAL_STATUS_STATE});
        }
    }, [promId]);

    useEffect(() => {
        if(promId) {
            if (onePromotion && onePromotion?._id === promId) {
                const editedPromDataBasic: BasicFormState = createStateObjForEditForm(INITIAL_BASIC_CREATE_EDIT_STATE, onePromotion);
                const editedPromDataPeriod: IPeriodFormState = createStateObjForEditForm(INITIAL_PERIOD_STATE, onePromotion);
                const editedPromDataStatus: IStatusFormState = createStateObjForEditForm(INITIAL_STATUS_STATE, onePromotion);

                setFormState(editedPromDataBasic);
                setPeriodState(editedPromDataPeriod);
                setStatusState(editedPromDataStatus);
            }
        }
    }, [onePromotion]);

    const createProm = async () => {
        const languageFromUrl = new URLSearchParams(window.location.search).get('lang') || 'en';

        if ((formHasEmptyValues(formState) || formHasEmptyValues(periodState))) {
            createEditProps.setCheckRequiredFields(true);
            message.error(t(FORM_ERROR_MESSAGES.fields_required));
        } else if (createEditProps.formHasRegexWarning) {
            createEditProps.setCheckRequiredFields(true);
            message.error(t(FORM_ERROR_MESSAGES.regex_primary_warning));
        } else {
            if (!promId) {
                if (periodState && statusState) {
                    await dispatch(createPromotionAction({
                        ...formState,
                        ...periodState,
                        ...statusState
                    })).unwrap()
                        .then(() => {
                            createEditProps.setFormCreateError('');
                            navigate(`/content_management/promotions?lang=${languageFromUrl}`);
                            message.success(t(FORM_SUCCESS_MESSAGES.discount_created));
                        })
                        .catch((rejectedValueOrSerializedError) => {
                            createEditProps.setFormCreateError(rejectedValueOrSerializedError.message);
                        });
                }
            } else {
                if (periodState && statusState) {
                    await dispatch(editPromotionAction({
                        dataToEdit: {
                            ...formState,
                            ...periodState,
                            ...statusState
                        },
                        promId,
                    })).unwrap()
                        .then(() => {
                            createEditProps.setFormEditError('');
                            navigate(`/content_management/promotions?lang=${languageFromUrl}`);
                            message.success(t(FORM_SUCCESS_MESSAGES.discount_edited));
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
                    <Breadcrumbs items={getBreadcrumbsItems(promId || '')}/>
                    <AccentButton
                        title={'Save'}
                        click={createProm}
                        loading={createEditProps.createFetching}
                        isDisabled={Boolean(onePromError) || Boolean(periodError)}
                    />
                </div>
                {createEditProps.formCreateError && <ErrorMessage errorMsg={createEditProps.formCreateError}/>}
                {createEditProps.formEditError && <ErrorMessage errorMsg={createEditProps.formEditError}/>}
                {onePromError && <ErrorMessage errorMsg={onePromError + FORM_RETRIEVED_DATA_ERROR.one_promotion}/>}
                <BasicCreateForm
                    formState={formState}
                    setFormState={setFormState}
                    isEditedForm={Boolean(promId)}
                    hasPeriod={true}
                    hasStatus={true}
                    periodState={periodState}
                    setPeriodState={setPeriodState}
                    statusState={statusState}
                    setStatusState={setStatusState}
                    periodError={periodError}
                    setPeriodError={setPeriodError}
                    checkRequiredFields={createEditProps.checkRequiredFields}
                    getFormRegexWarning={(hasRegexWarning: boolean) => createEditProps.setFormHasRegexWarning(hasRegexWarning)}
                />
            </div>
        </>
    );
};

export default CreatePromotion;
import { EditedSetting } from "../types/settings";
import { ICreatedAccount } from "../types/accounts";
import {
    BasicFormState, FaqFormState, IBannerFormState, IBasicRegexFormState,
    ICollectionFormState,
    IPasswordFormState,
    IPeriodFormState,
    IStatusFormState, RegexCollectionFormState
} from "../types/initialFormStates";

export const INITIAL_BASIC_CREATE_EDIT_STATE: BasicFormState = {
    preview: '',
    detail_image: '',
    title_ru: '',
    title_en: '',
    title_uz: '',
    small_description_ru: '',
    small_description_en: '',
    small_description_uz: '',
    description_ru: '',
    description_en: '',
    description_uz: '',
};

export const INITIAL_PERIOD_STATE: IPeriodFormState = {
    start_date: '',
    end_date: '',
};

export const INITIAL_STATUS_STATE: IStatusFormState = {
    is_active: false,
};

export const INITIAL_STATE_COLLECTION: ICollectionFormState = {
    preview: '',
    title_ru: '',
    title_en: '',
    title_uz: '',
    is_active: false,
    position: 1,
};

export const INITIAL_STATE_SETTING: EditedSetting = {
    bonus_activation_date: 0,
    default_percent: 0,
    promocode_percent: 0,
    bonus_remove_month: 0,
    classic: 0,
    smart: 0,
};
export const INITIAL_STATE_ACCOUNT: ICreatedAccount = {
    username: '',
    full_name: '',
    password: '',
    type: null,
    is_active: false,
};

export const INITIAL_STATE_PASSWORD: IPasswordFormState = {
    password: '',
    passwordRepeat: '',
};

export const INITIAL_STATE_BANNER: IBannerFormState = {
    image: '',
    position: 1,
};

export const REGEX_COLLECTION_INITIAL_STATE: RegexCollectionFormState = {
    title_en: false,
    title_ru: false,
    title_uz: false,
};

export const REGEX_BASIC_FORM_INITIAL_STATE: IBasicRegexFormState = {
    title_en: false,
    title_ru: false,
    title_uz: false,
    small_description_en: false,
    small_description_ru: false,
    small_description_uz: false,
    description_en: false,
    description_ru: false,
    description_uz: false,
};

export const FAQ_FORM_INITIAL_STATE: FaqFormState = {
    title_en: '',
    title_ru: '',
    title_uz: '',
    description_en: '',
    description_ru: '',
    description_uz: '',
};
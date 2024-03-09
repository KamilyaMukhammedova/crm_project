export const FORM_ITEMS_TITLES_BY_LANGUAGES: { [key: string]: {[key: string]: string} } = {
    en: {
        inputTitle: 'Title',
        inputPlaceholder: 'Write title here',
        inputName: 'title_en',
        shortTextTitle: 'Short Text',
        shortTextPlaceholder: 'Write short text here',
        shortTextName: 'small_description_en',
        descriptionName: 'description_en',
        descriptionPlaceholder: 'Write description here',
    },
    ru: {
        inputTitle: 'Название',
        inputPlaceholder: 'Введите название',
        inputName: 'title_ru',
        shortTextTitle: 'Короткий текст',
        shortTextPlaceholder: 'Введите короткий текст',
        shortTextName: 'small_description_ru',
        descriptionName: 'description_ru',
        descriptionPlaceholder: 'Введите описание',
    },
    uz: {
        inputTitle: 'Nom',
        inputPlaceholder: 'Yangilik nimini yozing',
        inputName: 'title_uz',
        shortTextTitle: 'Qisqa matn',
        shortTextPlaceholder: 'Qisqa matnni yozing',
        shortTextName: 'small_description_uz',
        descriptionName: 'description_uz',
        descriptionPlaceholder: 'Tavsif yozing',
    },
};

export const USER_ROLES = [
    {
        value: 1,
        label: 'Administrator',
    },
];

const requiredMessage = 'Field is required.';

export const FORM_REQUIRED_MESSAGES: {[key: string]: string} = {
    title_en: `${requiredMessage} Please input title in English!`,
    title_ru: `${requiredMessage} Please input title in Russian!`,
    title_uz: `${requiredMessage} Please input title in Uzbek!`,
    image: `${requiredMessage} Please upload image!`,
    period: `${requiredMessage} Please choose period!`,
    username: `${requiredMessage} Please input username!`,
    full_name: `${requiredMessage} Please input full name!`,
    password: `${requiredMessage} Please input password!`,
    passwordRepeat: `${requiredMessage} Please input password repeat!`,
    role: `${requiredMessage} Please choose role!`,
    product: `${requiredMessage} Please choose product!`,
    small_description_en: `${requiredMessage} Please input short text in English!`,
    small_description_ru: `${requiredMessage} Please input short text in Russian!`,
    small_description_uz: `${requiredMessage} Please input short text in Uzbek!`,
    description_en: `${requiredMessage} Please input description in English!`,
    description_ru: `${requiredMessage} Please input description in Russian!`,
    description_uz: `${requiredMessage} Please input description in Uzbek!`,
};

export const FORM_ERROR_MESSAGES: {[key: string]: string} = {
    passwords_match: 'Passwords must match!',
    color_duplicate: 'Product with this color was already added in Unique list! Choose another one!',
    position: 'Position can be only an integer and should not be zero!',
    fields_required: 'All fields are required!',
    regex_primary_warning: 'Fill all fields in the appropriate language!',
};

const getFormRetrievedItemErrorMsg = (itemName: string) => {
    return `. Something is wrong with ${itemName} data. You can't edit it! Try to reload page.`;
};

export const FORM_RETRIEVED_DATA_ERROR: {[key: string]: string} = {
    one_news: getFormRetrievedItemErrorMsg('news'),
    one_collection: getFormRetrievedItemErrorMsg('collection'),
    one_banner: getFormRetrievedItemErrorMsg('banner'),
    one_promotion: getFormRetrievedItemErrorMsg('promotion'),
    one_vacancy: getFormRetrievedItemErrorMsg('vacancy'),
    one_faq: getFormRetrievedItemErrorMsg('FAQ'),
};

export const DELETE_FORM_TITLES: {[key: string]: string} = {
    message: 'Are you sure to delete?',
    btn: 'Delete',
};

const getFormSuccessMessage = (itemName: string, isCreateForm: boolean) => {
    return `${itemName} was successfully ${isCreateForm ? 'created' : 'edited'}!`;
};

export const FORM_SUCCESS_MESSAGES: {[key: string]: string} = {
    collection_created: getFormSuccessMessage('Collection', true),
    collection_edited: getFormSuccessMessage('Collection', false),
    banner_created: getFormSuccessMessage('Banner', true),
    banner_edited: getFormSuccessMessage('Banner', false),
    account_created: getFormSuccessMessage('Account', true),
    account_edited: getFormSuccessMessage('Account', false),
    news_created: getFormSuccessMessage('News', true),
    news_edited: getFormSuccessMessage('News', false),
    discount_created: getFormSuccessMessage('Discount', true),
    discount_edited: getFormSuccessMessage('Discount', false),
    vacancy_created: getFormSuccessMessage('Vacancy', true),
    vacancy_edited: getFormSuccessMessage('Vacancy', false),
    faq_created: getFormSuccessMessage('Question', true),
    faq_edited: getFormSuccessMessage('Question', false),

    unique_list: 'Product was successfully added to the unique list!',
    black_list: 'Product was successfully added to the black list!',
    password: 'Password was successfully changed!',
};

export const TITLE_MAX_LENGTH = 128;
export const SMALL_DESCRIPTION_MAX_LENGTH = 500;

export const MAX_LENGTH_MESSAGES: {[key: string]: string} = {
    title : `Title should be ${TITLE_MAX_LENGTH} characters or less!`,
    small_description: `Short text should be ${SMALL_DESCRIPTION_MAX_LENGTH} characters or less!`,
};




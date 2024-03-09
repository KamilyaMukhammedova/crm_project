const cyrillicReg = /^[а-яА-Я0-9a-zA-Z0-9\s!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]+$/;
const latinReg = /^[a-zA-Z0-9ĞğİiŞşÜüÑñÇçÖö\s!@#$%^&*()_+\-=[\]{};'‘“”:"ʻ«»/ʼ’\\|,.<>?~`]+$/;

export const regForCollectionFormItems = {
    title_en: latinReg,
    title_ru: cyrillicReg,
    title_uz: latinReg,
};

export const regForBasicCreateFormItems = {
    ...regForCollectionFormItems,
    small_description_en: latinReg,
    small_description_ru: cyrillicReg,
    small_description_uz: latinReg,
    description_en: latinReg,
    description_ru: cyrillicReg,
    description_uz: latinReg,
};

export const WRONG_REGEX_TITLE_MESSAGE = 'Please write title in appropriate language!';
export const WRONG_REGEX_SMALL_DESCRIPTION_MESSAGE = 'Please write short text in appropriate language!';
export const WRONG_REGEX_DESCRIPTION_MESSAGE = 'Please write description in appropriate language!';
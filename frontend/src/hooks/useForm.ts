import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { message } from "antd";
import { IBasicRegexFormState } from "../types/initialFormStates";
import { MAX_LENGTH_MESSAGES, SMALL_DESCRIPTION_MAX_LENGTH, TITLE_MAX_LENGTH } from "../constants/form";
import { REGEX_BASIC_FORM_INITIAL_STATE } from "../constants/initialState";
import { regForBasicCreateFormItems } from "../constants/regexp";
import { extractPlainTextFromHTML } from "../utils/createEditForm";
import { checkRegexp } from "../utils/checkRegexp";

export interface IUseForm<T> {
    currentLanguage: string,
    regexWarning: IBasicRegexFormState,
    handleSetState: (value: string, name: string) => void,
    onBlur: (value: string, name: string) => void,
    onLanguage: (language: string) => void,
}

export const useForm = <T>(
    setFormState: React.Dispatch<React.SetStateAction<T>>,
): IUseForm<T> => {
    const {t} = useTranslation();

    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [regexWarning, setRegexWarning] = useState<IBasicRegexFormState>(
        {...REGEX_BASIC_FORM_INITIAL_STATE}
    );

    const onLanguage = (language: string) => {
        setCurrentLanguage(language);
    };

    const handleSetState = (value: string, name: string) => {
        const regex = regForBasicCreateFormItems[name as keyof typeof regForBasicCreateFormItems];
        let regexIsValid = false;

        if (!name.startsWith('description')) {
            regexIsValid = checkRegexp(regex, value);
        } else {
            const plainText = extractPlainTextFromHTML(value);
            regexIsValid = checkRegexp(regex, plainText);
        }

        if (name.includes('title') && value.length >= TITLE_MAX_LENGTH) {
            void message.warning(t(MAX_LENGTH_MESSAGES.title), 5);
            return;
        }

        if (name.includes('small_description') && value.length >= SMALL_DESCRIPTION_MAX_LENGTH) {
            void message.warning(t(MAX_LENGTH_MESSAGES.small_description), 5);
            return;
        }

        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));

        setRegexWarning(prevState => ({
            ...prevState,
            [name]: !regexIsValid,
        }));
    };

    const onBlur = (value: string, name: string) => {
        const regex = regForBasicCreateFormItems[name as keyof typeof regForBasicCreateFormItems];
        const regexIsValid = checkRegexp(regex, value);
        setRegexWarning(prevState => ({
            ...prevState,
            [name]: !regexIsValid,
        }));
    };

    return {
        currentLanguage,
        regexWarning,
        handleSetState,
        onBlur,
        onLanguage,
    };
};
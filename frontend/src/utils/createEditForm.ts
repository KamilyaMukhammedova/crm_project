import {
    BasicFormState,
    FaqFormState,
    IBannerFormState,
    IPeriodFormState,
    IStatusFormState
} from "../types/initialFormStates";
import { EditedSetting } from "../types/settings";
import { ICreatedAccount } from "../types/accounts";

export const getFormItemsWidth = (hasPeriod: boolean, hasStatus: boolean) => {
    const data = {
        widthInputsWrapper: '',
        widthChildrenWrapper: ''
    };

    if (!hasPeriod && !hasStatus) {
        data.widthInputsWrapper = '40';
        data.widthChildrenWrapper = '57';
    } else if (hasPeriod && hasStatus) {
        data.widthInputsWrapper = '40';
        data.widthChildrenWrapper = '57';
    } else if (!hasPeriod && hasStatus) {
        data.widthInputsWrapper = '85';
        data.widthChildrenWrapper = '12';
    }

    return data;
};

export const createStateObjForEditForm = <
    T extends BasicFormState | IPeriodFormState | IStatusFormState | IBannerFormState | EditedSetting | ICreatedAccount | FaqFormState,
    U extends T
>(
    initialStateObj: T,
    data: U
): T => {
    const newsStateObj: T = {} as T;

    // Object.keys(initialStateObj).forEach(keyName => {
    //     const key = keyName as keyof T;
    //     if (key === 'preview' || key === 'detail_image') {
    //         newsStateObj[key] = getImagePathFromUrl(data[key] as string) as T[keyof T];
    //     } else {
    //         newsStateObj[key] = data[key] as T[keyof T];
    //     }
    // });

    Object.keys(initialStateObj).forEach(keyName => {
        const key = keyName as keyof T;
        newsStateObj[key] = data[key] as T[keyof T];
    });

    return newsStateObj;
};


export const formHasEmptyValues = (state: { [key: string]: any }, vacancyForm = false) => {
    let previewAndDetailImageEmpty = true;

    for (const key in state) {
        if (state.hasOwnProperty(key)) {
            const value = state[key];
            if ((key === 'preview' || key === 'detail_image') && vacancyForm) {
                if (value !== '') {
                    previewAndDetailImageEmpty = false;
                }
            } else if (!vacancyForm) {
                if (value === null || value === undefined || value === '') {
                    return true;
                }
            } else {
                if ((value === null || value === undefined || value === '') && key !== 'preview' && key !== 'detail_image') {
                    return true;
                }
            }

            if (key.startsWith('description')) {
                const plainText = extractPlainTextFromHTML(value);
                if (plainText.trim() === '') {
                    return true;
                }
            }
        }
    }

    if (vacancyForm && previewAndDetailImageEmpty) {
        return false;
    }

    return false;
};

export const extractPlainTextFromHTML = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || '';
};

















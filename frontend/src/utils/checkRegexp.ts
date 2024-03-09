import { IBasicRegexFormState, RegexCollectionFormState } from "../types/initialFormStates";

type T = IBasicRegexFormState | RegexCollectionFormState;

export const checkRegexp = (reg: RegExp, value: string) => {
    return reg.test(value) || value === '' || value === '-';
};

export const checkRegexState = (state: T) => {
    for (const key in state) {
        if (state[key as keyof T]) {
            return true;
        }
    }
    return false;
};
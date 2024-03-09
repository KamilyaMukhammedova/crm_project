import React, { FC } from 'react';
import { useTranslation } from "react-i18next";
import { Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { FORM_REQUIRED_MESSAGES } from "../../../constants/form";
import FormItemError from "../FormItemError/FormItemError";

type FormItemStatus = "" | "warning" | "error";
type FormItemElement = HTMLInputElement | HTMLTextAreaElement;

interface IProps {
    title: string,
    name: string,
    value: string | number,
    placeholder: string,
    onChange: (value: string, name: string) => void,
    requiredErrorProps: boolean[],
    onBlur?: (value: string, name: string) => void,
    regexErrorMsg?: string,
    regexErrorProps?: boolean[],
    restErrorMsg?: string,
    restErrorProps?: boolean[],
    translationRequired?: boolean,
    formItemType?: 'input' | 'textarea',
    inputType?: 'text' | 'number',
    minValue?: number,
}

const FormItem: FC<IProps> = ({
                                  title,
                                  name,
                                  value,
                                  placeholder,
                                  onChange,
                                  requiredErrorProps,
                                  onBlur,
                                  regexErrorMsg,
                                  regexErrorProps,
                                  restErrorMsg,
                                  restErrorProps,
                                  translationRequired = true,
                                  formItemType = 'input',
                                  inputType = 'text',
                                  minValue,
                              }) => {
    const {t} = useTranslation();

    const FormItemComponent = formItemType === 'input' ? Input : TextArea;
    const checkFormItemStatus = (): FormItemStatus => {
        if (regexErrorProps && regexErrorProps.every(prop => prop)) {
            return 'error';
        }

        if (restErrorProps && restErrorProps.every(prop => prop)) {
            return 'error';
        }

        if (requiredErrorProps.length && requiredErrorProps.every(prop => prop)) {
            return 'error';
        }

        return '';
    };

    return (
        <>
            <p>{translationRequired ? t(title) : title}</p>
            <FormItemComponent
                type={inputType}
                placeholder={translationRequired ? t(placeholder) : placeholder}
                className={'input'}
                value={value}
                name={name}
                min={minValue && minValue}
                onChange={(event: React.ChangeEvent<FormItemElement>) => onChange(event.target.value, event.target.name)}
                onBlur={(event: React.ChangeEvent<FormItemElement>) => onBlur && onBlur(event.target.value, event.target.name)}
                status={checkFormItemStatus()}
                allowClear={inputType === 'text'}
            />
            {
                (regexErrorProps && regexErrorMsg) &&
                <FormItemError
                    errorType={'error'}
                    errorTitle={regexErrorMsg}
                    restProps={regexErrorProps}
                />
            }
            {
                (restErrorProps && restErrorMsg) &&
                <FormItemError
                    errorType={'error'}
                    errorTitle={restErrorMsg}
                    restProps={restErrorProps}
                />
            }
            <FormItemError
                errorType={'error'}
                errorTitle={FORM_REQUIRED_MESSAGES[name]}
                restProps={requiredErrorProps}
            />
        </>
    );
};

export default FormItem;
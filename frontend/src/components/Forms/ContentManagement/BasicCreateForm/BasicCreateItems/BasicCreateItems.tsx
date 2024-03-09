import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import Draft, { ContentState, convertToRaw, EditorState } from "draft-js";
import Modifier = Draft.Modifier;
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { IBasicRegexFormState } from "../../../../../types/initialFormStates";
import { FORM_ITEMS_TITLES_BY_LANGUAGES, FORM_REQUIRED_MESSAGES } from "../../../../../constants/form";
import {
    regForBasicCreateFormItems,
    WRONG_REGEX_DESCRIPTION_MESSAGE,
    WRONG_REGEX_SMALL_DESCRIPTION_MESSAGE,
    WRONG_REGEX_TITLE_MESSAGE
} from "../../../../../constants/regexp";
import { extractPlainTextFromHTML } from "../../../../../utils/createEditForm";
import FormItem from "../../../../ui/FormItem/FormItem";
import FormItemError from "../../../../ui/FormItemError/FormItemError";
import styles from "./BasicCreateItems.module.scss";


interface IProps {
    language: string,
    getState: (value: string, name: string) => void,
    onBlur: (value: string, name: string) => void,
    titleFromParent?: string,
    shortTextFromParent?: string,
    descriptionFromParent?: string,
    widthInputsWrapper: string,
    widthChildrenWrapper: string,
    checkRequiredFields: boolean,
    regexWarning: IBasicRegexFormState,
}

const BasicCreateItems: FC<PropsWithChildren<IProps>> = ({
                                                             children,
                                                             language,
                                                             getState,
                                                             onBlur,
                                                             titleFromParent,
                                                             shortTextFromParent,
                                                             descriptionFromParent,
                                                             widthInputsWrapper,
                                                             widthChildrenWrapper,
                                                             checkRequiredFields,
                                                             regexWarning,
                                                         }) => {
    const formItemsData = {
        inputTitle: FORM_ITEMS_TITLES_BY_LANGUAGES[language].inputTitle,
        inputPlaceholder: FORM_ITEMS_TITLES_BY_LANGUAGES[language].inputPlaceholder,
        inputName: FORM_ITEMS_TITLES_BY_LANGUAGES[language].inputName,
        inputRegex: regexWarning[FORM_ITEMS_TITLES_BY_LANGUAGES[language].inputName as keyof typeof regForBasicCreateFormItems],
        shortTextTitle: FORM_ITEMS_TITLES_BY_LANGUAGES[language].shortTextTitle,
        shortTextPlaceholder: FORM_ITEMS_TITLES_BY_LANGUAGES[language].shortTextPlaceholder,
        shortTextName: FORM_ITEMS_TITLES_BY_LANGUAGES[language].shortTextName,
        shortTextRegex: regexWarning[FORM_ITEMS_TITLES_BY_LANGUAGES[language].shortTextName as keyof typeof regForBasicCreateFormItems],
        descriptionName: FORM_ITEMS_TITLES_BY_LANGUAGES[language].descriptionName,
        descriptionPlaceholder: FORM_ITEMS_TITLES_BY_LANGUAGES[language].descriptionPlaceholder,
        descriptionRegex: regexWarning[FORM_ITEMS_TITLES_BY_LANGUAGES[language].descriptionName as keyof typeof regForBasicCreateFormItems],
    };

    const [description, setDescription] = useState(
        () => EditorState.createEmpty(),
    );
    const [descriptionRequiredError, setDescriptionRequiredError] = useState(false);

    useEffect(() => {
        if (descriptionFromParent) {
            if (descriptionFromParent === draftToHtml(convertToRaw(description.getCurrentContent()))) {
                return;
            }

            const contentBlock = htmlToDraft(descriptionFromParent);

            if (contentBlock && contentBlock.contentBlocks) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                setDescription(EditorState.createWithContent(contentState));
            }
        }
    }, [descriptionFromParent]);

    useEffect(() => {
        const valueHtml = draftToHtml(convertToRaw(description.getCurrentContent()));
        const plainText = extractPlainTextFromHTML(valueHtml);
        setDescriptionRequiredError(plainText.trim() === '');
    }, [description]);

    const onDescriptionChange = (editorState: EditorState) => {
        const valueHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        setDescription(editorState);
        getState(valueHtml, formItemsData.descriptionName);
    };

    const onDescriptionPast = (text: string): boolean => {
        const newContent = Modifier.insertText(
            description.getCurrentContent(),
            description.getSelection(),
            text,
        );

        const newEditorState = EditorState.push(description, newContent, 'insert-characters');
        const valueHtml = draftToHtml(convertToRaw(newEditorState.getCurrentContent()));

        setDescription(newEditorState);
        getState(valueHtml, formItemsData.descriptionName);

        return true;
    };

    return (
        <div className={styles.basicCreateItems}>
            <div className={styles.basicCreateItems__topBlock}>
                <div
                    className={styles.basicCreateItems__inputsWrapper}
                    style={{width: `${widthInputsWrapper}%`}}
                >
                    {
                        titleFromParent !== undefined &&
                        <div>
                            <FormItem
                                title={formItemsData.inputTitle}
                                name={formItemsData.inputName}
                                value={titleFromParent}
                                placeholder={formItemsData.inputPlaceholder}
                                onChange={getState}
                                onBlur={onBlur}
                                requiredErrorProps={[checkRequiredFields, !titleFromParent, !formItemsData.inputRegex]}
                                regexErrorMsg={WRONG_REGEX_TITLE_MESSAGE}
                                regexErrorProps={[formItemsData.inputRegex]}
                                translationRequired={false}
                            />
                        </div>
                    }
                    {
                        shortTextFromParent !== undefined &&
                        <div>
                            <FormItem
                                title={formItemsData.shortTextTitle}
                                name={formItemsData.shortTextName}
                                value={shortTextFromParent}
                                placeholder={formItemsData.shortTextPlaceholder}
                                onChange={getState}
                                onBlur={onBlur}
                                requiredErrorProps={[checkRequiredFields, !shortTextFromParent, !formItemsData.shortTextRegex]}
                                regexErrorMsg={WRONG_REGEX_SMALL_DESCRIPTION_MESSAGE}
                                regexErrorProps={[formItemsData.shortTextRegex]}
                                formItemType={'textarea'}
                                translationRequired={false}
                            />
                        </div>
                    }
                </div>
                <div className={styles.basicCreateItems__childrenWrapper} style={{width: `${widthChildrenWrapper}%`}}>
                    {children}
                </div>
            </div>
            {
                descriptionFromParent !== undefined &&
                <>
                    <Editor
                        editorState={description}
                        placeholder={formItemsData.descriptionPlaceholder}
                        toolbarClassName={styles.basicCreateItems__editorToolbar}
                        wrapperClassName={[
                            styles.basicCreateItems__editorWrapper,
                            ((checkRequiredFields && descriptionRequiredError) || formItemsData.descriptionRegex) ?
                                styles.basicCreateItems_editorErrorBorder : ''
                        ].join(' ')}
                        editorClassName={styles.basicCreateItems__editor}
                        onEditorStateChange={onDescriptionChange}
                        handlePastedText={onDescriptionPast}
                        toolbar={{
                            options: ['blockType', 'inline', 'textAlign', 'list', 'link', 'colorPicker', 'history'],
                            inline: {
                                options: ['bold', 'italic', 'underline'],
                            },
                            blockType: {
                                inDropdown: true,
                                options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote'],
                            },
                            link: {
                                inDropdown: false,
                                showOpenOptionOnHover: true,
                                defaultTargetOption: '_blank',
                                options: ['link'],
                            },
                        }}
                    />
                    <FormItemError
                        errorType={'error'}
                        errorTitle={WRONG_REGEX_DESCRIPTION_MESSAGE}
                        restProps={[formItemsData.descriptionRegex]}
                    />
                    <FormItemError
                        errorType={'error'}
                        errorTitle={FORM_REQUIRED_MESSAGES[formItemsData.descriptionName]}
                        restProps={[checkRequiredFields, descriptionRequiredError, !formItemsData.descriptionRegex]}
                    />
                </>
            }
        </div>
    );
};

export default BasicCreateItems;



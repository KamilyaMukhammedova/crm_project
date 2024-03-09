import React, { FC } from 'react';
import { Space } from "antd";
import { Collapse } from "antd";
import { Faq } from "../../types/faq";
import { extractPlainTextFromHTML } from "../../utils/createEditForm";
import { generateDataIndexWithCurrentLanguage } from "../../utils/translation";
import CustomButton from "../ui/CustomButton/CustomButton";
import DeleteButton from "../ui/DeleteButton/DeleteButton";
import StatusColumn from "../ui/StatusColumn/StatusColumn";
import styles from "./FaqCollapseList.module.scss";

interface IProps {
    questions: Faq[],
    onEdit: (id: number) => void,
    onDelete: (id: number) => void,
}

const FaqCollapseList: FC<IProps> = ({questions, onEdit, onDelete}) => {
    const titleDataIndex = generateDataIndexWithCurrentLanguage('title') as keyof Faq;
    const descriptionDataIndex = generateDataIndexWithCurrentLanguage('description') as keyof Faq;

    const openDeleteModal = (event: React.MouseEvent<HTMLButtonElement>, questionId: number) => {
        event.stopPropagation();
        onDelete(questionId);
    };

    return (
        <Space direction="vertical" size="middle" className={styles.spaceWrapper}>
            {
                questions.map(question => (
                    <Collapse
                        key={question.id}
                        collapsible="header"
                        className={styles.collapse}
                        items={[
                            {
                                key: question.id,
                                label: (
                                    <div className={styles.collapse__header}>
                                        <p>{question[titleDataIndex]}</p>
                                        <div className={'flexEnd'}>
                                            <StatusColumn status={question.is_active}/>
                                            <CustomButton click={() => onEdit(question.id)}/>
                                            <DeleteButton click={(event) => openDeleteModal(event, question.id)}/>
                                        </div>
                                    </div>
                                ),
                                children: (<p>{extractPlainTextFromHTML(String(question[descriptionDataIndex]))}</p>),
                            },
                        ]}
                    />
                ))
            }
        </Space>
    );
};

export default FaqCollapseList;
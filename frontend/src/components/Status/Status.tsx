import React, { FC } from 'react';
import { useTranslation } from "react-i18next";
import { Checkbox } from "antd";
import styles from "./Status.module.scss";

interface IProps {
    getStatusState: (value: boolean, name: string) => void,
    statusFromParent: boolean,
    name: string,
    isAlignedStart?: boolean,
}

const Status: FC<IProps> = ({getStatusState, statusFromParent, name, isAlignedStart}) => {
    const {t} = useTranslation();

    return (
        <div
            className={styles.status}
            style={isAlignedStart ? {alignItems: 'start', boxShadow: 'none'} : {boxShadow: '2px 4px 10px 0px rgba(55, 55, 55, 0.20)'}}>
            <Checkbox
                style={{ marginInlineStart: '0'}}
                value={statusFromParent}
                checked={statusFromParent}
                onChange={(event) => getStatusState(event.target.checked, name)}
                className={'checkbox'}
            >
                {t("Active")}
            </Checkbox>
        </div>
    );
};

export default Status;
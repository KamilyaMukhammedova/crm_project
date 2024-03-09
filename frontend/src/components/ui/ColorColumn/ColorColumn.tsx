import React, { FC } from 'react';
import { Tooltip } from "antd";
import styles from "./ColorColumn.module.scss";

interface IProps {
    colorRgb?: string,
    title?: string,
}

const ColorColumn: FC<IProps> = ({colorRgb, title}) => {
    return (
        <Tooltip
            title={(
                <div className={styles.colorTitle}>
                    <p>{title || ''}</p>
                    <p>{colorRgb || ''}</p>
                </div>
            )}
            color={'var(--disabled-grey-color)'}
        >
            <div
                className={styles.colorCircle}
                style={{backgroundColor: colorRgb || ''}}
            />
        </Tooltip>
    );
};

export default ColorColumn;
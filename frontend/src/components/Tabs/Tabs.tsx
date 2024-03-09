import React, { FC, useState } from 'react';
import { Button } from "antd";
import { ITab } from "../../types/basic";
import styles from "./Tabs.module.scss";

interface IProps {
    tabs: ITab[],
    onClick: (tabKey: string) => void,
}

const Tabs: FC<IProps> = ({tabs, onClick}) => {
    const [activeTab, setActiveTab] = useState('en');

    const onTab = (tabKey: string) => {
        setActiveTab(tabKey);
        onClick(tabKey);
    };

    return (
        <div className={styles.tabs}>
            <div className={styles.tabs__wrapper}>
                {
                    tabs.map(tab => (
                        <Button
                            key={tab.key}
                            className={[styles.tabs__tab, `${activeTab === tab.key && styles.tabs__activeTab}`].join(' ')}
                            onClick={() => onTab(tab.key)}
                        >
                            {tab.title}
                        </Button>
                    ))
                }
            </div>
        </div>
    );
};

export default Tabs;
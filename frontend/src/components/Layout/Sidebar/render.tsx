import React from "react";
import { Tooltip } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { ISidebarBoard, ISidebarDropDown } from "../../../types/basic";
import styles from "./Sidebar.module.scss";

export const renderBoardSection = (
    item: ISidebarBoard,
    sidebarCollapsed: string,
    classificatorsNoCollapsed: string,
    isSelected: (path: string) => boolean,
    onClick: (path: string, title: string) => void,
    handleMouseEnter: (sectionTitle: string) => void,
    handleMouseMove: (event: React.MouseEvent<HTMLDivElement>) => void,
    t: (key: string) => string,
) => {
    const icon = <img src={item.icon} alt={item.title} onMouseEnter={() => handleMouseEnter(item.title)}
                      onMouseOut={handleMouseMove}/>;
    const isSidebarCollapsed = sidebarCollapsed === 'collapsed';
    const isSidebarNoCollapsed = sidebarCollapsed === 'noCollapsed';
    const isClassificatorsNoCollapsed = classificatorsNoCollapsed === 'noCollapsed';
    const isMopsSection =
        item.title === 'MOPs & Attributes' &&
        isClassificatorsNoCollapsed &&
        window.location.pathname.includes('/catalog/') &&
        !window.location.pathname.includes('products')
    ;

    return (
        <>
            <div
                className={[styles.sidebar__section,
                    item.path && isSelected(item.path) ? styles.sidebar__active : isMopsSection ? styles.sidebar__active : ''
                ].join(' ')}
                style={isSidebarCollapsed ? {padding: '5px'} : {}}
                onClick={() => onClick(item.path, item.title)}
                key={item.key}
            >
                {
                    isSidebarCollapsed ?
                        <Tooltip placement={'right'} title={t(item.title)} color={'var(--disabled-grey-color)'}>
                            {icon}
                        </Tooltip>
                        :
                        icon
                }
                {isSidebarNoCollapsed && <p>{t(item.title)}</p>}
                {
                    (isSidebarNoCollapsed && item.title === 'MOPs & Attributes') &&
                    <div className={styles.sidebar__downUpIcon}>
                        {isClassificatorsNoCollapsed ? <DownOutlined/> : <UpOutlined/>}
                    </div>
                }
            </div>
        </>
    );
};

export const renderDropDownSection = (
    dropDownData: ISidebarDropDown[],
    title: string,
    dropDownCollapsed: boolean,
    classificatorsHovered: boolean,
    handleMouseLeave: (sectionTitle: string) => void,
    onClick: (path: string, title: string) => void,
    isInnerSelected: (path: string) => boolean,
    t: (key: string) => string,
) => {
    if (dropDownCollapsed) {
        return (
            <div
                onMouseLeave={() => handleMouseLeave(title)}
                className={`${styles.sidebar__list} ${classificatorsHovered ? styles.sidebar__listCollapsed : ''}`}
            >
                {dropDownData.map(item => (
                    <p
                        key={item.key}
                        onClick={() => onClick(item.path, item.title)}
                        className={[styles.sidebar__section, isInnerSelected(item.path) ? styles.sidebar__active : ''].join(' ')}
                    >
                        {t(item.title)}
                    </p>
                ))}
            </div>
        )
    } else {
        return null;
    }
};

export const renderBoardTitle = (
    arr: ISidebarBoard[],
    sidebarCollapsed: string,
    isSelected: (path: string) => boolean,
    onClick: (path: string, title: string) => void,
    t: (key: string) => string,
) => {
    const primaryItem = arr[0];
    const boardHasOnlyOneItem = primaryItem.path && isSelected(primaryItem.path) && arr.length === 1;
    const icon = <img src={primaryItem.icon} alt={primaryItem.title}/>;

    return (
        <div
            className={[styles.sidebar__boardTitle, boardHasOnlyOneItem ? styles.sidebar__active : ''].join(' ')}
            onClick={() => onClick(primaryItem.path, primaryItem.title)}
        >
            {
                sidebarCollapsed === 'collapsed' ?
                    <Tooltip placement={'right'} title={t(primaryItem.title)} color={'var(--primary-accent-color)'}>
                        {icon}
                    </Tooltip>
                    :
                    icon
            }
            {sidebarCollapsed === 'noCollapsed' && <p>{t(primaryItem.title)}</p>}
        </div>
    );
};

export const renderFullBoard = (
    arr: ISidebarBoard[],
    sidebarCollapsed: string,
    classificatorsNoCollapsed: string,
    isSelected: (path: string) => boolean,
    onClick: (path: string, title: string) => void,
    handleMouseEnter: (sectionTitle: string) => void,
    handleMouseMove: (event: React.MouseEvent<HTMLDivElement>) => void,
    t: (key: string) => string,
) => {
    return (
        <div
            className={`${styles.sidebar__board} ${sidebarCollapsed === 'collapsed' ? styles.sidebar__boardCollapse : ''}`}>
            {renderBoardTitle(arr, sidebarCollapsed, isSelected, onClick, t)}
            {
                arr.length > 1 &&
                <div
                    className={styles.sidebar__boardSectionWrapper}
                    style={sidebarCollapsed === 'collapsed' ? {paddingLeft: 0} : {}}
                >
                    {arr.map((item, index) => {
                        if (index > 0 && !item.isPrimary) {
                            return (
                                <div key={item.key}>
                                    {renderBoardSection(
                                        item,
                                        sidebarCollapsed,
                                        classificatorsNoCollapsed,
                                        isSelected,
                                        onClick,
                                        handleMouseEnter,
                                        handleMouseMove,
                                        t
                                    )}
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })}
                </div>
            }
        </div>
    );
};

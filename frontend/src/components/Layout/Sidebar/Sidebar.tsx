import React, { FC, useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Sider from "antd/es/layout/Sider";
import {
    ADMINISTRATION,
    CATALOG,
    CONTENT_MANAGEMENT,
    MOPS_AND_ATTRIBUTES,
    REPORTS,
    STORES,
    USERS_AND_ACCOUNTS
} from "./constants";
import { renderDropDownSection, renderFullBoard } from "./render";
import Logo from "../../ui/Logo/Logo";
import arrowLeft from "../../../assets/chevron_left.svg";
import arrowRight from "../../../assets/chevron_right.svg";
import styles from "./Sidebar.module.scss";


const Sidebar: FC = () => {
    const {t} = useTranslation();
    const location = useLocation();

    const [sidebarCollapsed, setSidebarCollapsed] = useState(() =>
        sessionStorage.getItem('sidebarCollapsed') || 'noCollapsed'
    );

    const [classificatorsNoCollapsed, setClassificatorsNoCollapsed] = useState(() =>
        sessionStorage.getItem('classificatorsCollapsed') || 'noCollapsed'
    );

    const [classificatorsHovered, setClassificatorsHovered] = useState(false);

    useEffect(() => {
        sessionStorage.setItem('sidebarCollapsed', sidebarCollapsed);

        if (sidebarCollapsed === 'collapsed') {
            setClassificatorsNoCollapsed('noCollapsed');
        }
    }, [sidebarCollapsed]);

    useEffect(() => {
        sessionStorage.setItem('classificatorsCollapsed', classificatorsNoCollapsed);
    }, [classificatorsNoCollapsed]);

    const handleMouseEnter = (sectionTitle: string) => {
        if (sidebarCollapsed === 'collapsed' && sectionTitle === 'MOPs & Attributes') {
            setClassificatorsHovered(true);
            setClassificatorsNoCollapsed('collapsed');
        }
    };

    const handleMouseLeave = (sectionTitle: string) => {
        if (sidebarCollapsed === 'collapsed' && sectionTitle === 'MOPs & Attributes') {
            setClassificatorsHovered(false);
            setClassificatorsNoCollapsed('noCollapsed');
        }
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const mousePositionX = event.clientX;
        const mousePositionY = event.clientY;

        if (sidebarCollapsed === 'collapsed') {
            if (mousePositionX < rect.left || mousePositionY < rect.top || mousePositionY > rect.bottom) {
                setClassificatorsHovered(false);
                setClassificatorsNoCollapsed('noCollapsed');
            }
        }
    };

    const isSelected = (path: string) => {
        if (path === '/') {
            return location.pathname === '/';
        }

        const baseCurrentPath = '/' + window.location.pathname.split('/').slice(1, 3).join('/');
        return baseCurrentPath === path;
    };

    const onCollapse = () => setSidebarCollapsed((prevState: string) => {
        if (prevState === 'collapsed') {
            return 'noCollapsed';
        } else {
            return 'collapsed';
        }
    });

    const isInnerSelected = (path: string) => {
        return location.pathname === path;
    };

    const onClick = (path: string, title: string) => {
        if (!path && title === 'MOPs & Attributes') {
            setClassificatorsNoCollapsed((prevState: string) => {
                if (prevState === 'collapsed') {
                    return 'noCollapsed';
                } else {
                    return 'collapsed';
                }
            });
        } else if (path) {
            const languageFromUrl = new URLSearchParams(window.location.search).get('lang') || 'en';
            window.location.href = path + '?lang=' + languageFromUrl;
        }
    };

    const contentManagementBoard = renderFullBoard(
        CONTENT_MANAGEMENT, sidebarCollapsed, classificatorsNoCollapsed,
        isSelected, onClick, handleMouseEnter, handleMouseMove, t
    );

    const usersAndAccountsBoard = renderFullBoard(
        USERS_AND_ACCOUNTS, sidebarCollapsed, classificatorsNoCollapsed,
        isSelected, onClick, handleMouseEnter, handleMouseMove, t
    );

    const catalogBoard = renderFullBoard(
        CATALOG, sidebarCollapsed, classificatorsNoCollapsed,
        isSelected, onClick, handleMouseEnter, handleMouseMove, t
    );

    const reportsBoard = renderFullBoard(
        REPORTS, sidebarCollapsed, classificatorsNoCollapsed,
        isSelected, onClick, handleMouseEnter, handleMouseMove, t
    );

    const storesBoard = renderFullBoard(
        STORES, sidebarCollapsed, classificatorsNoCollapsed,
        isSelected, onClick, handleMouseEnter, handleMouseMove, t
    );

    const administrationBoard = renderFullBoard(
        ADMINISTRATION, sidebarCollapsed, classificatorsNoCollapsed,
        isSelected, onClick, handleMouseEnter, handleMouseMove, t
    );

    const mopsAndAttributesDropDown = renderDropDownSection(
        MOPS_AND_ATTRIBUTES, 'MOPs & Attributes', classificatorsNoCollapsed === 'collapsed', classificatorsHovered,
        handleMouseLeave, onClick, isInnerSelected, t
    );

    return (
        <Sider
            theme={'light'}
            width={272}
            collapsible
            collapsed={sidebarCollapsed === 'collapsed'}
            collapsedWidth={124}
            trigger={null}
        >
            <div className={styles.sidebar}>
                <div className={styles.sidebar__scrollWrapper}>
                    <div className={styles.sidebar__logoWrapper}
                         style={sidebarCollapsed === 'collapsed' ? {gap: 0} : {}}>
                        <Logo isMini={sidebarCollapsed === 'collapsed'} width={90}/>
                        <div className={styles.sidebar__arrow}>
                            <img
                                src={sidebarCollapsed === 'noCollapsed' ? arrowLeft : arrowRight}
                                alt={sidebarCollapsed === 'noCollapsed' ? 'Arrow left' : 'Arrow right'}
                                onClick={onCollapse}
                            />
                        </div>
                    </div>
                    {contentManagementBoard}
                    {/*{usersAndAccountsBoard}*/}
                    {/*{catalogBoard}*/}
                    {/*{mopsAndAttributesDropDown}*/}
                    {/*{reportsBoard}*/}
                    {/*{storesBoard}*/}
                    {/*{administrationBoard}*/}
                </div>
            </div>
        </Sider>
    );
};

export default Sidebar;
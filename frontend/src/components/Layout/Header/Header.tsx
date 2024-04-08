import React, { FC, useEffect, useState } from 'react';
// import { useHistory } from "react-routers-dom";
import {useNavigate} from 'react-router-dom';
import i18n from "i18next";
import type { MenuProps } from 'antd';
import { Badge, Dropdown, Layout, message, Tooltip } from 'antd';
import { useTranslation } from "react-i18next";
import { setNewQuery } from "../../../utils/query";
import userIcon from "../../../assets/header/user_icon.svg";
import chevronDownIcon from "../../../assets/chevron_down_icon.svg";
import bellIcon from "../../../assets/header/bell_icon.svg";
import styles from './Header.module.scss';

const {Header: AntdHeader} = Layout;

interface HeaderProps {
    profileName: string,
}

const Header: FC<HeaderProps> = ({profileName}) => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [selectedLanguage, setSelectedLanguage] = useState("en");

    useEffect(() => {
        const languageFromUrl = new URLSearchParams(window.location.search).get("lang") || "en";
        setSelectedLanguage(languageFromUrl);
        void i18n.changeLanguage(languageFromUrl);
    }, []);

    const handleLanguageChange = (language: string) => {
        setSelectedLanguage(language);
        setNewQuery('lang', language);
        void i18n.changeLanguage(language);
    };

    const onLogout = () => {
        localStorage.removeItem('indenim:r:token');
        localStorage.removeItem('indenim:a:token');
        navigate('/login');
        void message.success('Logout was successfull!', 0.8);
    };

    const languageItems: MenuProps['items'] = [
        {
            key: 'en',
            label: (
                <p onClick={() => handleLanguageChange('en')}>
                    {t("English")}
                </p>
            ),
        },
        {
            key: 'ru',
            label: (
                <p onClick={() => handleLanguageChange('ru')}>
                    {t("Russian")}
                </p>
            ),
        },
        {
            key: 'uz',
            label: (
                <p onClick={() => handleLanguageChange('uz')}>
                    {t("Uzbek")}
                </p>
            ),
        },
    ];

    const userInfoItems: MenuProps['items'] = [
        // {
        //     key: 'profile',
        //     label: (
        //         <p>{t("Profile")}</p>
        //     ),
        // },
        {
            key: 'logout',
            label: (
                <p onClick={onLogout}>{t("Logout")}</p>
            ),
        },
    ];

    return (
        <AntdHeader className={styles.header}>
            <div className={styles.headerContent}>
                <div className="header-items-left"></div>
                <div className={styles.headerItemsRight}>
                    <Tooltip title="notification">
                        <Badge offset={[0, 3]}>
                            <img src={bellIcon} alt={'Bell icon'}/>
                        </Badge>
                    </Tooltip>
                    <Dropdown menu={{items: languageItems}}>
                        <div className={styles.dropdownWrapper}>
                            <span>{t(selectedLanguage)}</span>
                            <img src={chevronDownIcon} alt={'Chevron down icon'}/>
                        </div>
                    </Dropdown>
                    <Dropdown menu={{items: userInfoItems}} placement="bottomRight">
                        <div className={styles.headerUserInfo}>
                            <img src={userIcon} alt={'User Icon'}/>
                            <p>{profileName}</p>
                            <img src={chevronDownIcon} alt={'Chevron down icon'}/>
                        </div>
                    </Dropdown>
                </div>
            </div>
        </AntdHeader>
    );
};

export default Header;
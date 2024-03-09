import React, { FC, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Button, Input } from "antd";
import { CloseCircleOutlined, SearchOutlined } from "@ant-design/icons";
import AccentButton from "../ui/AccentButton/AccentButton";
import filterIcon from "../../assets/filter_icon.svg";
import styles from "./Search.module.scss";

interface IProps {
    onSearchConfirm: (value: string) => void;
    filterRequired: boolean,
}

const Search: FC<IProps> = ({onSearchConfirm, filterRequired}) => {
    const {t} = useTranslation();

    const [searchValue, setSearchValue] = useState('');

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const onSearch = (mode: 'search' | 'reset') => {
        const searchParams = new URLSearchParams(window.location.search);
        let actionQueryParams = '?';
        let languageQueryParams = '';

        if (mode === 'search') {
            searchParams.set('search', searchValue);
            searchParams.forEach((value: string, key: string) => {
                if (key !== 'lang') {
                    actionQueryParams += `${key}=${key !== 'page' ? value : '1'}&`;
                } else {
                    languageQueryParams += `${key}=${value}&`;
                }
            });
        } else if (mode === 'reset') {
            setSearchValue('');

            searchParams.forEach((value: string, key: string) => {
                if (key !== 'search') {
                    if (key !== 'search' && key !== 'page' && key !== 'lang') {
                        actionQueryParams += `${key}=${value}&`;
                    }
                }
                if (key === 'lang') {
                    languageQueryParams += `${key}=${value}&`;
                }
            });

            actionQueryParams += 'page=1&';
        }

        window.history.pushState(
            {path: actionQueryParams + languageQueryParams},
            '',
            actionQueryParams + languageQueryParams
        );

        onSearchConfirm(actionQueryParams);
    };

    const handleSearchEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSearch('search');
        }
    };

    return (
        <div className={[styles.search, !filterRequired ? styles.search_medium : styles.search_large].join(' ')}>
            <Input
                className={'input'}
                name={'search'}
                value={searchValue}
                allowClear={{
                    clearIcon: <CloseCircleOutlined onClick={() => onSearch('reset')}/>
                }}
                placeholder={t("Search")}
                onChange={onChange}
                onKeyDown={handleSearchEnter}
                suffix={<SearchOutlined style={{color: '#B4B4B4'}}/>}
            />
            <AccentButton
                title={'Search'}
                click={() => onSearch('search')}
            />
            {
                filterRequired &&
                <Button className={styles.search__filter} disabled={true}>
                    <img src={filterIcon} alt={'Filter button'}/>
                </Button>
            }
        </div>
    );
};

export default Search;
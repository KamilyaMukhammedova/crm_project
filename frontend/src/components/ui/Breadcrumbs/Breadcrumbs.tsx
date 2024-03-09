import React, { FC } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Breadcrumb } from "antd";

interface IProps {
    items: {
        title: string,
        href: string,
    }[],
}

const Breadcrumbs: FC<IProps> = ({items}) => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    // const translatedItems = items.map(item => {
    //     return {
    //         ...item,
    //         title: /\d/.test(item.title) ? item.title : t(item.title),
    //         href: item.href + '?lang=' + new URLSearchParams(window.location.search).get('lang') || 'en',
    //     };
    // });
    const handleClick = (item: { title: string; href: string }) => (e: React.MouseEvent<HTMLAnchorElement | HTMLSpanElement>) => {
        e.preventDefault();
        navigate(item.href + '?lang=' + (new URLSearchParams(window.location.search).get('lang') || 'en'));
    };

    const translatedItems = items.map(item => {
        return {
            ...item,
            title: /\d/.test(item.title) ? item.title : t(item.title),
            // href: item.href + '?lang=' + new URLSearchParams(window.location.search).get('lang') || 'en',
            // onClick: (e: React.MouseEvent<HTMLAnchorElement | HTMLSpanElement>) => {
            //     e.preventDefault();
            //     navigate(item.href + '?lang=' + new URLSearchParams(window.location.search).get('lang') || 'en')
            // },
            onClick: handleClick(item),
        };
    });

    return <Breadcrumb separator=">" items={translatedItems}/>;
};

export default Breadcrumbs;



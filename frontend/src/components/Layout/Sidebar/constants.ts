import content from "../../../assets/sidebar/content_icon.svg";
import news from "../../../assets/sidebar/news_icon.svg";
import promotions from "../../../assets/sidebar/promotions_icon.svg";
import bestsellers from "../../../assets/sidebar/bestsellers_icon.svg";
import collections from "../../../assets/sidebar/collections_icon.svg";
import vacancies from "../../../assets/sidebar/vacancies_icon.svg";
import usersAndAccounts from "../../../assets/sidebar/users_icon.svg";
import users from "../../../assets/sidebar/users_user_icon.svg";
import accounts from "../../../assets/sidebar/accounts_icon.svg";
import catalog from "../../../assets/sidebar/catalog_icon.svg";
import products from "../../../assets/sidebar/products_icon.svg";
import mops from "../../../assets/sidebar/mops_icon.svg";
import reports from "../../../assets/sidebar/reports_icon.svg";
import report from "../../../assets/sidebar/reports_report_icon.svg";
import stores from "../../../assets/sidebar/stores_icon.svg";
import administration from "../../../assets/sidebar/administration_icon.svg";
import blackList from "../../../assets/sidebar/black_list_icon.svg";
import uniqueList from "../../../assets/sidebar/unique_list_icon.svg";
import settings from "../../../assets/sidebar/settings_icon.svg";
import faq from "../../../assets/sidebar/faq_icon.svg";

export const CONTENT_MANAGEMENT = [
    {
        key: 'content',
        title: 'Content Management',
        icon: content,
        path: '/content_management/news',
        isPrimary: true,
    },
    {
        key: 'content.1',
        title: 'News',
        icon: news,
        path: '/content_management/news',
        isPrimary: false,
    },
    {
        key: 'content.2',
        title: 'Promotions & Discounts',
        icon: promotions,
        path: '/content_management/promotions',
        isPrimary: false,
    },
    // {
    //     key: 'content.3',
    //     title: 'Bestsellers',
    //     icon: bestsellers,
    //     path: '/content_management/bestsellers',
    //     isPrimary: false,
    // },
    {
        key: 'content.4',
        title: 'Collections',
        icon: collections,
        path: '/content_management/collections',
        isPrimary: false,
    },
    {
        key: 'content.5',
        title: 'Vacancies',
        icon: vacancies,
        path: '/content_management/vacancies',
        isPrimary: false,
    },
    {
        key: 'content.6',
        title: 'Banners',
        icon: report,
        path: '/content_management/banners',
        isPrimary: false,
    },
];

export const USERS_AND_ACCOUNTS = [
    {
        key: 'users_and_accounts',
        title: 'Users and Accounts',
        icon: usersAndAccounts,
        path: '/users_and_accounts/users',
        isPrimary: true,
    },
    {
        key: 'users_and_accounts.1',
        title: 'Users',
        icon: users,
        path: '/users_and_accounts/users',
        isPrimary: false,
    },
    {
        key: 'users_and_accounts.2',
        title: 'Accounts & Rights',
        icon: accounts,
        path: '/users_and_accounts/accounts',
        isPrimary: false,
    },
];

export const CATALOG = [
    {
        key: 'catalog',
        title: 'Catalog',
        icon: catalog,
        path: '/catalog/products',
        isPrimary: true,
    },
    {
        key: 'catalog.1',
        title: 'Products',
        icon: products,
        path: '/catalog/products',
        isPrimary: false,
    },
    {
        key: 'mops_catalog.2',
        title: 'MOPs & Attributes',
        icon: mops,
        path: '',
        isPrimary: false,
    },
];

export const REPORTS = [
    {
        key: 'reports',
        title: 'Reports',
        icon: reports,
        path: '',
        isPrimary: true,
    },
    {
        key: 'reports.1',
        title: 'Reports',
        icon: report,
        path: '',
        isPrimary: false,
    },
];

export const STORES = [
    {
        key: 'stores',
        title: 'Stores',
        icon: stores,
        path: '/stores',
        isPrimary: true,
    },
];

export const ADMINISTRATION = [
    {
        key: 'administration',
        title: 'Administration',
        icon: administration,
        path: '/administration/black_list',
        isPrimary: true,
    },
    {
        key: 'administration.1',
        title: 'Black list',
        icon: blackList,
        path: '/administration/black_list',
        isPrimary: false,
    },
    {
        key: 'administration.2',
        title: 'Unique list',
        icon: uniqueList,
        path: '/administration/unique_list',
        isPrimary: false,
    },
    {
        key: 'administration.3',
        title: 'Settings',
        icon: settings,
        path: '/administration/settings',
        isPrimary: false,
    },
    {
        key: 'administration.4',
        title: 'FAQ',
        icon: faq,
        path: '/administration/faq',
        isPrimary: false,
    },
];

export const MOPS_AND_ATTRIBUTES = [
    {
        key: 'mops.1',
        title: 'Age groups',
        path: '/catalog/mops_and_attributes/age_groups',
    },
    {
        key: 'mops.2',
        title: 'Buying groups',
        path: '/catalog/mops_and_attributes/buying_groups',
    },
    {
        key: 'mops.3',
        title: 'Categories',
        path: '/catalog/mops_and_attributes/categories',
    },
    {
        key: 'mops.4',
        title: 'Cities',
        path: '/catalog/mops_and_attributes/cities',
    },
    {
        key: 'mops.5',
        title: 'Collection seasons',
        path: '/catalog/mops_and_attributes/collection_seasons',
    },
    {
        key: 'mops.6',
        title: 'Departments',
        path: '/catalog/mops_and_attributes/departments',
    },
    {
        key: 'mops.7',
        title: 'Sale seasons',
        path: '/catalog/mops_and_attributes/sale_seasons',
    },
    {
        key: 'mops.8',
        title: 'Sizes',
        path: '/catalog/mops_and_attributes/sizes',
    },
    {
        key: 'mops.9',
        title: 'Styles',
        path: '/catalog/mops_and_attributes/styles',
    },
    {
        key: 'mops.10',
        title: 'Sub Categories',
        path: '/catalog/mops_and_attributes/sub_categories',
    },
    {
        key: 'mops.11',
        title: 'Themes',
        path: '/catalog/mops_and_attributes/themes',
    },
];
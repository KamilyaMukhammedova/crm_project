import { NotFound } from "../components/ui/NotFound/NotFound";
import Login from "../pages/Login/Login";
import Main from "../pages/Main/Main";
import News from "../pages/News/News";
import Promotions from "../pages/Promotions/Promotions";
import Collections from "../pages/Collections/Collections";
import Vacancies from "../pages/Vacancies/Vacancies";
import Bestsellers from "../pages/Bestsellers/Bestsellers";
import CreateNews from "../pages/CreateNews/CreateNews";
import CreatePromotion from "../pages/CreatePromotion/CreatePromotion";
import CreateVacancy from "../pages/CreateVacancy/CreateVacancy";
import AgeGroups from "../pages/Classificators/AgeGroups/AgeGroups";
import BuyingGroups from "../pages/Classificators/BuyingGroups/BuyingGroups";
import Categories from "../pages/Classificators/Categories/Categories";
import Cities from "../pages/Classificators/Cities/Cities";
import CollectionSeasons from "../pages/Classificators/CollectionSeasons/CollectionSeasons";
import Departments from "../pages/Classificators/Departments/Departments";
import SaleSeasons from "../pages/Classificators/SaleSeasons/SaleSeasons";
import Sizes from "../pages/Classificators/Sizes/Sizes";
import Styles from "../pages/Classificators/Styles/Styles";
import SubCategories from "../pages/Classificators/SubCategories/SubCategories";
import Themes from "../pages/Classificators/Themes/Themes";
import Settings from "../pages/Settings/Settings";
import BlackList from "../pages/BlackList/BlackList";
import Stores from "../pages/Stores/Stores";
import UniqueList from "../pages/UniqueList/UniqueList";
import Products from "../pages/Products/Products";
import Accounts from "../pages/Accounts/Accounts";
import UsersList from "../pages/Users/UsersList/UsersList";
import UserPurchases from "../pages/Users/UserPurchases/UserPurchases";
import UserPurchaseItems from "../pages/Users/UserPurchaseItems/UserPurchaseItems";
import CvList from "../pages/CvList/CvList";
import Banners from "../pages/Banners/Banners";
import Faq from "../pages/Faq/Faq";
import CreateFaq from "../pages/CreateFaq/CreateFaq";

export default [
    {
        component: Login,
        path: '/login',
        isExact: true,
        isAdmin: false,
        requiredRoles: [],
    },
    {
        component: Main,
        path: '/',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: News,
        path: '/content_management/news',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: Promotions,
        path: '/content_management/promotions',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: Collections,
        path: '/content_management/collections',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: Vacancies,
        path: '/content_management/vacancies',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: Bestsellers,
        path: '/content_management/bestsellers',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: CreateNews,
        path: '/content_management/create_news',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: CreateNews,
        path: '/content_management/edit_news/:newsId',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: CreatePromotion,
        path: '/content_management/create_promotion',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: CreatePromotion,
        path: '/content_management/edit_promotion/:promId',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: CreateVacancy,
        path: '/content_management/create_vacancy',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: CreateVacancy,
        path: '/content_management/edit_vacancy/:vacancyId',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: AgeGroups,
        path: '/catalog/mops_and_attributes/age_groups',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: BuyingGroups,
        path: '/catalog/mops_and_attributes/buying_groups',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: Categories,
        path: '/catalog/mops_and_attributes/categories',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: Cities,
        path: '/catalog/mops_and_attributes/cities',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: CollectionSeasons,
        path: '/catalog/mops_and_attributes/collection_seasons',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: Departments,
        path: '/catalog/mops_and_attributes/departments',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: SaleSeasons,
        path: '/catalog/mops_and_attributes/sale_seasons',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: Sizes,
        path: '/catalog/mops_and_attributes/sizes',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: Styles,
        path: '/catalog/mops_and_attributes/styles',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: SubCategories,
        path: '/catalog/mops_and_attributes/sub_categories',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: Themes,
        path: '/catalog/mops_and_attributes/themes',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: Settings,
        path: '/administration/settings',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: BlackList,
        path: '/administration/black_list',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: Stores,
        path: '/stores',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: UniqueList,
        path: '/administration/unique_list',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: Products,
        path: '/catalog/products',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: Accounts,
        path: '/users_and_accounts/accounts',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: UsersList,
        path: '/users_and_accounts/users',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: UserPurchases,
        path: '/users_and_accounts/users/:userId/:userPhoneNumber/purchases',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: UserPurchaseItems,
        path: '/users_and_accounts/users/:userId/:userPhoneNumber/purchases/:purchaseId',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: CvList,
        path: '/content_management/vacancies/:vacancyId/cv_list',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: Banners,
        path: '/content_management/banners',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: Faq,
        path: '/administration/faq',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: CreateFaq,
        path: '/administration/create_faq',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: CreateFaq,
        path: '/administration/edit_faq/:faqId',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
    {
        component: NotFound,
        path: '*',
        isExact: true,
        isAdmin: true,
        requiredRoles: [1],
    },
];
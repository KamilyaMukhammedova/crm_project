import AuthenticatedRoute from "./privateRoutes/AuthenticatedRoute";
import Main from "../pages/Main/Main";
import News from "../pages/News/News";
import Promotions from "../pages/Promotions/Promotions";
import Collections from "../pages/Collections/Collections";
import Vacancies from "../pages/Vacancies/Vacancies";
import Bestsellers from "../pages/Bestsellers/Bestsellers";
import CreateNews from "../pages/CreateNews/CreateNews";
import CreatePromotion from "../pages/CreatePromotion/CreatePromotion";
import UnauthenticatedRoute from "./privateRoutes/UnauthenticatedRoute";
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
import { NotFound } from "../components/ui/NotFound/NotFound";

const routes = [
    {
        path: '/',
        element: AuthenticatedRoute,
        children: [
            {index: true, element: Main},
            {path: '/content_management/news', element: News},
            {path: '/content_management/promotions', element: Promotions},
            {
                element: Collections,
                path: '/content_management/collections',
            },
            {
                element: Vacancies,
                path: '/content_management/vacancies',
            },
            {
                element: Bestsellers,
                path: '/content_management/bestsellers',
            },
            {
                element: CreateNews,
                path: '/content_management/create_news',
            },
            {
                element: CreateNews,
                path: '/content_management/edit_news/:newsId',
            },
            {
                element: CreatePromotion,
                path: '/content_management/create_promotion',
            },
            {
                element: CreatePromotion,
                path: '/content_management/edit_promotion/:promId',
            },
            {
                element: CreateVacancy,
                path: '/content_management/create_vacancy',
            },
            {
                element: CreateVacancy,
                path: '/content_management/edit_vacancy/:vacancyId',
            },
            {
                element: AgeGroups,
                path: '/catalog/mops_and_attributes/age_groups',
            },
            {
                element: BuyingGroups,
                path: '/catalog/mops_and_attributes/buying_groups',
            },
            {
                element: Categories,
                path: '/catalog/mops_and_attributes/categories',
            },
            {
                element: Cities,
                path: '/catalog/mops_and_attributes/cities',
            },
            {
                element: CollectionSeasons,
                path: '/catalog/mops_and_attributes/collection_seasons',
            },
            {
                element: Departments,
                path: '/catalog/mops_and_attributes/departments',
            },
            {
                element: SaleSeasons,
                path: '/catalog/mops_and_attributes/sale_seasons',
            },
            {
                element: Sizes,
                path: '/catalog/mops_and_attributes/sizes',
            },
            {
                element: Styles,
                path: '/catalog/mops_and_attributes/styles',
            },
            {
                element: SubCategories,
                path: '/catalog/mops_and_attributes/sub_categories',
            },
            {
                element: Themes,
                path: '/catalog/mops_and_attributes/themes',
            },
            {
                element: Settings,
                path: '/administration/settings',
            },
            {
                element: BlackList,
                path: '/administration/black_list',
            },
            {
                element: Stores,
                path: '/stores',
            },
            {
                element: UniqueList,
                path: '/administration/unique_list',
            },
            {
                element: Products,
                path: '/catalog/products',
            },
            {
                element: Accounts,
                path: '/users_and_accounts/accounts',
            },
            {
                element: UsersList,
                path: '/users_and_accounts/users',
            },
            {
                element: UserPurchases,
                path: '/users_and_accounts/users/:userId/:userPhoneNumber/purchases',
            },
            {
                element: UserPurchaseItems,
                path: '/users_and_accounts/users/:userId/:userPhoneNumber/purchases/:purchaseId',
            },
            {
                element: CvList,
                path: '/content_management/vacancies/:vacancyId/cv_list',
            },
            {
                element: Banners,
                path: '/content_management/banners',
            },
            {
                element: Faq,
                path: '/administration/faq',
            },
            {
                element: CreateFaq,
                path: '/administration/create_faq',
            },
            {
                element: CreateFaq,
                path: '/administration/edit_faq/:faqId',
            },
            {
                element: NotFound,
                path: '*',
            }
        ]
    },
    {
        path: "/login",
        element: UnauthenticatedRoute,
    },
];

export default routes;
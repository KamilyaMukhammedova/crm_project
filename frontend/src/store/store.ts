import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/AuthSlice";
import profileReducer from "./profile/ProfileSlice";
import newsReducer from "./news/NewsSlice";
import promotionsReducer from "./promotions/PromotionsSlice";
import collectionsReducer from "./collections/CollectionsSlice";
import vacanciesReducer from "./vacancies/VacanciesSlice";
import bestsellersReducer from "./bestsellers/BestsellersSlice";
import classificatorsReducer from "./classificators/ClassificatorsSlice";
import settingsReducer from "./settings/SettingsSlice";
import blackListReducer from "./blackList/BlackListSlice";
import uniqueListReducer from "./uniqueList/UniqueListSlice";
import storesReducer from "./stores/StoresSlice";
import productsReducer from "./products/ProductsSlice";
import accountsReducer from "./accounts/AccountsSlice";
import usersReducer from "./users/UsersSlice";
import dashboardsReducer from "./dashboards/DashboardsSlice";
import cvReducer from "./cv/CvSlice";
import bannersReducer from "./banners/BannersSlice";
import faqReducer from "./faq/FaqSlice";

const rootReducer = combineReducers({
    authReducer,
    profileReducer,
    newsReducer,
    promotionsReducer,
    collectionsReducer,
    vacanciesReducer,
    bestsellersReducer,
    classificatorsReducer,
    settingsReducer,
    blackListReducer,
    storesReducer,
    uniqueListReducer,
    productsReducer,
    accountsReducer,
    usersReducer,
    dashboardsReducer,
    cvReducer,
    bannersReducer,
    faqReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

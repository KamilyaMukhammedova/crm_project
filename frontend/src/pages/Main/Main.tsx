import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { message } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
    fetchBonusesDashboardDataAction,
    fetchUsersDashboardDataAction
} from "../../store/dashboards/DashboardsActions";
import UsersDashboard from "../../components/Dashboards/UsersDashboard/UsersDashboard";
import BonusesDashboards from "../../components/Dashboards/BonusesDashboards/BonusesDashboards";
import ErrorMessage from "../../components/ui/ErrorMessage/ErrorMessage";
import MainLoader from "../../components/ui/MainLoader/MainLoader";
import styles from "./Main.module.scss";

const Main = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const {
        usersData,
        bonusesData,
        usersDataFetching,
        bonusesDataFetching,
        usersDataError,
        bonusesDataError,
    } = useAppSelector(state => state.dashboardsReducer);


    useEffect(() => {
        const fetchAllDashboardsData = async () => {
            try {
                await Promise.all([
                    dispatch(fetchUsersDashboardDataAction()),
                    dispatch(fetchBonusesDashboardDataAction()),
                ]);
            } catch (e) {
                message.error(t("Fetching of dashboards is failed!"));
            }
        };

        void fetchAllDashboardsData();
    }, []);

    return (
        <>
            {
                usersDataFetching || bonusesDataFetching ? <MainLoader/> :
                    <div className={styles.mainPage}>
                        <h1>{t("Bonus Statistic")}</h1>
                        <div className={styles.mainPage__inner}>
                            <div className={styles.mainPage__users}>
                                {
                                    !usersDataError ?
                                        <UsersDashboard data={usersData}/> :
                                        <ErrorMessage errorMsg={'Users Dashboard: ' + usersDataError}/>
                                }
                            </div>
                            <div className={styles.mainPage__bonuses}>
                                {
                                    !bonusesDataError ?
                                        <BonusesDashboards data={bonusesData}/> :
                                        <ErrorMessage errorMsg={'Bonuses Dashboard: ' + bonusesDataError}/>
                                }
                            </div>
                        </div>
                    </div>
            }
        </>
    );
};

export default Main;
import React, { FC } from 'react';
import { useTranslation } from "react-i18next";
import { Progress } from "antd";
import { getPercentage, getSpacesForDecimalNum } from "../../../utils/basic";
import { generatePluralOrSingular } from "../../../utils/translation";
import { IUsersDashboardData } from "../../../types/dashboards";
import styles from "./UsersDashboard.module.scss";

interface IProps {
    data: IUsersDashboardData | null,
}

const UsersDashboard: FC<IProps> = ({data}) => {
    const {t} = useTranslation();

    return (
        <>
            {
                data &&
                <div className={styles.userDashboard}>
                    <p className={styles.userDashboard__allUsers}>
                        {getSpacesForDecimalNum(data?.all_users)} {t(generatePluralOrSingular(data.all_users, 'Users'))}
                    </p>
                    <p className={styles.userDashboard__inactiveUsers}>
                        {getSpacesForDecimalNum(data?.inactive_users)} {t("not active")}
                    </p>
                    <div className={styles.userDashboard__active}>
                        <Progress
                            type="circle"
                            percent={getPercentage(data?.active_users, data.all_users)}
                            strokeColor={'#FF6600'}
                            trailColor={'#B4B4B4'}
                            size={200}
                            strokeWidth={10}
                            strokeLinecap={'square'}
                            format={() => (
                                <div className={styles.userDashboard__active}>
                                    <p className={styles.userDashboard__activeAmount}>
                                        {getSpacesForDecimalNum(data?.active_users)}
                                    </p>
                                    <p className={styles.userDashboard__activeTitle}>
                                        {t(generatePluralOrSingular(data?.active_users, 'Active'))}
                                    </p>
                                </div>
                            )}
                        />
                    </div>
                </div>
            }
        </>
    );
};

export default UsersDashboard;
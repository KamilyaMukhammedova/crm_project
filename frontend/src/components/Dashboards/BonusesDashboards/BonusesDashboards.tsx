import React, { FC } from 'react';
import { useTranslation } from "react-i18next";
import { getSpacesForDecimalNum } from "../../../utils/basic";
import { IBonusesDashboardData } from "../../../types/dashboards";
import styles from "./BonusesDashboard.module.scss";

interface IProps {
    data: IBonusesDashboardData | null,
}

const BonusesDashboards: FC<IProps> = ({data}) => {
    const {t} = useTranslation();

    return (
        <>
            {
                data &&
                <div className={styles.bonusesDashboard}>
                    <div className={styles.bonusesDashboard__card}>
                        <p>{t("Bonuses given out")}</p>
                        <span className={styles.bonusesDashboard_givenOut}>
                            {getSpacesForDecimalNum(data?.given_out)}
                        </span>
                    </div>
                    <div className={styles.bonusesDashboard__card}>
                        <p>{t("Expected for release")}</p>
                        <span className={styles.bonusesDashboard_expectedRelease}>
                            {getSpacesForDecimalNum(data?.expected_for_release)}
                        </span>
                    </div>
                    <div className={styles.bonusesDashboard__card}>
                        <p>{t("Used Bonuses")}</p>
                        <span className={styles.bonusesDashboard_usedBonuses}>
                            {getSpacesForDecimalNum(data?.used_bonus)}
                        </span>
                    </div>
                </div>
            }
        </>
    );
};

export default BonusesDashboards;
import React, { FC } from 'react';
import { useTranslation } from "react-i18next";

interface IProps {
    status: boolean,
    isBestsellerStatus?: boolean,
    isUserStatus?: boolean,
}

const StatusColumn: FC<IProps> = ({status, isBestsellerStatus, isUserStatus}) => {
    const {t} = useTranslation();

    if (status !== undefined) {
        return (
            <span className={status ? "statusActive" : "statusInactive"}>
                {!isBestsellerStatus && status && t("Active")}
                {!isBestsellerStatus && !status && !isUserStatus && t("Inactive")}

                {isBestsellerStatus && status && t("Yes")}
                {isBestsellerStatus && !status && t("No")}

                {isUserStatus && !status && !isBestsellerStatus && t("Deactive")}
            </span>
        );
    }
    return null;
};

export default StatusColumn;
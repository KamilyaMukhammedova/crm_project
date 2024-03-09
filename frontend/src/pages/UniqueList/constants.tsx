import { IUniqueListItem } from "../../types/uniqueList";
import { blackListBasicColumns, generateBlackListActionsColumns } from "../BlackList/constants";

export const BREADCRUMBS_ITEMS = [
    {
        title: 'Administration',
        href: '/administration/unique_list',
    },
    {
        title: 'Unique list',
        href: '/administration/unique_list',
    },
];

export const generateColumns = (onDelete: (id: number) => void) => {
    return [
        ...blackListBasicColumns,
        {
            title: 'Percent',
            dataIndex: 'percent',
            key: 'percent',
            render: (_: string, record: IUniqueListItem) => (
                <span>{record.percent} %</span>
            ),
        },
        ...generateBlackListActionsColumns(onDelete, 'Unique list', true),
    ];
};
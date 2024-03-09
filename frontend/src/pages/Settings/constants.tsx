import { ISetting } from "../../types/settings";
import CustomButton from "../../components/ui/CustomButton/CustomButton";

export const BREADCRUMBS_ITEMS = [
    {
        title: 'Administration',
        href: '/administration/settings',
    },
    {
        title: 'Settings',
        href: '/administration/settings',
    },
];

export const generateColumns = (onEdit: (id: number) => void) => {
    return [
        {
            title: 'Bonus activation date',
            dataIndex: 'bonus_activation_date',
            key: 'bonus_activation_date',
            fixed: 'left',
        },
        {
            title: 'Default percent',
            dataIndex: 'default_percent',
            key: 'default_percent',
        },
        {
            title: 'Promocode percent',
            dataIndex: 'promocode_percent',
            key: 'promocode_percent',
        },
        {
            title: 'Bonus remove month',
            dataIndex: 'bonus_remove_month',
            key: 'bonus_remove_month',
        },
        {
            title: 'Classic',
            dataIndex: 'classic',
            key: 'classic',
        },
        {
            title: 'Smart',
            dataIndex: 'smart',
            key: 'smart',
        },
        {
            title: '',
            dataIndex: null,
            key: 'actions',
            width: '27%',
            render: (_: string, record: ISetting) => (
                <div className={'flexEnd'}>
                    <CustomButton click={() => onEdit(record.id)}/>
                </div>
            ),
        }
    ];
};
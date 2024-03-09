import moment from "moment/moment";
import { IAccount } from "../../types/accounts";
import { renderRoleColumn } from "../../utils/table";
import CustomButton from "../../components/ui/CustomButton/CustomButton";
import StatusColumn from "../../components/ui/StatusColumn/StatusColumn";
import toolIcon from "../../assets/tool_icon.svg";

export const BREADCRUMBS_ITEMS = [
    {
        title: 'Users and Accounts',
        href: '/users_and_accounts/accounts',
    },
    {
        title: 'Accounts & Rights',
        href: '/users_and_accounts/accounts',
    },
];

export const generateColumns = (onEdit: (id: number) => void, onChangePassword: (id: number) => void) => {
    return [
        {
            title: 'User name',
            dataIndex: 'username',
            key: 'username',
            fixed: 'left',
        },
        {
            title: 'Full name',
            dataIndex: 'full_name',
            key: 'full_name',
        },
        {
            title: 'First login',
            dataIndex: 'date_joined',
            key: 'date_joined',
            render: (_: string, record: IAccount) => (
                <span>
                {moment(record?.date_joined).format('DD.MM.YYYY')}
            </span>
            ),
        },
        {
            title: 'Last login',
            dataIndex: '',
            key: 'last_login',
        },
        {
            title: 'Status',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (_: string, record: IAccount) => (
                <StatusColumn status={record.is_active} isUserStatus={true}/>
            )
        },
        {
            title: 'Role',
            dataIndex: 'user_type',
            key: 'user_type',
            render: (_: string, record: IAccount) => (
                <span>{renderRoleColumn(record.type)}</span>
            )
        },
        {
            title: '',
            dataIndex: null,
            key: 'actions',
            width: '30%',
            render: (_: string, record: IAccount) => (
                <div className={'flexEnd'}>
                    <CustomButton click={() => onEdit(record.id)}/>
                    <CustomButton
                        click={() => onChangePassword(record.id)}
                        icon={toolIcon}
                        title={'Change password'}
                        alt={'Tool'}
                    />
                </div>
            ),
        }
    ];
};
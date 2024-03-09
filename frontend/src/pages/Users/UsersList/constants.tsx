import { IUser } from "../../../types/users";
import CustomButton from "../../../components/ui/CustomButton/CustomButton";
import StatusColumn from "../../../components/ui/StatusColumn/StatusColumn";
import bagIcon from "../../../assets/bag_icon.svg";
import xCircleIcon from "../../../assets/x_circle_icon.svg";
import checkIcon from "../../../assets/check_icon.svg";

export const BREADCRUMBS_ITEMS = [
    {
        title: 'Users and Accounts',
        href: '/users_and_accounts/users',
    },
    {
        title: 'Users',
        href: '/users_and_accounts/users',
    },
];

export const generateColumns = (onPurchases: (userId: number, userPhoneNumber: string) => void, onStatusChange: (userId: number, userStatus: boolean) => void) => {
    return [
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            fixed: 'left',
        },
        {
            title: 'Full name',
            dataIndex: 'full_name',
            key: 'full_name',
            fixed: 'left',
        },
        {
            title: 'Receipts',
            dataIndex: 'orders',
            key: 'orders',
        },
        {
            title: 'Status',
            key: 'is_active',
            render: (_: string, record: IUser) => (
                <StatusColumn status={record.is_active} isUserStatus={true}/>
            ),
        },
        {
            title: 'Balance',
            key: 'balance',
            render: (_: string, record: IUser) => (
                <span>{record.balance ? record.balance.value : 0} uzs</span>
            ),
        },
        {
            title: '',
            dataIndex: null,
            key: 'actions',
            width: '25%',
            render: (_: string, record: IUser) => (
                <div className={'flexEnd'}>
                    <div className={'widthSmall'}>
                        <CustomButton
                            icon={bagIcon}
                            title={'Purchases'}
                            alt={'Shopping bag'}
                            click={() => onPurchases(record.id, record.phone)}
                        />
                    </div>
                    <div className={'widthMedium flexEnd'}>
                        {
                            record.is_active ?
                                <CustomButton
                                    icon={xCircleIcon}
                                    title={'Deactivate'}
                                    alt={'Deactivate'}
                                    isRed={true}
                                    click={() => onStatusChange(record.id, record.is_active)}
                                /> :
                                <CustomButton
                                    icon={checkIcon}
                                    title={'Activate'}
                                    alt={'Activate'}
                                    isGreen={true}
                                    click={() => onStatusChange(record.id, record.is_active)}
                                />
                        }
                    </div>
                </div>
            ),
        }
    ];
};


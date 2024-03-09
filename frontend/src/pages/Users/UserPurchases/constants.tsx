import moment from "moment/moment";
import { IUserPurchase, IUserPurchaseStore } from "../../../types/users";
import { generateDataIndexWithCurrentLanguage } from "../../../utils/translation";
import CustomButton from "../../../components/ui/CustomButton/CustomButton";
import ticketIcon from "../../../assets/ticket_icon.svg";

export const generateBreadCrumbs = (userId: string, userPhoneNumber: string) => {
    return [
        {
            title: 'Users and Accounts',
            href: '/users_and_accounts/users',
        },
        {
            title: 'Users',
            href: '/users_and_accounts/users',
        },
        {
            title: userPhoneNumber,
            href: `/users_and_accounts/users/${userId}/${userPhoneNumber}/purchases`,
        },
    ];
};

export const generateColumns = (onPurchaseItems : (purchaseId: number) => void) => {
    return [
        {
            title: 'Receipt number',
            dataIndex: 'receipt_number',
            key: 'receipt_number',
            fixed: 'left',
        },
        {
            title: 'Return Receipt',
            key: 'return_receipt',
            render: (_: string, record: IUserPurchase) => {
                return record.return_receipt.map(receipt => <p>{receipt}</p>)
            },
        },
        {
            title: 'Store',
            key: 'store',
            render: (_: string, record: IUserPurchase) => {
                const dataIndex = generateDataIndexWithCurrentLanguage('name') as keyof IUserPurchaseStore;
                return <span>{record.store_obj?.[dataIndex] ? record.store_obj[dataIndex] : record.store_obj?.name_ru}</span>;
            },
        },
        {
            title: 'Amount',
            dataIndex: 'items_amount',
            key: 'items_amount',
        },
        {
            title: 'Date',
            key: 'created_date',
            render: (_: string, record: IUserPurchase) => (
                <span>
                   {moment(record?.date).format('DD.MM.YYYY')}
                </span>
            ),
        },
        {
            title: 'Total',
            key: 'total',
            render: (_: string, record: IUserPurchase) => (
                <span>
                    {record.price} uzs
                </span>
            ),
        },
        {
            title: 'Bonuses',
            key: 'bonus',
            render: (_: string, record: IUserPurchase) => (
                <span>
                    {record.added_bonus} uzs
                </span>
            ),
        },
        {
            title: '',
            dataIndex: null,
            key: 'actions',
            width: '15%',
            render: (_: string, record: IUserPurchase) => (
                <div className={'flexEnd'}>
                    <CustomButton
                        icon={ticketIcon}
                        title={'Check'}
                        alt={'Ticket'}
                        click={() => onPurchaseItems(record.id)}
                    />
                </div>
            )
        },
    ];
};
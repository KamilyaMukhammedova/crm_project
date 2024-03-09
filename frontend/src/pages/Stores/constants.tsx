import { IStore, IStoreCity } from "../../types/stores";
import { generateDataIndexWithCurrentLanguage } from "../../utils/translation";
import CustomButton from "../../components/ui/CustomButton/CustomButton";
import DeleteButton from "../../components/ui/DeleteButton/DeleteButton";

export const BREADCRUMBS_ITEMS = [
    {
        title: 'Stores',
        href: '/stores',
    },
];

export const COLUMNS = [
    {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
        fixed: 'left',
    },
    {
        title: 'City',
        key: 'city',
        render: (_: string, record: IStore) => {
            const dataIndex = generateDataIndexWithCurrentLanguage('name') as keyof IStoreCity;
            return <span>{record.city?.[dataIndex] ? record.city[dataIndex] : record.city?.name}</span>;
        },
    },
    {
        title: 'Name',
        key: 'name',
        render: (_: string, record: IStore) => {
            const dataIndex = generateDataIndexWithCurrentLanguage('name') as keyof Omit<IStore, 'city'>;
            return <span>{record?.[dataIndex] ? record[dataIndex] : record?.name_ru}</span>;
        },
    },
    {
        title: 'Address',
        key: 'address',
        render: (_: string, record: IStore) => {
            const dataIndex = generateDataIndexWithCurrentLanguage('address') as keyof Omit<IStore, 'city'>;
            return <span>{record[dataIndex]}</span>;
        },
    },
    {
        title: 'Longitude',
        dataIndex: 'longitude',
        key: 'longitude',
    },
    {
        title: 'Latitude',
        dataIndex: 'latitude',
        key: 'latitude',
    },
    {
        title: 'From Time',
        dataIndex: 'from_time',
        key: 'from_time',
        width: '8%',
    },
    {
        title: 'To Time',
        dataIndex: 'to_time',
        key: 'to_time',
        width: '8%',
    },
    {
        title: 'Contact',
        dataIndex: 'contact',
        key: 'contact',
    },
    {
        title: '',
        dataIndex: null,
        key: 'actions',
        width: '20%',
        render: () => (
            <div className={'flexEnd'}>
                <CustomButton isDisabled/>
                <DeleteButton isDisabled/>
            </div>
        ),
    }
];

import moment from "moment";
import { Image } from 'antd';
import { Promotion } from "../../types/promotions";
import { generateDataIndexWithCurrentLanguage } from "../../utils/translation";
import { checkImageUrl } from "../../utils/table";
import CustomButton from "../../components/ui/CustomButton/CustomButton";
import DeleteButton from "../../components/ui/DeleteButton/DeleteButton";
import StatusColumn from "../../components/ui/StatusColumn/StatusColumn";

export const BREADCRUMBS_ITEMS = [
    {
        title: 'Content Management',
        href: '/content_management/promotions',
    },
    {
        title: 'Promotions & Discounts',
        href: '/content_management/promotions',
    },
];

export const generateColumns = (onEdit: (id: string) => void, onDelete: (id: string) => void) => {
    return [
        {
            title: 'Title',
            key: 'title',
            width: '140px',
            fixed: 'left',
            render: (_: string, record: Promotion) => {
                const dataIndex = generateDataIndexWithCurrentLanguage('title') as keyof Promotion;
                return <span>{record[dataIndex]}</span>;
            },
        },
        {
            title: 'Image',
            dataIndex: 'preview',
            key: 'preview',
            fixed: 'left',
            render: (text: string) => {
                return (
                    <Image
                        src={checkImageUrl(text)}
                        width={200}
                        height={'auto'}
                        style={{borderRadius: '10px'}}
                    />
                )
            }
        },
        {
            title: 'Short text',
            key: 'small_description',
            width: '200px',
            render: (_: string, record: Promotion) => {
                const dataIndex = generateDataIndexWithCurrentLanguage('small_description') as keyof Promotion;
                return <div className={'smallText'}>{record[dataIndex]}</div>;
            },
        },
        {
            title: 'Period',
            dataIndex: 'created_date',
            key: 'created_date',
            width: '250px',
            render: (_: string, record: Promotion) => (
                <div>
                    {moment(record?.start_date).format('DD.MM.YYYY')} - {moment(record?.end_date).format('DD.MM.YYYY')}
                </div>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (_: string, record: Promotion) => (
                <StatusColumn status={record.is_active}/>
            ),
        },
        {
            title: '',
            dataIndex: null,
            key: 'actions',
            width: '30%',
            render: (_: string, record: Promotion) => (
                <div className={'flexEnd'}>
                    <CustomButton click={() => onEdit(record._id)}/>
                    <DeleteButton click={() => onDelete(record._id)}/>
                </div>
            ),
        }
    ];
};

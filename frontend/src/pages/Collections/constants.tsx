import moment from "moment";
import { Image } from 'antd';
import { ICollection } from "../../types/collections";
import { generateDataIndexWithCurrentLanguage } from "../../utils/translation";
import { renderImage } from "../../utils/basic";
import CustomButton from "../../components/ui/CustomButton/CustomButton";
import DeleteButton from "../../components/ui/DeleteButton/DeleteButton";
import StatusColumn from "../../components/ui/StatusColumn/StatusColumn";

export const BREADCRUMBS_ITEMS = [
    {
        title: 'Content Management',
        href: '/content_management/collections',
    },
    {
        title: 'Collections',
        href: '/content_management/collections',
    },
];

export const generateColumns = (onEdit: (id: string) => void, onDelete: (id: string) => void) => {
    return [
        {
            title: 'Title',
            key: 'title',
            fixed: 'left',
            render: (_: string, record: ICollection) => {
                const dataIndex = generateDataIndexWithCurrentLanguage('title') as keyof ICollection;
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
                        src={renderImage(text)}
                        width={191}
                        height={120}
                        style={{borderRadius: '10px'}}
                    />
                )
            }
        },
        {
            title: 'Date',
            dataIndex: 'created_date',
            key: 'created_date',
            render: (_: string, record: ICollection) => (
                <span>
                {record?.created_date ? moment(record?.created_date).format('DD.MM.YYYY') : ''}
            </span>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (_: string, record: ICollection) => (
                <StatusColumn status={record.is_active}/>
            ),
        },
        {
            title: '',
            dataIndex: null,
            key: 'actions',
            width: '50%',
            render: (_: string, record: ICollection) => (
                <div className={'flexEnd'}>
                    <CustomButton click={() => onEdit(record._id)}/>
                    <DeleteButton click={() => onDelete(record._id)}/>
                </div>
            ),
        }
    ];
};

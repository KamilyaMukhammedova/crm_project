import moment from "moment";
import { Image } from 'antd';
import { News } from "../../types/news";
import { generateDataIndexWithCurrentLanguage } from "../../utils/translation";
import { checkImageUrl } from "../../utils/table";
import CustomButton from "../../components/ui/CustomButton/CustomButton";
import DeleteButton from "../../components/ui/DeleteButton/DeleteButton";
import StatusColumn from "../../components/ui/StatusColumn/StatusColumn";

export const BREADCRUMBS_ITEMS = [
    {
        title: 'Content Management',
        href: '/content_management/news',
    },
    {
        title: 'News',
        href: '/content_management/news',
    },
];

export const generateColumns = (onEdit: (id: number) => void, onDelete: (id: number) => void) => {
    return [
        {
            title: 'Title',
            key: 'title',
            width: '140px',
            fixed: 'left',
            render: (_: string, record: News) => {
                const dataIndex = generateDataIndexWithCurrentLanguage('title') as keyof News;
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
                        width={88.806}
                        height={89.66}
                        style={{borderRadius: '10px'}}
                    />
                )
            }
        },
        {
            title: 'Short text',
            key: 'small_description',
            width: '200px',
            render: (_: string, record: News) => {
                const dataIndex = generateDataIndexWithCurrentLanguage('small_description') as keyof News;
                return <div className={'smallText'}>{record[dataIndex]}</div>;
            },
        },
        {
            title: 'Date',
            dataIndex: 'created_date',
            key: 'created_date',
            render: (_: string, record: News) => (
                <span>
                   {moment(record?.created_date).format('DD.MM.YYYY')}
                </span>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (_: string, record: News) => (
                <StatusColumn status={record.is_active}/>
            ),
        },
        {
            title: '',
            dataIndex: null,
            key: 'actions',
            width: '40%',
            render: (_: string, record: News) => (
                <div className={'flexEnd'}>
                    <CustomButton click={() => onEdit(record.id)}/>
                    <DeleteButton click={() => onDelete(record.id)}/>
                </div>
            ),
        },
    ];
};

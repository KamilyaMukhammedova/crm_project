import moment from "moment";
import { Vacancy } from "../../types/vacancies";
import { generateDataIndexWithCurrentLanguage } from "../../utils/translation";
import CustomButton from "../../components/ui/CustomButton/CustomButton";
import DeleteButton from "../../components/ui/DeleteButton/DeleteButton";
import StatusColumn from "../../components/ui/StatusColumn/StatusColumn";
import cvListIcon from "../../assets/cv_list_icon.svg";

export const BREADCRUMBS_ITEMS = [
    {
        title: 'Content Management',
        href: '/content_management/vacancies',
    },
    {
        title: 'Vacancies',
        href: '/content_management/vacancies',
    },
];

export const generateColumns = (onEdit: (id: string) => void, onDelete: (id: string) => void, onCvList : (id: string) => void) => {
    return [
        {
            title: 'Title',
            key: 'title',
            fixed: 'left',
            render: (_: string, record: Vacancy) => {
                const dataIndex = generateDataIndexWithCurrentLanguage('title') as keyof Vacancy;
                return <span>{record[dataIndex]}</span>;
            },
        },
        {
            title: 'Short text',
            dataIndex: 'small_description',
            key: 'small_description',
            width: '300px',
            render: (_: string, record: Vacancy) => {
                const dataIndex = generateDataIndexWithCurrentLanguage('small_description') as keyof Vacancy;
                return <div className={'smallText'}>{record[dataIndex]}</div>;
            },
        },
        {
            title: 'Date',
            dataIndex: 'created_date',
            key: 'created_date',
            render: (_: string, record: Vacancy) => (
                <span>
                {moment(record?.created_date).format('DD.MM.YYYY')}
            </span>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (_: string, record: Vacancy) => (
                <StatusColumn status={record?.is_active}/>
            ),
        },
        {
            title: 'Requests',
            dataIndex: 'requests',
            key: 'requests',
        },
        {
            title: '',
            dataIndex: null,
            key: 'actions',
            width: '45%',
            render: (_: string, record: Vacancy) => (
                <div className={'flexEnd'}>
                    {/*<CustomButton*/}
                    {/*    title={'Cv list'}*/}
                    {/*    icon={cvListIcon}*/}
                    {/*    alt={'CV'}*/}
                    {/*    click={() => onCvList(record._id)}*/}
                    {/*/>*/}
                    <CustomButton click={() => onEdit(record._id)}/>
                    <DeleteButton click={() => onDelete(record._id)}/>
                </div>
            ),
        }
    ];
};

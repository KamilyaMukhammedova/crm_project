import moment from "moment/moment";
import { ICv } from "../../types/cv";
import CustomButton from "../../components/ui/CustomButton/CustomButton";
import cvIcon from "../../assets/file_upload_icon.svg";

export const generateBreadcrumbsItems = (vacancyId: string) => {
    return [
        {
            title: 'Content Management',
            href: '/content_management/vacancies',
        },
        {
            title: 'Vacancies',
            href: '/content_management/vacancies',
        },
        {
            title: 'Cv list',
            href: `/content_management/vacancies/${vacancyId}/cv_list`,
        },
    ];
};

export const generateColumns = (onCv: (id: number) => void) => {
    return [
        {
            title: 'Full name',
            dataIndex: 'full_name',
            key: 'full_name',
            fixed: 'left',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone number',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Created by',
            key: 'created_by',
            render: (_: string, record: ICv) => (
                <span>{record.created_by?.full_name}</span>
            ),
        },
        {
            title: 'Date',
            dataIndex: 'created_date',
            key: 'created_date',
            render: (_: string, record: ICv) => (
                <span>
                {moment(record?.created_date).format('DD.MM.YYYY')}
            </span>
            ),
        },
        {
            title: '',
            dataIndex: null,
            key: 'actions',
            width: '30%',
            render: (_: string, record: ICv) => (
                <div className={'flexEnd'}>
                    <CustomButton
                        title={'Details'}
                        icon={cvIcon}
                        alt={'CV'}
                        click={() => onCv(record.id)}
                    />
                </div>
            ),
        },
    ];
};
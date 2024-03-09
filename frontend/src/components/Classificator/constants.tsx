import moment from "moment/moment";
import { IClassificator } from "../../types/classificators";
import CustomButton from "../ui/CustomButton/CustomButton";
import DeleteButton from "../ui/DeleteButton/DeleteButton";

const SIZE_QUERY_TYPE_NAME = 'size';
const CITY_QUERY_TYPE_NAME = 'city';

const actionsColumn = {
    title: '',
    dataIndex: null,
    key: 'actions',
    width: '40%',
    render: () => (
        <div className={'flexEnd'}>
            <CustomButton isDisabled/>
            <DeleteButton isDisabled/>
        </div>
    ),
};

const basicColumns = [
    {
        title: 'Source Code',
        dataIndex: 'code',
        key: 'code',
        fixed: 'left',
    },
    {
        title: 'Name (Ru)',
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
    },
    {
        title: 'Name (En)',
        dataIndex: 'name_en',
        key: 'name_en',
    },
];

const sizeClassificatorColumns = [
    {
        title: 'Size Code',
        dataIndex: 'size_code',
        key: 'size_code',
        fixed: 'left',
    },
    {
        title: 'Barcode',
        dataIndex: 'barcode',
        key: 'barcode',
    },
    {
        title: 'Size',
        dataIndex: 'size',
        key: 'size',
    },
    actionsColumn,
];

export const CLASSIFICATORS_REGULAR_COLUMNS = [
    ...basicColumns,
    {
        title: 'Created Date',
        dataIndex: 'created_date',
        key: 'created_date',
        render: (_: string, record: IClassificator) => (
            <span>
                {record?.created_date ? moment(record?.created_date).format('DD.MM.YYYY') : ''}
            </span>
        ),
    },
    {
        title: 'Updated Date',
        dataIndex: 'modified_date',
        key: 'modified_date',
        render: (_: string, record: IClassificator) => (
            <span>
                {record?.modified_date ? moment(record?.modified_date).format('DD.MM.YYYY') : ''}
            </span>
        ),
    },
    actionsColumn,
];

export const CLASSIFICATORS_OTHER_COLUMNS = {
    [SIZE_QUERY_TYPE_NAME]: sizeClassificatorColumns,
    [CITY_QUERY_TYPE_NAME]: [...basicColumns, actionsColumn],
};

export const getBreadcrumbsItems = (classificatorPath: string, classificatorName: string) => {
    return [
        {
            title: 'Catalog',
            href: `/catalog/mops_and_attributes/${classificatorPath}`,
        },
        {
            title: 'MOPs & Attributes',
            href: `/catalog/mops_and_attributes/${classificatorPath}`,
        },
        {
            title: classificatorName,
            href: `/catalog/mops_and_attributes/${classificatorPath}`,
        },
    ];
};


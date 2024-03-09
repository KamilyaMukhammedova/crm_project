import { IBlackListItem, IProductCategoryOrDepartment } from "../../types/blackList";
import { generateDataIndexWithCurrentLanguage } from "../../utils/translation";
import DeleteButton from "../../components/ui/DeleteButton/DeleteButton";
import StatusColumn from "../../components/ui/StatusColumn/StatusColumn";
import ColorColumn from "../../components/ui/ColorColumn/ColorColumn";

export const BREADCRUMBS_ITEMS = [
    {
        title: 'Administration',
        href: '/administration/black_list',
    },
    {
        title: 'Black list',
        href: '/administration/black_list',
    },
];

export const blackListBasicColumns = [
    {
        title: 'Product name',
        dataIndex: ['product', 'title'],
        key: 'title',
        fixed: 'left',
    },
    {
        title: 'Article',
        dataIndex: ['product', 'model'],
        key: 'model',
        fixed: 'left',
    },
    {
        title: 'Category',
        key: 'category',
        render: (_: string, record: IBlackListItem) => {
            const dataIndex = generateDataIndexWithCurrentLanguage('name') as keyof IProductCategoryOrDepartment;
            const product = record.product;
            return <span>{product.category?.[dataIndex] ? product.category[dataIndex] : product.category?.name}</span>;
        },
    },
    {
        title: 'Department',
        key: 'department',
        render: (_: string, record: IBlackListItem) => {
            const dataIndex = generateDataIndexWithCurrentLanguage('name') as keyof IProductCategoryOrDepartment;
            const product = record.product;
            return <span>{product.department?.[dataIndex] ? product.department[dataIndex] : product.department?.name}</span>;
        },
    },
    {
        title: 'Compound',
        dataIndex: ['product', 'compound'],
        key: 'compound',
    },
    {
        title: 'Bestseller',
        key: 'is_hit',
        render: (_: string, record: IBlackListItem) => (
            <StatusColumn status={record.product?.is_hit} isBestsellerStatus={true}/>
        ),
    },
    {
        title: 'Color',
        key: 'color',
        render: (_: string, record: IBlackListItem) => (
            <ColorColumn
                colorRgb={record.product_color?.color}
                title={record.product_color?.title}
            />
        ),
    },
    {
        title: 'Cost',
        key: 'cost',
        render: (_: string, record: IBlackListItem) => (
            <span>{record.product.price} uzs</span>
        ),
    },
];

export const generateBlackListActionsColumns = (onDelete: (id: number) => void, removeBtnTitle: string, isDisabled = false) => {
    return [
        {
            title: '',
            dataIndex: null,
            key: 'actions',
            width: '20%',
            render: (_: string, record: IBlackListItem) => (
                <div className={'flexEnd'}>
                    <DeleteButton
                        title={`Remove from ${removeBtnTitle}`}
                        click={() => onDelete(record.id)}
                        isDisabled={isDisabled}
                    />
                </div>
            ),
        }
    ];
};

export const generateColumns = (onDelete: (id: number) => void) => {
    return [
        ...blackListBasicColumns,
        ...generateBlackListActionsColumns(onDelete, 'Black list'),
    ];
};

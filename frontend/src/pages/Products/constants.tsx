import { IProduct } from "../../types/products";
import { IProductCategoryOrDepartment } from "../../types/blackList";
import { generateDataIndexWithCurrentLanguage } from "../../utils/translation";
import CustomButton from "../../components/ui/CustomButton/CustomButton";
import DeleteButton from "../../components/ui/DeleteButton/DeleteButton";
import StatusColumn from "../../components/ui/StatusColumn/StatusColumn";
import bestsellerIcon from "../../assets/fire_icon.svg";

export const BREADCRUMBS_ITEMS = [
    {
        title: 'Catalog',
        href: '/catalog/products',
    },
    {
        title: 'Products',
        href: '/catalog/products',
    },
];

export const generateColumns = (onAddToBestsellers: (id: string) => void) => {
    return [
        {
            title: 'Product name',
            dataIndex: 'title',
            key: 'title',
            fixed: 'left',
        },
        {
            title: 'Article',
            dataIndex: 'model',
            key: 'model',
            fixed: 'left',
        },
        {
            title: 'Category',
            key: 'category',
            render: (_: string, record: IProduct) => {
                const dataIndex = generateDataIndexWithCurrentLanguage('name') as keyof IProductCategoryOrDepartment;
                return <span>{record.category?.[dataIndex] ? record.category[dataIndex] : record.category?.name}</span>;
            },
        },
        {
            title: 'Department',
            key: 'department',
            render: (_: string, record: IProduct) => {
                const dataIndex = generateDataIndexWithCurrentLanguage('name') as keyof IProductCategoryOrDepartment;
                return <span>{record.department?.[dataIndex] ? record.department[dataIndex] : record.department?.name}</span>;
            },
        },
        {
            title: 'Compound',
            dataIndex: 'compound',
            key: 'compound',
        },
        {
            title: 'Bestseller',
            key: 'is_hit',
            render: (_: string, record: IProduct) => (
                <StatusColumn status={record.is_hit} isBestsellerStatus={true}/>
            ),
        },
        {
            title: 'Cost',
            key: 'cost',
            render: (_: string, record: IProduct) => (
                <span>
                    {record.price} uzs
                </span>
            ),
        },
        {
            title: '',
            dataIndex: null,
            key: 'actions',
            width: '30%',
            render: (_: string, record: IProduct) => (
                <div className={'flexEnd'}>
                    <CustomButton
                        click={() => onAddToBestsellers(record._id)}
                        icon={bestsellerIcon}
                        title={'Add to Bestseller'}
                        alt={'Fire'}
                    />
                    <CustomButton isDisabled/>
                    <DeleteButton isDisabled/>
                </div>
            ),
        }
    ];
};
import { Image } from 'antd';
import { IBestseller, ICollectionBestseller } from "../../types/bestsellers";
import { generateDataIndexWithCurrentLanguage } from "../../utils/translation";
import CustomButton from "../../components/ui/CustomButton/CustomButton";
import DeleteButton from "../../components/ui/DeleteButton/DeleteButton";
import noImage from "../../assets/no_image.svg";

export const BREADCRUMBS_ITEMS = [
    {
        title: 'Content Management',
        href: '/content_management/bestsellers',
    },
    {
        title: 'Bestsellers',
        href: '/content_management/bestsellers',
    },
];

export const COLUMNS = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        width: '140px',
        fixed: 'left',
    },
    {
        title: 'Image',
        dataIndex: 'preview',
        key: 'preview',
        fixed: 'left',
        render: (text: string) => {
            return (
                <Image
                    src={text ? process.env.REACT_APP_API_URL + text : noImage}
                    width={75}
                    height={96}
                    style={{borderRadius: '10px'}}
                />
            )
        }
    },
    {
        title: 'Category',
        dataIndex: ['category', 'name'],
        key: 'category',
    },
    {
        title: 'Department',
        dataIndex: ['department', 'name'],
        key: 'department',
    },
    {
        title: 'Collection',
        dataIndex: 'collections',
        key: 'collections',
        render: (_: string, record: IBestseller) => (
            <>
                {record.collections.length > 0 && record.collections.map(item => {
                    const dataIndex = generateDataIndexWithCurrentLanguage('title') as keyof ICollectionBestseller;
                    return <div key={item.id}>{item[dataIndex]}</div>;
                })}
            </>
        ),
    },
    {
        title: '',
        dataIndex: null,
        key: 'actions',
        width: '30%',
        render: () => (
            <div className={'flexEnd'}>
                <CustomButton isDisabled/>
                <DeleteButton isDisabled/>
            </div>
        ),
    }
];



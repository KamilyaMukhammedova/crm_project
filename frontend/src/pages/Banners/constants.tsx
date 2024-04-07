import { Image } from "antd";
import { IBanner } from "../../types/banners";
import { renderImage } from "../../utils/basic";
import CustomButton from "../../components/ui/CustomButton/CustomButton";
import DeleteButton from "../../components/ui/DeleteButton/DeleteButton";

export const BREADCRUMBS_ITEMS = [
    {
        title: 'Content Management',
        href: '/content_management/banners',
    },
    {
        title: 'Banners',
        href: '/content_management/banners',
    },
];

export const generateColumns = (onEdit: (id: string) => void, onDelete: (id: string) => void) => {
    return [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            width: '450px',
            fixed: 'left',
            render: (img: string) => (
                <Image
                    src={renderImage(img)}
                    width={'300px'}
                    height={'auto'}
                    style={{borderRadius: '10px'}}
                />
            ),
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: '',
            dataIndex: null,
            key: 'actions',
            width: '40%',
            render: (_: string, record: IBanner) => (
                <div className={'flexEnd'}>
                    <CustomButton click={() => onEdit(record._id)}/>
                    <DeleteButton click={() => onDelete(record._id)}/>
                </div>
            ),
        },
    ];
};
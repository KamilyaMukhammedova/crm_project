import { IUserPurchaseItem } from "../../../types/users";

export const generateBreadCrumbs = (userId: string, userPhoneNumber: string, purchaseId: string) => {
    return [
        {
            title: 'Users and Accounts',
            href: '/users_and_accounts/users',
        },
        {
            title: 'Users',
            href: '/users_and_accounts/users',
        },
        {
            title: userPhoneNumber,
            href: `/users_and_accounts/users/${userId}/${userPhoneNumber}/purchases`,
        },
        {
            title: purchaseId,
            href: `/users_and_accounts/users/${userId}/${userPhoneNumber}/purchases/${purchaseId}`,
        },
    ];
};

export const COLUMNS = [
    {
        title: 'Barcode',
        dataIndex: 'barcode',
        key: 'barcode',
        fixed: 'left',
    },
    {
        title: 'Category',
        dataIndex: ['product', 'category', 'name'],
        key: 'category',
    },
    {
        title: 'Department',
        dataIndex: ['product', 'department', 'name'],
        key: 'department',
    },
    {
        title: 'Price',
        key: 'price',
        render: (_: string, record: IUserPurchaseItem) => (
            <span>{record.price} uzs</span>
        ),
    },
    {
        title: 'Color',
        dataIndex: 'product_color',
        key: 'product_color',
    },
    {
        title: 'Size',
        dataIndex: 'size',
        key: 'size',
    },
    {
        title: 'Bonuses',
        dataIndex: 'bonus_item',
        key: 'bonus',
    },
];
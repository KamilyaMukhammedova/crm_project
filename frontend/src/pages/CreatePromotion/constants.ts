export const getBreadcrumbsItems = (promotionId: string) => {
    return [
        {
            title: 'Content Management',
            href: '/content_management/promotions',
        },
        {
            title: 'Promotions & Discounts',
            href: '/content_management/promotions',
        },
        {
            title: `${!promotionId ? 'Create' : 'Edit'} Discount`,
            href: !promotionId ? '/content_management/create_promotion' : `/content_management/edit_promotion/${promotionId}`,
        },
    ];
};




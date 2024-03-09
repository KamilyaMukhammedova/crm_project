export const getBreadcrumbsItems = (newsdId: string) => {
    return [
        {
            title: 'Content Management',
            href: '/content_management/news',
        },
        {
            title: 'News',
            href: '/content_management/news',
        },
        {
            title: `${!newsdId ? 'Create' : 'Edit'} News`,
            href: !newsdId ? '/content_management/create_news' : `/content_management/edit_news/${newsdId}`,
        },
    ];
};





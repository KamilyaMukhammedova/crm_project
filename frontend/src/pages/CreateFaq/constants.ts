export const getBreadcrumbsItems = (faqId: string) => {
    return [
        {
            title: 'Administration',
            href: '/administration/faq',
        },
        {
            title: 'FAQ',
            href: '/administration/faq',
        },
        {
            title: `${!faqId ? 'Create' : 'Edit'} FAQ`,
            href: !faqId ? '/administration/create_faq' : `/administration/edit_faq/${faqId}`,
        },
    ];
};
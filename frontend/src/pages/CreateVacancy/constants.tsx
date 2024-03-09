export const getBreadcrumbsItems = (vacancyId: string) => {
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
            title: `${!vacancyId ? 'Create' : 'Edit'} Vacancy`,
            href: !vacancyId ? '/content_management/create_vacancy' : `/content_management/edit_vacancy/${vacancyId}`,
        },
    ];
};



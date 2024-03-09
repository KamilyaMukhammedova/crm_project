export const checkImageUrl = (url: string) => {
    if (url) {
        const mediaIndex = url.indexOf('media');

        if (mediaIndex !== -1) {
            const secondMediaIndex = url.indexOf('media', mediaIndex + 1);
            if (secondMediaIndex !== -1) {
                return url.replace('/media/media/', '/media/');
            }
        }

        return url;
    }
};

export const renderRoleColumn = (userType: number) => {
    const roles: { [key: string]: string } = {
        "1": 'Admin',
        "2": 'Client',
    };

    return roles[userType.toString()];
};






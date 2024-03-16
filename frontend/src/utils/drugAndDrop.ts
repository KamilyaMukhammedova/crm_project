export const getImagePathFromUrl = (url: string) => {
    if(url.includes('/media/')) {
        const urlToArray = url.split('/');

        return urlToArray[urlToArray.length - 1];
    } else {
        return url;
    }
};

export const truncateFileName = (fileName: string, maxLength: number) => {
    const requiredName = getImagePathFromUrl(fileName);

    if (requiredName.length > maxLength) {
        const truncatedPart = requiredName.slice(-maxLength + 1);
        return `...${truncatedPart}`;
    }

    return requiredName;
};

// export const checkAndRenderImageUrl = (url: string) => {
//     const baseUrl = process.env.REACT_APP_API_URL;
//
//     if(baseUrl) {
//         if (url.includes('/media/media/')) {
//             return baseUrl + url.replace('/media/media/', '/media/');
//         } else if (url.includes('/media/')) {
//             return baseUrl + url;
//         } else if(!url.startsWith('/media')) {
//             return baseUrl + '/media/' + url;
//         }
//     }
// };

export const checkAndRenderImageUrl = (url: string) => {
    const baseUrl = process.env.REACT_APP_API_URL;

    if(baseUrl) {
        // if (url.includes('/media/media/')) {
        //     return baseUrl + url.replace('/media/media/', '/media/');
        // } else if (url.includes('/media/')) {
        //     return baseUrl + url;
        // } else if(!url.startsWith('/media')) {
        //     return baseUrl + '/media/' + url;
        // }
        return baseUrl + url;
    }
};
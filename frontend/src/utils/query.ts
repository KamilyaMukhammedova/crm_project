export const pageIsNotFirst = (query: string | null) => {
    if (query) {
        const pageNumberMatch = query.match(/\d+/);

        if (pageNumberMatch) {
            const pageNumber = parseInt(pageNumberMatch[0]);

            return pageNumber !== 1;
        }
    }
    return false;
};

export const getPreviousPageQuery = (query: string | null) => {
    if (query) {
        const pageNumberMatch = query.match(/\d+/);

        if (pageNumberMatch) {
            const pageNumber = parseInt(pageNumberMatch[0]);
            return '?page=' + (pageNumber - 1).toString();
        }
    }
    return '';
};

export const setNewQuery = (key: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, value);

    let queryParams = `?`;
    searchParams.forEach((value, key) => {
        queryParams += `${key}=${value}&`;
    });

    window.history.pushState({path: queryParams}, '', queryParams);
};
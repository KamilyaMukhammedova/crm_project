export const getPercentage = (part: number | undefined, total: number | undefined) => {
    if (part && total) {
        return (part / total) * 100;
    } else {
        return 0;
    }
};

export const getSpacesForDecimalNum = (num: number | undefined) => {
    if (num) {
        const numberString = num.toString();

        return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    } else {
        return 0;
    }
};

export const renderImage = (key: string) => {
    const s3Url = process.env.REACT_APP_AWS_BUCKET;

    if(s3Url) {
        return s3Url + key;
    }
};
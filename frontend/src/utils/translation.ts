type ValidKeys = 'Users' | 'Active';

export const generatePluralOrSingular = (num: number, defaultKeyName: ValidKeys) => {
    const languageFromUrl = new URLSearchParams(window.location.search).get('lang') || 'en';

    const russianTranslations: Record<ValidKeys, string[]> = {
        Users: ['Пользователь', 'Пользователя', 'Пользователей'],
        Active: ['Активен', 'Активных', 'Активных'],
    };

    if (languageFromUrl === 'ru' && russianTranslations[defaultKeyName]) {
        const [singular, plural1, plural2] = russianTranslations[defaultKeyName];

        if (num % 10 === 1 && num % 100 !== 11) {
            return singular;
        } else if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)) {
            return plural1;
        } else {
            return plural2;
        }
    } else {
        return defaultKeyName;
    }
};

export const generateDataIndexWithCurrentLanguage = (baseKeyName: string) => {
    const languageFromUrl = new URLSearchParams(window.location.search).get('lang') || 'en';

    return `${baseKeyName}_${languageFromUrl}`;
};

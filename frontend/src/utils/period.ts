export const isStartDateBeforeEndDate = (startDate: string | undefined, endDate: string | undefined) => {
    if(startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return start < end;
    }
};

export const validatePeriod = (startDate: string | undefined, endDate: string | undefined) => {
    if(startDate && endDate && !isStartDateBeforeEndDate(startDate, endDate)) {
        return false;
    }

    if(startDate && endDate && isStartDateBeforeEndDate(startDate, endDate)) {
        return true;
    }
};
import React, { FC, useEffect } from 'react';
import dayjs from 'dayjs';
import { DatePicker } from "antd";
import { FORM_REQUIRED_MESSAGES } from "../../constants/form";
import FormItemError from "../ui/FormItemError/FormItemError";
import styles from "./Period.module.scss";

interface IProps {
    checkRequiredFields: boolean,
    getPeriodState: (value: string, name: string) => void,
    periodError: string | null | undefined,
    setPeriodError: React.Dispatch<React.SetStateAction<string | null>> | undefined,
    startDateFromParent: string | undefined,
    endDateFromParent: string | undefined,
}

const Period: FC<IProps> = ({
                                checkRequiredFields,
                                getPeriodState,
                                periodError,
                                setPeriodError,
                                startDateFromParent,
                                endDateFromParent
                            }) => {
    const isPeriodEmpty = checkRequiredFields && (Boolean(!startDateFromParent) || Boolean(!endDateFromParent));

    useEffect(() => {
        if (startDateFromParent && endDateFromParent && (startDateFromParent > endDateFromParent)) {
            setPeriodError && setPeriodError('Period is wrong!');
        } else {
            setPeriodError && setPeriodError(null);
        }
    }, [startDateFromParent, endDateFromParent]);

    return (
        <div className={[styles.period, isPeriodEmpty ? styles.period_wrongPeriod : ''].join(' ')}>
            <p>Date</p>
            <div className={styles.period__datePickerWrapper}>
                <DatePicker
                    value={startDateFromParent ? dayjs(startDateFromParent) : null}
                    onChange={(date) => getPeriodState(date ? date?.format('YYYY-MM-DD') : '', 'start_date')}
                    placeholder={'Start date'}
                    suffixIcon={null}
                    className={'input'}
                    status={periodError ? 'error' : ''}
                    style={{width: '100%'}}
                />
                <div className={styles.period__divider}/>
                <DatePicker
                    value={endDateFromParent ? dayjs(endDateFromParent) : null}
                    onChange={(date) => getPeriodState(date ? date?.format('YYYY-MM-DD') : '', 'end_date')}
                    placeholder={'End date'}
                    suffixIcon={null}
                    className={'input'}
                    status={periodError ? 'error' : ''}
                    style={{width: '100%'}}
                />
            </div>
            <FormItemError errorType={'error'} errorTitle={periodError ? periodError : ''} restProps={[Boolean(periodError)]}/>
            <FormItemError errorType={'error'} errorTitle={FORM_REQUIRED_MESSAGES.period} restProps={[isPeriodEmpty]}/>
        </div>
    );
};

export default Period;

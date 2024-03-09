import React, { FC } from 'react';
import { useTranslation } from "react-i18next";
import { Table, TableProps } from "antd";

interface IProps {
    dataSource: any[],
    columns: { title: string, dataIndex?: string, key: string, render?: any }[],
    style?: { [key: string]: string | number },
    scroll?: { [key: string]: string | number },
    rowKey?: string | ((record: any) => string),
    onRow?: TableProps<any>['onRow'],
}

const BasicTable: FC<IProps> = ({
                                    dataSource,
                                    columns,
                                    style,
                                    scroll,
                                    rowKey,
                                    onRow,
                                }) => {
    const {t} = useTranslation();

    const translatedColumns = columns.map(column => {
        return {
            ...column,
            title: column.title ? t(column.title) : column.title,
        };
    });

    return (
        <div className={'basicTable'}>
            <Table
                pagination={false}
                dataSource={dataSource}
                columns={translatedColumns}
                style={style}
                scroll={scroll}
                rowKey={rowKey}
                onRow={onRow}
                rowClassName={() => 'tableRow'}
            />
        </div>
    );
};

export default BasicTable;
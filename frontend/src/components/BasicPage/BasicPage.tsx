import React, { FC, PropsWithChildren } from 'react';
import { useTranslation } from "react-i18next";
import { Empty } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { IBreadcrumbsItem } from "../../types/basic";
import Breadcrumbs from "../ui/Breadcrumbs/Breadcrumbs";
import AccentButton from "../ui/AccentButton/AccentButton";
import MiniLoader from "../ui/MiniLoader/MiniLoader";
import BasicTable from "../BasicTable/BasicTable";
import Pagination from "../Pagination/Pagination";
import ErrorMessage from "../ui/ErrorMessage/ErrorMessage";
import MainLoader from "../ui/MainLoader/MainLoader";
import Search from "../Search/Search";

interface IProps {
    breadcrumbItems: IBreadcrumbsItem[],
    data: any[],
    totalItems: number,
    fetching: boolean,
    onPagination: (query: string) => void,
    columns?: any[],
    isCreateBtnDisabled?: boolean,
    createBtnIsNotRequired?: boolean,
    createBtnTitle?: string,
    errorMsg?: string,
    onCreate?: () => void,
    searchIsRequired?: boolean,
    onSearchConfirm?: (value: string) => void;
    defaultContentTable?: boolean,
}

const BasicPage: FC<PropsWithChildren<IProps>> = ({
                                                      breadcrumbItems,
                                                      data,
                                                      totalItems,
                                                      fetching,
                                                      onPagination,
                                                      columns,
                                                      isCreateBtnDisabled,
                                                      createBtnIsNotRequired,
                                                      createBtnTitle,
                                                      errorMsg,
                                                      onCreate,
                                                      searchIsRequired = false,
                                                      onSearchConfirm,
                                                      defaultContentTable = true,
                                                      children,
                                                  }) => {
    const {t} = useTranslation();

    return (
        <>
            {fetching && <MainLoader/>}
            <div className={'basicPage'}>
                <div className={'topBlock'}>
                    <Breadcrumbs items={breadcrumbItems}/>
                    {
                        !createBtnIsNotRequired &&
                        <AccentButton
                            title={!createBtnTitle ? 'Create' : createBtnTitle}
                            click={onCreate}
                            isDisabled={isCreateBtnDisabled}
                        >
                            <PlusOutlined/>
                        </AccentButton>
                    }
                </div>
                {
                    (searchIsRequired && onSearchConfirm) &&
                    <Search onSearchConfirm={onSearchConfirm} filterRequired={false}/>
                }
                {/*<>*/}
                {/*    {fetching && <MiniLoader/>}*/}
                {/*    {*/}
                {/*        (!fetching && !errorMsg && data?.length > 0) &&*/}
                {/*        <>*/}
                {/*            <BasicTable*/}
                {/*                dataSource={data}*/}
                {/*                columns={columns || []}*/}
                {/*                scroll={{x: 'max-content'}}*/}
                {/*                rowKey={(record) => record.id}*/}
                {/*            />*/}
                {/*            <Pagination*/}
                {/*                onChangePage={onPagination}*/}
                {/*                itemsCountPerPage={10}*/}
                {/*                totalItems={totalItems}*/}
                {/*            />*/}
                {/*        </>*/}
                {/*    }*/}
                {/*    {!fetching && !errorMsg && data?.length === 0 &&*/}
                {/*        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{marginTop: '5rem'}}/>}*/}
                {/*    {!fetching && errorMsg && <ErrorMessage errorMsg={errorMsg}/>}*/}
                {/*</>*/}

                <>
                    {fetching && <MiniLoader/>}
                    {
                        (!fetching && !errorMsg && data?.length > 0) &&
                        <>
                            {
                                defaultContentTable ?
                                    <BasicTable
                                        dataSource={data}
                                        columns={columns || []}
                                        scroll={{x: 'max-content'}}
                                        rowKey={(record) => record._id}
                                    /> :
                                    children
                            }
                            <Pagination
                                onChangePage={onPagination}
                                itemsCountPerPage={10}
                                totalItems={totalItems}
                            />
                        </>
                    }
                    {
                        !fetching && !errorMsg && data?.length === 0 &&
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={t(new URLSearchParams(window.location.search).get('search') ? 'No search results' : 'No data')}
                            style={{marginTop: '5rem'}}
                        />
                    }
                    {!fetching && errorMsg && <ErrorMessage errorMsg={errorMsg}/>}
                </>
            </div>
        </>
    );
};

export default BasicPage;
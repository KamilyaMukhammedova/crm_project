import React, { FC, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface IProps {
    onChangePage: (query: string) => void;
    itemsCountPerPage: number;
    totalItems: number;
}

const Pagination: FC<IProps> = ({
                                    onChangePage,
                                    itemsCountPerPage,
                                    totalItems,
                                }) => {
    const pageCount = itemsCountPerPage && totalItems ? Math.ceil(totalItems / itemsCountPerPage) : 0;

    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const pageFromUrl = Number(new URLSearchParams(window.location.search).get('page')) || 1;
        setCurrentPage(Math.min(Math.max(0, pageFromUrl - 1), pageCount - 1));
    }, [pageCount]);

    const setPageToURL = (page: number) => {
        const validatedPage = Math.min(Math.max(page, 1), pageCount) - 1;
        setCurrentPage(validatedPage);

        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('page', String(validatedPage + 1));

        let languageQueryParams = ``;
        let actionQueryParams = `?`;

        searchParams.forEach((value, key) => {
            if (key !== 'lang') {
                actionQueryParams += `${key}=${value}&`;
            } else {
                languageQueryParams += `${key}=${value}&`;
            }
        });

        window.history.pushState(
            {path: actionQueryParams + languageQueryParams},
            '',
            actionQueryParams + languageQueryParams
        );

        onChangePage(actionQueryParams);
    };

    const handlePageChange = (selectedObject: { selected: number }) => {
        setPageToURL(selectedObject.selected + 1);
    };

    return (
        <div className={'paginationWrapper'}>
            {pageCount > 1 && (
                <ReactPaginate
                    previousLabel={<LeftOutlined style={{color: '#373737', fontSize: '12px'}}/>}
                    nextLabel={<RightOutlined style={{color: '#373737', fontSize: '12px'}}/>}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={pageCount}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    activeClassName={'active'}
                    previousClassName={'previous'}
                    nextClassName={'next'}
                    previousLinkClassName={'page-link'}
                    nextLinkClassName={'page-link'}
                    forcePage={currentPage}
                />
            )}
        </div>
    );
};

export default Pagination;

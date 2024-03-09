import React, { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { message } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { BasicPageProps, useBasicPage } from "../../hooks/useBasicPage";
import { useDelete } from "../../hooks/useDelete";
import {
    createUniqueListItemAction,
    deleteUniqueListItemAction,
    fetchUniqueListAction
} from "../../store/uniqueList/UniqueListActions";
import { fetchBlackListProductsAction } from "../../store/blackList/BlackListActions";
import { IBlackListProduct } from "../../types/blackList";
import { ICreatedUniqueListItem } from "../../types/uniqueList";
import { navigateToFirstAndFetch } from "../../utils/navigateToPage";
import { BREADCRUMBS_ITEMS, generateColumns } from "./constants";
import { FORM_ERROR_MESSAGES, FORM_SUCCESS_MESSAGES } from "../../constants/form";
import BasicPage from "../../components/BasicPage/BasicPage";
import ModalWindow from "../../components/ui/ModalWindow/ModalWindow";
import UniqueListAddForm from "../../components/Forms/UniqueListAddForm/UniqueListAddForm";

const UniqueList: FC = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const {productsData} = useAppSelector(state => state.blackListReducer);
    const {createFetching} = useAppSelector(state => state.uniqueListReducer);

    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [checkRequiredFields, setCheckRequiredFields] = useState(false);
    const [addError, setAddError] = useState('');
    const [percent, setPercent] = useState(0);

    const [selectedProduct, setSelectedProduct] = useState<IBlackListProduct | null>(null);
    const [selectedProductColorId, setSelectedProductColorId] = useState<number | null>(null);

    const pageProps = useBasicPage(
        fetchUniqueListAction,
        state => state.uniqueListReducer,
        'unique_list',
        false,
        false,
    ) as BasicPageProps;

    const deleteProps = useDelete(fetchUniqueListAction, state => state.uniqueListReducer);

    const fetchProducts = useCallback(async () => {
        await dispatch(fetchBlackListProductsAction());
    }, []);

    useEffect(() => {
        void fetchProducts();
    }, []);

    const onDeleteConfirm = async () => {
        await deleteProps.onDelete({
            deleteAction: deleteUniqueListItemAction,
            currentPage: pageProps.currentPage,
            setCurrentPage: pageProps.setCurrentPage,
        });
    };

    const onAddConfirm = async () => {
        if (selectedProduct && selectedProductColorId) {
            const newUniqueListItem: ICreatedUniqueListItem = {
                product_id: selectedProduct.id,
                product_color_id: selectedProductColorId,
                percent: percent,
            };

            await dispatch(createUniqueListItemAction(newUniqueListItem)).unwrap()
                .then(async () => {
                    setAddError('');
                    setSelectedProduct(null);
                    setSelectedProductColorId(null);
                    setPercent(0);
                    setIsModalAddOpen(false);

                    await navigateToFirstAndFetch(pageProps.setCurrentPage, dispatch, fetchUniqueListAction);
                    message.success(t(FORM_SUCCESS_MESSAGES.unique_list));
                })
                .catch((rejectedValueOrSerializedError) => {
                    setAddError(rejectedValueOrSerializedError.message);
                });

            setCheckRequiredFields(false);
        } else {
            setCheckRequiredFields(true);
            message.error(t(FORM_ERROR_MESSAGES.fields_required));
        }
    };

    const onSearchConfirm = async (query: string) => {
        pageProps.setCurrentPage('?page=1&');

        await dispatch(fetchUniqueListAction(query));
    };

    const onAddToUniqueList = () => {
        setIsModalAddOpen(true);
        setAddError('');
    };

    const closeModalAdd = () => {
        setIsModalAddOpen(false);
        setCheckRequiredFields(false);
    };

    return (
        <>
            <BasicPage
                fetching={pageProps.fetching}
                breadcrumbItems={BREADCRUMBS_ITEMS}
                onCreate={onAddToUniqueList}
                data={pageProps.data && pageProps.data.results}
                columns={generateColumns(deleteProps.openDeleteModal)}
                totalItems={pageProps.data && pageProps.data.count}
                onPagination={pageProps.onPagination}
                createBtnTitle={'Add to Unique list'}
                errorMsg={pageProps.error}
                searchIsRequired={true}
                onSearchConfirm={onSearchConfirm}
            />
            <ModalWindow
                isModalOpen={deleteProps.isModalDeleteOpen}
                onCancel={deleteProps.closeDeleteModal}
                onConfirm={onDeleteConfirm}
                okBtnTitle={'Remove'}
                title={'Are you sure to remove from Unique list?'}
                loading={deleteProps.deleteFetching}
                error={deleteProps.deleteError}
            />
            <UniqueListAddForm
                isModalOpen={isModalAddOpen}
                onCancel={closeModalAdd}
                onConfirm={onAddConfirm}
                loading={createFetching}
                productsData={productsData}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                percent={percent}
                setPercent={setPercent}
                selectedProductColorId={selectedProductColorId}
                setSelectedProductColorId={setSelectedProductColorId}
                uniqueListItems={pageProps.data ? pageProps.data.results : []}
                checkRequiredFields={checkRequiredFields}
                error={addError}
            />
        </>
    );
};

export default UniqueList;
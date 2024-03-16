import React, { FC, useState } from 'react';
import { useTranslation } from "react-i18next";
import { message } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { BasicPageCreateEditProps, useBasicPage } from "../../hooks/useBasicPage";
import { BREADCRUMBS_ITEMS, generateColumns } from "./constants";
import { IProductInBestsellers } from "../../types/products";
import { addProductToBestsellersAction, fetchProductsListAction } from "../../store/products/ProductsActions";
import BasicPage from "../../components/BasicPage/BasicPage";
import ProductAddToBestsellersForm
    from "../../components/Forms/ProductAddToBestsellersForm/ProductAddToBestsellersForm";

const Products: FC = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const pageProps = useBasicPage(
        fetchProductsListAction,
        state => state.productsReducer,
        'products',
        false,
        true
    ) as BasicPageCreateEditProps;

    const {addToBestsellersFetching} = useAppSelector(state => state.productsReducer);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [addToBestsellersError, setAddToBestsellersError] = useState('');
    const [currentProductId, setCurrentProductId] = useState<string | null>(null);
    const [selectedCollections, setSelectedCollections] = useState<{ [key: string]: boolean } | null>(null);

    const onSearchConfirm = async (query: string) => {
        pageProps.setCurrentPage('?page=1&');
        await dispatch(fetchProductsListAction(query));
    };

    const addToBestsellers = (id: string) => {
        setCurrentProductId(id);
        setIsAddModalOpen(true);
        setAddToBestsellersError('');
    };

    const onAddConfirm = async () => {
        if (currentProductId && selectedCollections) {
            const collectionsIdArray = Object.keys(selectedCollections).map(key => {
                if (selectedCollections[key]) {
                    return +key;
                }
            }).filter(Boolean);

            if (collectionsIdArray.length === 0) {
                message.error(t("Choose at least one collection!"));
            } else {
                const newProductInBestsellers: IProductInBestsellers = {
                    product_id: currentProductId,
                    collections: collectionsIdArray,
                };

                await dispatch(addProductToBestsellersAction(newProductInBestsellers)).unwrap()
                    .then(async () => {
                        setAddToBestsellersError('');
                        setCurrentProductId(null);
                        setSelectedCollections(null);
                        setIsAddModalOpen(false);

                        await dispatch(fetchProductsListAction(pageProps.currentPage));
                        message.success(t("Product was successfully added to the bestsellers!"));
                    })
                    .catch((rejectedValueOrSerializedError) => {
                        setAddToBestsellersError(rejectedValueOrSerializedError.message);
                    });
            }
        } else {
            message.error(t("All fields are required!"));
        }
    };

    return (
        <>
            <BasicPage
                fetching={pageProps.fetching}
                breadcrumbItems={BREADCRUMBS_ITEMS}
                onCreate={pageProps.onCreate}
                data={pageProps.data && pageProps.data.results}
                columns={generateColumns(addToBestsellers)}
                totalItems={pageProps.data && pageProps.data.count}
                onPagination={pageProps.onPagination}
                errorMsg={pageProps.error}
                isCreateBtnDisabled={true}
                searchIsRequired={true}
                onSearchConfirm={onSearchConfirm}
            />
            <ProductAddToBestsellersForm
                isModalOpen={isAddModalOpen}
                onCancel={() => setIsAddModalOpen(false)}
                onConfirm={onAddConfirm}
                loading={addToBestsellersFetching}
                selectedCollections={selectedCollections}
                setSelectedCollections={setSelectedCollections}
                error={addToBestsellersError}
            />
        </>
    );
};

export default Products;
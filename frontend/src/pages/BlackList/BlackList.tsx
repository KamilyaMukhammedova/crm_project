// import React, { FC, useCallback, useEffect, useState } from 'react';
// import { useTranslation } from "react-i18next";
// import { message } from "antd";
// import { useAppDispatch, useAppSelector } from "../../hooks/redux";
// import { BasicPageProps, useBasicPage } from "../../hooks/useBasicPage";
// import { useDelete } from "../../hooks/useDelete";
// import { BREADCRUMBS_ITEMS, generateColumns } from "./constants";
// import { FORM_ERROR_MESSAGES, FORM_SUCCESS_MESSAGES } from "../../constants/form";
// import { IBlackListProduct } from "../../types/blackList";
// import { navigateToFirstAndFetch } from "../../utils/navigateToPage";
// import {
//     createBlackListItemAction,
//     deleteBlackListItemAction,
//     fetchBlackListAction,
//     fetchBlackListProductsAction
// } from "../../store/blackList/BlackListActions";
// import BasicPage from "../../components/BasicPage/BasicPage";
// import ModalWindow from "../../components/ui/ModalWindow/ModalWindow";
// import BlackListAddForm from "../../components/Forms/BlackListAddForm/BlackListAddForm";
//
//
// const BlackList: FC = () => {
//     const {t} = useTranslation();
//     const dispatch = useAppDispatch();
//
//     const {createFetching, productsData} = useAppSelector(state => state.blackListReducer);
//
//     const [isModalAddOpen, setIsModalAddOpen] = useState(false);
//     const [checkRequiredFields, setCheckRequiredFields] = useState(false);
//     const [addError, setAddError] = useState('');
//     const [selectedProduct, setSelectedProduct] = useState<IBlackListProduct | null>(null);
//     const [selectedProductColors, setSelectedProductColors] = useState<{ [key: string]: boolean } | null>(null);
//
//     const pageProps = useBasicPage(
//         fetchBlackListAction,
//         state => state.blackListReducer,
//         'black_list',
//         false,
//         false,
//     ) as BasicPageProps;
//
//     const deleteProps = useDelete(fetchBlackListAction, state => state.blackListReducer);
//
//     const fetchProducts = useCallback(async () => {
//         await dispatch(fetchBlackListProductsAction());
//     }, []);
//
//     useEffect(() => {
//         void fetchProducts();
//     }, []);
//
//     const onDeleteConfirm = async () => {
//         await deleteProps.onDelete({
//             deleteAction: deleteBlackListItemAction,
//             currentPage: pageProps.currentPage,
//             setCurrentPage: pageProps.setCurrentPage,
//         });
//     };
//
//     const onAddConfirm = async () => {
//         if (selectedProductColors && selectedProduct) {
//             const colorsIdArray = Object.keys(selectedProductColors).map(key => {
//                 if (selectedProductColors[key]) {
//                     return +key;
//                 }
//             }).filter(Boolean);
//
//             if (colorsIdArray.length === 0) {
//                 message.error(t(FORM_ERROR_MESSAGES.fields_required));
//             } else {
//                 const newBlackListItemData = {
//                     product_id: selectedProduct ? +selectedProduct?.id : '',
//                     product_colors: colorsIdArray,
//                 };
//
//                 await dispatch(createBlackListItemAction(newBlackListItemData)).unwrap()
//                     .then(async () => {
//                         setAddError('');
//                         setSelectedProduct(null);
//                         setSelectedProductColors(null);
//                         setIsModalAddOpen(false);
//
//                         await navigateToFirstAndFetch(pageProps.setCurrentPage, dispatch, fetchBlackListAction);
//                         message.success(t(FORM_SUCCESS_MESSAGES.black_list));
//                     })
//                     .catch((rejectedValueOrSerializedError) => {
//                         setAddError(rejectedValueOrSerializedError.message);
//                     });
//
//                 setCheckRequiredFields(false);
//             }
//         } else {
//             setCheckRequiredFields(true);
//             message.error(t(FORM_ERROR_MESSAGES.fields_required));
//         }
//     };
//
//     const onSearchConfirm = async (query: string) => {
//         pageProps.setCurrentPage('?page=1&');
//
//         await dispatch(fetchBlackListAction(query));
//     };
//
//     const onAddToBlackList = () => {
//         setIsModalAddOpen(true);
//         setAddError('');
//     };
//
//     const closeModalAdd = () => {
//         setIsModalAddOpen(false);
//         setCheckRequiredFields(false);
//     };
//
//     return (
//         <>
//             <BasicPage
//                 fetching={pageProps.fetching}
//                 breadcrumbItems={BREADCRUMBS_ITEMS}
//                 onCreate={onAddToBlackList}
//                 data={pageProps.data && pageProps.data.results}
//                 columns={generateColumns(deleteProps.openDeleteModal)}
//                 totalItems={pageProps.data && pageProps.data.count}
//                 onPagination={pageProps.onPagination}
//                 createBtnTitle={'Add to Black list'}
//                 errorMsg={pageProps.error}
//                 searchIsRequired={true}
//                 onSearchConfirm={onSearchConfirm}
//             />
//             <ModalWindow
//                 isModalOpen={deleteProps.isModalDeleteOpen}
//                 onCancel={deleteProps.closeDeleteModal}
//                 onConfirm={onDeleteConfirm}
//                 okBtnTitle={'Remove'}
//                 title={'Are you sure to remove from Black list?'}
//                 loading={deleteProps.deleteFetching}
//                 error={deleteProps.deleteError}
//             />
//             <BlackListAddForm
//                 isModalOpen={isModalAddOpen}
//                 onCancel={closeModalAdd}
//                 onConfirm={onAddConfirm}
//                 loading={createFetching}
//                 productsData={productsData}
//                 selectedProduct={selectedProduct}
//                 setSelectedProduct={setSelectedProduct}
//                 selectedProductColors={selectedProductColors}
//                 setSelectedProductColors={setSelectedProductColors}
//                 error={addError}
//                 checkRequiredFields={checkRequiredFields}
//             />
//         </>
//     );
// };
//
// export default BlackList;

import React, { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { message } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { BasicPageProps, useBasicPage } from "../../hooks/useBasicPage";
import { useDelete } from "../../hooks/useDelete";
import { BREADCRUMBS_ITEMS, generateColumns } from "./constants";
import { FORM_ERROR_MESSAGES, FORM_SUCCESS_MESSAGES } from "../../constants/form";
import { IBlackListProduct } from "../../types/blackList";
import { navigateToFirstAndFetch } from "../../utils/navigateToPage";
import {
    createBlackListItemAction,
    deleteBlackListItemAction,
    fetchBlackListAction,
    fetchBlackListProductsAction
} from "../../store/blackList/BlackListActions";
import BasicPage from "../../components/BasicPage/BasicPage";
import ModalWindow from "../../components/ui/ModalWindow/ModalWindow";
import BlackListAddForm from "../../components/Forms/BlackListAddForm/BlackListAddForm";


const BlackList: FC = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const {createFetching, productsData} = useAppSelector(state => state.blackListReducer);

    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [checkRequiredFields, setCheckRequiredFields] = useState(false);
    const [addError, setAddError] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<IBlackListProduct | null>(null);
    const [selectedProductColors, setSelectedProductColors] = useState<{ [key: string]: boolean } | null>(null);

    const pageProps = useBasicPage(
        fetchBlackListAction,
        state => state.blackListReducer,
        'black_list',
        false,
        false,
    ) as BasicPageProps;

    const deleteProps = useDelete(fetchBlackListAction, state => state.blackListReducer);

    const fetchProducts = useCallback(async () => {
        await dispatch(fetchBlackListProductsAction());
    }, []);

    useEffect(() => {
        void fetchProducts();
    }, []);

    const onDeleteConfirm = async () => {
        await deleteProps.onDelete({
            deleteAction: deleteBlackListItemAction,
            currentPage: pageProps.currentPage,
            setCurrentPage: pageProps.setCurrentPage,
        });
    };

    const onAddConfirm = async () => {
        if (selectedProductColors && selectedProduct) {
            const colorsIdArray = Object.keys(selectedProductColors).map(key => {
                if (selectedProductColors[key]) {
                    return +key;
                }
            }).filter(Boolean);

            if (colorsIdArray.length === 0) {
                message.error(t(FORM_ERROR_MESSAGES.fields_required));
            } else {
                const newBlackListItemData = {
                    product_id: selectedProduct ? +selectedProduct?._id : '',
                    product_colors: colorsIdArray,
                };

                await dispatch(createBlackListItemAction(newBlackListItemData)).unwrap()
                    .then(async () => {
                        setAddError('');
                        setSelectedProduct(null);
                        setSelectedProductColors(null);
                        setIsModalAddOpen(false);

                        await navigateToFirstAndFetch(pageProps.setCurrentPage, dispatch, fetchBlackListAction);
                        message.success(t(FORM_SUCCESS_MESSAGES.black_list));
                    })
                    .catch((rejectedValueOrSerializedError) => {
                        setAddError(rejectedValueOrSerializedError.message);
                    });

                setCheckRequiredFields(false);
            }
        } else {
            setCheckRequiredFields(true);
            message.error(t(FORM_ERROR_MESSAGES.fields_required));
        }
    };

    const onSearchConfirm = async (query: string) => {
        pageProps.setCurrentPage('?page=1&');

        await dispatch(fetchBlackListAction(query));
    };

    const onAddToBlackList = () => {
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
                onCreate={onAddToBlackList}
                data={pageProps.data && pageProps.data.results}
                columns={generateColumns(deleteProps.openDeleteModal)}
                totalItems={pageProps.data && pageProps.data.count}
                onPagination={pageProps.onPagination}
                createBtnTitle={'Add to Black list'}
                errorMsg={pageProps.error}
                searchIsRequired={true}
                onSearchConfirm={onSearchConfirm}
            />
            <ModalWindow
                isModalOpen={deleteProps.isModalDeleteOpen}
                onCancel={deleteProps.closeDeleteModal}
                onConfirm={onDeleteConfirm}
                okBtnTitle={'Remove'}
                title={'Are you sure to remove from Black list?'}
                loading={deleteProps.deleteFetching}
                error={deleteProps.deleteError}
            />
            <BlackListAddForm
                isModalOpen={isModalAddOpen}
                onCancel={closeModalAdd}
                onConfirm={onAddConfirm}
                loading={createFetching}
                productsData={productsData}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                selectedProductColors={selectedProductColors}
                setSelectedProductColors={setSelectedProductColors}
                error={addError}
                checkRequiredFields={checkRequiredFields}
            />
        </>
    );
};

export default BlackList;
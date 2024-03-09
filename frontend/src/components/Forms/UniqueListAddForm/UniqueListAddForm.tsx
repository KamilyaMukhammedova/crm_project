import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { InputNumber, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { FORM_ERROR_MESSAGES, FORM_REQUIRED_MESSAGES } from "../../../constants/form";
import { IBlackListProduct, IBlackListProductColor, IBlackListProductListFullData } from "../../../types/blackList";
import { IUniqueListItem } from "../../../types/uniqueList";
import { fetchBlackListProductsAction } from "../../../store/blackList/BlackListActions";
import ModalWindow from "../../ui/ModalWindow/ModalWindow";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";
import FormItemError from "../../ui/FormItemError/FormItemError";
import MiniLoader from "../../ui/MiniLoader/MiniLoader";

interface IProps {
    isModalOpen: boolean,
    loading: boolean,
    checkRequiredFields: boolean,
    percent: number,
    onCancel: () => void,
    onConfirm: () => void,
    uniqueListItems: IUniqueListItem[],
    productsData: IBlackListProductListFullData | null,
    selectedProduct: IBlackListProduct | null,
    setSelectedProduct: React.Dispatch<React.SetStateAction<IBlackListProduct | null>>,
    setPercent: React.Dispatch<React.SetStateAction<number>>,
    selectedProductColorId: number | null,
    setSelectedProductColorId: React.Dispatch<React.SetStateAction<number | null>>,
    error?: string,
}

const UniqueListAddForm: FC<IProps> = ({
                                           isModalOpen,
                                           loading,
                                           checkRequiredFields,
                                           percent,
                                           onCancel,
                                           onConfirm,
                                           uniqueListItems,
                                           productsData,
                                           selectedProduct,
                                           setSelectedProduct,
                                           setPercent,
                                           setSelectedProductColorId,
                                           selectedProductColorId,
                                           error,
                                       }) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const {productsFetching} = useAppSelector(state => state.blackListReducer);

    const [displayedProducts, setDisplayedProducts] = useState<IBlackListProduct[]>([]);
    const [productColors, setProductsColors] = useState<IBlackListProductColor[]>([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [confirmIsDisabled, setConfirmIsDisabled] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        setDisplayedProducts(productsData?.results || []);
    }, [productsData?.results]);

    useEffect(() => {
        if (selectedProduct && selectedProductColorId) {
            const uniqueListItemWithSelectedProduct = uniqueListItems.find(item => item.product.id === selectedProduct.id);

            if (uniqueListItemWithSelectedProduct &&
                uniqueListItemWithSelectedProduct.product_color &&
                uniqueListItemWithSelectedProduct.product_color.id === selectedProductColorId
            ) {
                setConfirmIsDisabled(true);
            } else {
                setConfirmIsDisabled(false);
            }
        }
    }, [selectedProduct, selectedProductColorId]);

    const handleChange = (value: string) => {
        setSearch('');
        setPage(1);
        setLoadingMore(false);

        const selectedProduct: IBlackListProduct | undefined = displayedProducts.find(item => item.id === +value);

        if (selectedProduct) {
            setSelectedProduct(selectedProduct);
            setProductsColors(selectedProduct.colors);
        } else {
            setSelectedProduct(null);
            setProductsColors([]);
            setConfirmIsDisabled(false);
        }
    };

    const onSearch = async (value: string, searchPage = 1) => {
        setSearch(value);
        setPage(1);
        setLoadingMore(false);

        await dispatch(fetchBlackListProductsAction(value ? `?search=${value}&page=${searchPage}` : ''));
    };

    const onScroll = async (event: React.UIEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;
        const isAtBottom = target.scrollTop >= (target.scrollHeight - target.clientHeight);

        if (!loadingMore && isAtBottom && productsData?.next) {
            setLoadingMore(true);
            setTimeout(async () => {
                await dispatch(fetchBlackListProductsAction(`?search=${search}&page=${page + 1}`))
                    .unwrap()
                    .then((data) => {
                        if (data && data.results.length) {
                            setDisplayedProducts([...displayedProducts, ...data.results]);
                            setPage((prevPage) => prevPage + 1);
                        }
                    });

                setLoadingMore(false);
            }, 1000);
        }
    };

    const onClear = async () => {
        setSelectedProduct(null);
        setSearch('');
        setPage(1);
        setLoadingMore(false);

        await dispatch(fetchBlackListProductsAction());
    };

    return (
        <ModalWindow
            isModalOpen={isModalOpen}
            onCancel={onCancel}
            onConfirm={onConfirm}
            okBtnTitle={'Add'}
            title={'Add to Unique List'}
            isFooterFlex={true}
            loading={loading}
            confirmBtnDisabled={confirmIsDisabled}
        >
            <div className={'formInModal'}>
                {error && <ErrorMessage errorMsg={error}/>}
                <div className={'formInModal__itemWrapper formInModal__itemSelect formInModal__firstItemWrapper'}>
                    <p>{t("Choose product")}</p>
                    <Select
                        className={(checkRequiredFields && !selectedProduct) ? 'custom-error-select' : 'custom-select'}
                        showSearch={true}
                        allowClear={true}
                        style={{width: '100%'}}
                        placeholder={t("Choose product")}
                        optionFilterProp={'children'}
                        value={selectedProduct ? selectedProduct.title : undefined}
                        onChange={handleChange}
                        onClear={onClear}
                        onSearch={onSearch}
                        searchValue={search}
                        onPopupScroll={onScroll}
                        onBlur={() => setSearch(search)}
                        notFoundContent={
                            productsFetching ?
                                <MiniLoader size={12}/> :
                                <p className={'formInModal__noResults'}>{t('No search results')}</p>
                        }
                        loading={productsFetching}
                        size={'large'}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={[...displayedProducts.map(product => {
                            return {
                                value: product.id,
                                label: product.title
                            }
                        }), loadingMore ? {value: 'loading', label: 'Loading...'} : {}]}
                    />
                    <FormItemError
                        errorType={'error'}
                        errorTitle={FORM_REQUIRED_MESSAGES.product}
                        restProps={[checkRequiredFields, !selectedProduct]}
                    />
                </div>
                <div className={'formInModal__itemWrapper'}>
                    <p>{t("Colors")}</p>
                    <div className={'formInModal__coloredItems'}>
                        {
                            selectedProduct && productColors.length > 0 ?
                                productColors.map(color => (
                                    <div
                                        key={color.id}
                                        className={`formInModal__color ${selectedProductColorId === color.id ? 'formInModal_active' : 'formInModal_inactive'}`}
                                        onClick={() => setSelectedProductColorId(color.id)}
                                    >
                                        {color.title}
                                    </div>
                                )) :
                                <div
                                    className={'formInModal__color formInModal__all'}
                                    style={{pointerEvents: !selectedProduct ? 'none' : 'auto'}}
                                >
                                    {t("Colors")}
                                </div>
                        }
                    </div>
                    <FormItemError errorType={'error'} errorTitle={FORM_ERROR_MESSAGES.color_duplicate} restProps={[confirmIsDisabled]}/>
                </div>
                <div className={'formInModal__itemWrapper formInModal__lastItemWrapper'}>
                    <p>{t("Percent")}</p>
                    <InputNumber
                        className={'input'}
                        value={percent ? percent : 0}
                        min={0}
                        max={100}
                        style={{width: '100%'}}
                        formatter={(value) => `${value}%`}
                        pattern={'[0-9]*[.,]?[0-9]*'}
                        onChange={value => setPercent(value ? value : 0)}
                    />
                </div>
            </div>
        </ModalWindow>
    );
};

export default UniqueListAddForm;
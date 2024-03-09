import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { FORM_REQUIRED_MESSAGES } from "../../../constants/form";
import { IBlackListProduct, IBlackListProductListFullData } from "../../../types/blackList";
import { fetchBlackListProductsAction } from "../../../store/blackList/BlackListActions";
import ModalWindow from "../../ui/ModalWindow/ModalWindow";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";
import FormItemError from "../../ui/FormItemError/FormItemError";
import MiniLoader from "../../ui/MiniLoader/MiniLoader";

interface IProps {
    isModalOpen: boolean,
    onCancel: () => void,
    onConfirm: () => void,
    loading: boolean,
    checkRequiredFields: boolean,
    productsData: IBlackListProductListFullData | null,
    selectedProduct: IBlackListProduct | null,
    setSelectedProduct: React.Dispatch<React.SetStateAction<IBlackListProduct | null>>,
    selectedProductColors: { [key: string]: boolean } | null,
    setSelectedProductColors: React.Dispatch<React.SetStateAction<{ [key: string]: boolean } | null>>,
    error?: string,
}

const BlackListAddForm: FC<IProps> = ({
                                          isModalOpen,
                                          onCancel,
                                          onConfirm,
                                          loading,
                                          checkRequiredFields,
                                          productsData,
                                          selectedProduct,
                                          setSelectedProduct,
                                          selectedProductColors,
                                          setSelectedProductColors,
                                          error,
                                      }) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const {productsFetching} = useAppSelector(state => state.blackListReducer);

    const [displayedProducts, setDisplayedProducts] = useState<IBlackListProduct[]>([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [allColorsSelected, setAllColorsSelected] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        setDisplayedProducts(productsData?.results || []);
    }, [productsData?.results]);

    useEffect(() => {
        const updatedState = {} as { [key: string]: boolean };
        for (const key in selectedProductColors) {
            updatedState[key] = allColorsSelected;
        }

        setSelectedProductColors(updatedState);
    }, [allColorsSelected]);

    const resetSelect = () => {
        setSearch('');
        setPage(1);
        setLoadingMore(false);
    };

    const handleChange = (value: string) => {
        resetSelect();

        const selectedProduct: IBlackListProduct | undefined = displayedProducts.find(item => item.id === +value);

        const colorsInitialState = {} as { [key: string]: boolean };

        if (selectedProduct) {
            selectedProduct?.colors.forEach(item => {
                colorsInitialState[item.id] = false;
            });

            setSelectedProduct(selectedProduct);
            setSelectedProductColors(colorsInitialState);
        } else {
            setSelectedProduct(null);
            setSelectedProductColors(null);
        }
    };

    const chooseAllColors = () => {
        setAllColorsSelected(prevState => !prevState);
    };

    const onColorClick = (id: string) => {
        if (selectedProductColors) {
            setSelectedProductColors(prevState => {
                if (prevState) {
                    return {
                        ...prevState,
                        [id]: !prevState[id]
                    };
                }
                return prevState;
            });
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
        resetSelect();

        await dispatch(fetchBlackListProductsAction());
    };

    return (
        <ModalWindow
            isModalOpen={isModalOpen}
            onCancel={onCancel}
            onConfirm={onConfirm}
            okBtnTitle={'Add'}
            title={'Add to Black list'}
            isFooterFlex={true}
            loading={loading}
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
                <div className={'formInModal__itemWrapper formInModal__lastItemWrapper'}>
                    <p>{t("Colors")}</p>
                    <div className={'formInModal__coloredItems'}>
                        <div
                            className={'formInModal__color formInModal__all'}
                            style={{pointerEvents: !selectedProduct ? 'none' : 'auto'}}
                            onClick={chooseAllColors}
                        >
                            {t("All")}
                        </div>
                        {
                            (selectedProduct && selectedProductColors) &&
                            selectedProduct.colors.map(color => (
                                <div
                                    key={color.id}
                                    className={`formInModal__color ${selectedProductColors[color.id] ? 'formInModal_active' : 'formInModal_inactive'}`}
                                    onClick={() => onColorClick(color.id.toString())}
                                >
                                    {color.title}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </ModalWindow>
    );
};

export default BlackListAddForm;
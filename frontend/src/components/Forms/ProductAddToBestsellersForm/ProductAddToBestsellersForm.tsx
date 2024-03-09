import React, { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchCollectionsListAction } from "../../../store/collections/CollectionsActions";
import ModalWindow from "../../ui/ModalWindow/ModalWindow";
import MiniLoader from "../../ui/MiniLoader/MiniLoader";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";

interface IProps {
    isModalOpen: boolean,
    onCancel: () => void,
    onConfirm: () => void,
    loading: boolean,
    error?: string,
    selectedCollections: { [key: string]: boolean } | null,
    setSelectedCollections: React.Dispatch<React.SetStateAction<{ [key: string]: boolean } | null>>,
}

const ProductAddToBestsellersForm: FC<IProps> = ({
                                                     isModalOpen,
                                                     onCancel,
                                                     onConfirm,
                                                     loading,
                                                     error,
                                                     selectedCollections,
                                                     setSelectedCollections,
                                                 }) => {
    const {t} = useTranslation();

    const dispatch = useAppDispatch();

    const {fetching: collectionsFetching, data: collections} = useAppSelector(state => state.collectionsReducer);

    const [allCollectionsSelected, setAllCollectionsSelected] = useState(false);

    const fetchCollections = useCallback(async () => {
        await dispatch(fetchCollectionsListAction());
    }, []);

    useEffect(() => {
        void fetchCollections();
    }, []);

    useEffect(() => {
        const selectedCollectionsInitialState = {} as { [key: string]: boolean };

        if (collections) {
            collections.results.forEach(collection => {
                selectedCollectionsInitialState[collection.id] = false;
            });

            setSelectedCollections(selectedCollectionsInitialState);
        } else {
            setSelectedCollections(null);
        }
    }, [collections]);

    useEffect(() => {
        const updateState = {} as { [key: string]: boolean };
        for (const key in selectedCollections) {
            updateState[key] = allCollectionsSelected;
        }

        setSelectedCollections(updateState);
    }, [allCollectionsSelected]);

    const chooseAll = () => {
        setAllCollectionsSelected(prevState => !prevState);
    };

    const onCollectionClick = (id: string) => {
        setSelectedCollections(prevState => {
            if (prevState) {
                return {
                    ...prevState,
                    [id]: !prevState[id]
                };
            }
            return prevState;
        });
    };

    return (
        <ModalWindow
            isModalOpen={isModalOpen}
            onCancel={onCancel}
            onConfirm={onConfirm}
            okBtnTitle={'Add'}
            title={'Add to Bestseller'}
            isFooterFlex={true}
            loading={loading}
        >
            {
                collectionsFetching ? <MiniLoader/> :
                    <div className={'formInModal'}>
                        {error && <ErrorMessage errorMsg={error}/>}
                        <div
                            className={'formInModal__itemWrapper formInModal__firstItemWrapper'}
                        >
                            <p>{t("Collections")}:</p>
                        </div>
                        <div className={'formInModal__coloredItems formInModal__lastItemWrapper'}>
                            <div
                                className={'formInModal__color formInModal__all'}
                                onClick={chooseAll}
                            >
                                {t("All")}
                            </div>
                            {
                                collections && collections.results.map(collection => (
                                    <div
                                        key={collection.id}
                                        className={`formInModal__color ${selectedCollections && selectedCollections[collection.id] ? 'formInModal_active' : 'formInModal_inactive'}`}
                                        onClick={() => onCollectionClick(collection.id.toString())}
                                    >
                                        {collection.title_en}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
            }
        </ModalWindow>
    );
};

export default ProductAddToBestsellersForm;
import React, { FC } from 'react';
import { useTranslation } from "react-i18next";
import { Input } from "antd";
import { EditedSetting } from "../../../types/settings";
import ModalWindow from "../../ui/ModalWindow/ModalWindow";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";


const SETTING_DATA_TO_FORM_ITEMS = [
    {title: 'Bonus activation date', key: 'bonus_activation_date'},
    {title: 'Default percent', key: 'default_percent'},
    {title: 'Promocode percent', key: 'promocode_percent'},
    {title: 'Bonus remove month', key: 'bonus_remove_month'},
    {title: 'Classic', key: 'classic'},
    {title: 'Smart', key: 'smart'},
];

interface IProps {
    isModalOpen: boolean,
    onCancel: () => void,
    onConfirm: () => void,
    settingFormState: EditedSetting,
    setSettingFormState: React.Dispatch<React.SetStateAction<EditedSetting>>,
    loading?: boolean,
    error?: string,
}

const SettingsEditForm: FC<IProps> = ({
                                          isModalOpen,
                                          onCancel,
                                          onConfirm,
                                          settingFormState,
                                          setSettingFormState,
                                          loading,
                                          error
                                      }) => {
    const {t} = useTranslation();

    const onChange = (value: string, name: string) => {
        setSettingFormState(prevState => ({
            ...prevState,
            [name]: +value
        }));
    };

    return (
        <ModalWindow
            isModalOpen={isModalOpen}
            onCancel={onCancel}
            onConfirm={onConfirm}
            okBtnTitle={'Save'}
            title={'Edit Setting'}
            isFooterFlex={true}
            loading={loading}
        >
            <div className={'formInModal'}>
                {error && <ErrorMessage errorMsg={error}/>}
                {
                    SETTING_DATA_TO_FORM_ITEMS.map((formItem, index) => (
                        <div
                            className={`formInModal__itemWrapper ${index === 0 ? 'formInModal__firstItemWrapper' : ''} ${index === SETTING_DATA_TO_FORM_ITEMS.length - 1 ? 'formInModal__lastItemWrapper' : ''}`}
                            key={formItem.key}
                        >
                            <p>{t(formItem.title)}</p>
                            <Input
                                type={'number'}
                                min={0}
                                placeholder={t(formItem.title)}
                                className={'input'}
                                name={formItem.key}
                                value={settingFormState[formItem.key as keyof EditedSetting]}
                                onChange={(event) => onChange(event.target.value, event.target.name)}
                            />
                        </div>
                    ))
                }
            </div>
        </ModalWindow>
    );
};

export default SettingsEditForm;
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { message } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { BasicPageProps, useBasicPage } from "../../hooks/useBasicPage";
import { createStateObjForEditForm } from "../../utils/createEditForm";
import { navigateToFirstAndFetch } from "../../utils/navigateToPage";
import { BREADCRUMBS_ITEMS, generateColumns } from "./constants";
import { INITIAL_STATE_SETTING } from "../../constants/initialState";
import { editSettingAction, fetchSettingsListAction } from "../../store/settings/SettingsActions";
import { EditedSetting, ISetting } from "../../types/settings";
import SettingsEditForm from "../../components/Forms/SettingsEditForm/SettingsEditForm";
import BasicPage from "../../components/BasicPage/BasicPage";

const Settings: FC = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const pageProps = useBasicPage(
        fetchSettingsListAction,
        state => state.settingsReducer,
        'settings',
        false,
        false,
    ) as BasicPageProps;

    const {editFetching} = useAppSelector(state => state.settingsReducer);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [formEditError, setFormEditError] = useState('');
    const [settingId, setSettingId] = useState<number | null>(null);
    const [settingFormState, setSettingFormState] = useState<EditedSetting>({...INITIAL_STATE_SETTING});

    useEffect(() => {
        if (settingId) {
            const oneSetting = pageProps.data.find((item: ISetting) => item.id === settingId);

            if (oneSetting) {
                const editedSettingData: EditedSetting = createStateObjForEditForm(INITIAL_STATE_SETTING, oneSetting);

                setSettingFormState(editedSettingData);
            }
        }
    }, [settingId]);

    const openEditModal = (id: number) => {
        setSettingId(id);
        setIsModalEditOpen(true);
        setFormEditError('');
    };

    const closeEditModal = () => {
        setSettingId(null);
        setIsModalEditOpen(false);
    };

    const onEditConfirm = async () => {
        if (settingId) {
            await dispatch(editSettingAction(settingFormState)).unwrap()
                .then(async () => {
                    setFormEditError('');
                    setSettingId(null);
                    setIsModalEditOpen(false);

                    await navigateToFirstAndFetch(pageProps.setCurrentPage, dispatch, fetchSettingsListAction);
                    message.success(t("Setting was successfully edited!"))
                })
                .catch((rejectedValueOrSerializedError) => {
                    setFormEditError(rejectedValueOrSerializedError.message);
                });
        }
    };

    return (
        <>
            <BasicPage
                fetching={pageProps.fetching}
                breadcrumbItems={BREADCRUMBS_ITEMS}
                data={pageProps.data}
                columns={generateColumns(openEditModal)}
                totalItems={pageProps.data && pageProps.data.length}
                onPagination={pageProps.onPagination}
                createBtnIsNotRequired={true}
                errorMsg={pageProps.error}
            />
            <SettingsEditForm
                isModalOpen={isModalEditOpen}
                onCancel={closeEditModal}
                onConfirm={onEditConfirm}
                loading={editFetching}
                settingFormState={settingFormState}
                setSettingFormState={setSettingFormState}
                error={formEditError}
            />
        </>
    );
};

export default Settings;
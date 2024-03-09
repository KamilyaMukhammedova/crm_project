export interface ISetting {
    id: number,
    created_at: string,
    updated_at: string,
    bonus_activation_date: number,
    default_percent: number,
    promocode_percent: number,
    bonus_remove_month: number,
    classic: number,
    smart: number,
}

export type EditedSetting = Omit<ISetting, 'id' | 'created_at' | 'updated_at'>;
import { create } from 'zustand'
import { createSelectorFunctions } from 'auto-zustand-selectors-hook'
import { usePathname } from 'expo-router'

export type SchemaUiState = {
    selectedDay: number | null
    selectedTime: string | null
    isAdminMode: boolean
    enableFabs: boolean
    dayFabVisible: () => boolean
    toggleAdminMode: () => void
}
export const useSchemaUiStoreBase = create<SchemaUiState>((set, get) => ({
    selectedDay: null,
    selectedTime: null,
    isAdminMode: false,
    enableFabs: false,
    dayFabVisible: () =>
        get().isAdminMode &&
        get().selectedDay !== null &&
        get().selectedTime === null &&
        get().enableFabs,
    toggleAdminMode: () => {
        set((state) => ({ isAdminMode: !state.isAdminMode }))
    },
}))

export const useSchemaUiStore = createSelectorFunctions(useSchemaUiStoreBase)

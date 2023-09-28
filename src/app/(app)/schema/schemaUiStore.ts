import { create } from 'zustand'
import { createSelectorFunctions } from 'auto-zustand-selectors-hook'
import { Event, Schema } from '@root/src/stores/travels/types.travel'
import { produce } from 'immer'

export type SchemaUiState = {
    selectedDayId: string | null
    selectedEvent: Event | null
    isAdminMode: boolean
    enableFabs: boolean
    editEventAction: null | {
        newEvent: Event | null
        oldEvent: Event | null
        action: 'add' | 'delete' | 'update'
    }
    setEditedEventAction: (props: SchemaUiState['editEventAction']) => void
    dayFabVisible: () => boolean
    toggleAdminMode: () => void
}
export const useSchemaUiStoreBase = create<SchemaUiState>((set, get) => ({
    selectedDayId: null,
    selectedEvent: null,
    isAdminMode: false,
    enableFabs: false,
    editEventAction: null,
    setEditedEventAction: (editEventAction) =>
        set(
            //() => ({ editEventAction })
            produce((draft: SchemaUiState) => {
                draft.editEventAction = editEventAction
            })
        ),

    dayFabVisible: () => get().isAdminMode && get().selectedDayId !== null && get().enableFabs,
    toggleAdminMode: () => {
        set((state) => ({ isAdminMode: !state.isAdminMode }))
    },
}))

export const useSchemaUiStore = createSelectorFunctions(useSchemaUiStoreBase)

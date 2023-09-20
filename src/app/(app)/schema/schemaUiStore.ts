import { create } from 'zustand'
import { createSelectorFunctions } from 'auto-zustand-selectors-hook'
import { Event, Schema } from '@src/stores/types'
import { produce } from 'immer'

export type SchemaUiState = {
    selectedDay: number | null
    selectedEvent: Event | null
    isAdminMode: boolean
    enableFabs: boolean
    editEventAction: null | {
        confirming: boolean
        schema: Schema
        newEvent: Event | null
        oldEvent: Event | null
        action: 'add' | 'delete' | 'update'
    }
    setEditedEventAction: (props: SchemaUiState['editEventAction']) => void
    dayFabVisible: () => boolean
    toggleAdminMode: () => void
}
export const useSchemaUiStoreBase = create<SchemaUiState>((set, get) => ({
    selectedDay: null,
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

    dayFabVisible: () => get().isAdminMode && get().selectedDay !== null && get().enableFabs,
    toggleAdminMode: () => {
        set((state) => ({ isAdminMode: !state.isAdminMode }))
    },
}))

export const useSchemaUiStore = createSelectorFunctions(useSchemaUiStoreBase)

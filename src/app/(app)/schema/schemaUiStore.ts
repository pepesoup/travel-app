import { create } from 'zustand'
import { createSelectorFunctions } from 'auto-zustand-selectors-hook'
import { Event, Schema } from '@root/src/stores/travels/types.travel'
import { produce } from 'immer'

// TODO: see how to get logging on state working - create(devtools(log(...

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
                //console.log('draft - before:', JSON.stringify(draft, null, 4))
                draft.editEventAction = editEventAction
                /*
                console.log('------------------------------------------------------------------- ')
                console.log('selectedDayId - after:', JSON.stringify(draft.selectedDayId, null, 4))
                console.log('selectedEvent - after:', JSON.stringify(draft.selectedEvent, null, 4))
                console.log(
                    'editEventAction.action - after:',
                    JSON.stringify(draft.editEventAction?.action, null, 4)
                )
                console.log(
                    'editEventAction.newEvent - after:',
                    JSON.stringify(draft.editEventAction?.newEvent, null, 4)
                )
                console.log(
                    'editEventAction.oldEvent - after:',
                    JSON.stringify(draft.editEventAction?.oldEvent, null, 4)
                )
                console.log('------------------------------------------------------------------- ')
                */
            })
        ),

    dayFabVisible: () => get().isAdminMode && get().selectedDayId !== null && get().enableFabs,
    toggleAdminMode: () => {
        set((state) => ({ isAdminMode: !state.isAdminMode }))
    },
}))

//export const useSchemaUiStore = createSelectorFunctions(useSchemaUiStoreBase)

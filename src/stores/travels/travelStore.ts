import { create } from 'zustand'
import { createSelectorFunctions } from 'auto-zustand-selectors-hook'
import { Store, StoreActions } from '@rne-firebase/stores/store'
import actionCallAsync from '@rne-firebase/stores/storeHelpers'
import { Note, Notes, Schema, Travel, Event, Events } from './types.travel'
import { produce } from 'immer'
import { immer } from 'zustand/middleware/immer'
import merge from 'ts-deepmerge'
import { ref, onValue, set } from 'firebase/database'
import { auth, db } from '@root/src/rne-firebase/firebaseConfig'
import { setDbValue, listenOnRtdbForTravels } from './db/fb-rtdb'
import { useAuthStoreBase } from '@root/src/rne-firebase/src/stores/authStore'

export type TravelStore = {
    content: Travel
    state: {
        value: 'loading' | 'hasValue' | 'hasError'
        info: string
    }
    actions: {
        addNote: (note: Note) => any
        setSchema: (schema: Schema) => any
    }
}

export const useTravelStore = create(
    immer<TravelStore>((set, get) => ({
        content: {} as Travel,
        state: {
            value: 'loading',
            info: 'initial',
        },
        actions: {
            addNote: (note: Note) => {
                setDbValue(`notes/${note.uuid}`, note)

                /* // Firebase trigger RT update - even if offline -> so set state this way is not needed
                set((state: TravelStore) => {
                    state.content.notes[note.uuid] = note
                })// */
            },
            setSchema: (schema: Schema) => {
                setDbValue(`schema`, schema)

                /* // Firebase trigger RT update - even if offline -> so set state this way is not needed
                set((state: TravelStore) => {
                    state.content.notes[note.uuid] = note
                })// */
            },
        },
    }))
)

const unsubAuthStoreSubscription = useAuthStoreBase.subscribe((authData: any) => {
    //console.log('AccountStore - got auth-data:', JSON.stringify(authData, null, 3))
    // now we can connect to db to retreive account data

    if (authData.isSignedIn) {
        listenOnRtdbForTravels(useTravelStore)
    }
})
export const useTravelState = () => useTravelStore((state) => state.state)
export const useTravelInfo = () => useTravelStore((state) => state.content.info)
export const useTravelNotes = () => useTravelStore((state) => state.content.notes)
export const useTravelSchema = () => useTravelStore((state) => state.content.schema)
export const useTravelActions = () => useTravelStore((state) => state.actions)

import { View } from 'react-native'
import { ButtonCmn, TextCmn } from '../../../rn-components/src/components/commonUi'

import { create } from 'zustand'
import { createSelectorFunctions } from 'auto-zustand-selectors-hook'
import { Store, StoreActions } from '@rne-firebase/stores/store'
import actionCallAsync from '@rne-firebase/stores/storeHelpers'
import { Note, Schema, Travel, TravelFromDb } from '@root/src/stores/travels/types'
import { travels } from '@src/stores/travels/devData'
import { produce } from 'immer'
import { useEffect } from 'react'
import { noteTypes } from '../../../constants/note.constants'
import { useTravelStore } from '@root/src/stores/travels/travelStore'

/*
export type TravelStore = Store & {
    content: Travel | null | string
}

export const useTravelStoreBase = create<TravelStore>((set, get) => ({
    content: Object.freeze(travels.travelId1),
    state: 'hasValue',
}))

const addNote = (note: Note) => {
    useTravelStoreBase.setState((state: TravelStore) => {
        return produce(state, (draft: TravelStore) => {
            draft.content.notes[note.uuid] = note
        })
    })
}*/

export default function Test2() {
    const store = useTravelStore()

    useEffect(() => {
        console.log(Object.keys(store))
    }, [store.content.notes])

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TextCmn>hej</TextCmn>
            <ButtonCmn
                title="add note"
                onPress={() => {
                    const ts = Date.now().toString()
                    const newNote: Note = {
                        uuid: ts,
                        subject: 'hej',
                        message: 'hej',
                        timestamp: Number(ts),
                        type: noteTypes.schema,
                        subIcon: { name: 'walk', type: 'MaterialCommunityIcons' },
                    }
                    store.addNote(newNote)
                }}
            />
            <ButtonCmn title="setFoo" onPress={() => {}} />
        </View>
    )
}

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
import _ from 'lodash'

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
                title="Object from entries"
                onPress={() => {
                    const fallback = { schema: Object.fromEntries(_.range(10).map((v) => [v, v])) }
                    console.log(JSON.stringify(travels.travelId1, null, 4))
                }}
            />
            <ButtonCmn
                title="Parse travel dev-data"
                onPress={() => {
                    const o = JSON.parse(require('@src/stores/travels/devData.json'))
                    //console.log(JSON.stringify(o, null, 4))
                }}
            />
        </View>
    )
}

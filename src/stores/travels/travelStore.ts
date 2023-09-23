import { create } from 'zustand'
import { createSelectorFunctions } from 'auto-zustand-selectors-hook'
import { Store, StoreActions } from '@rne-firebase/stores/store'
import actionCallAsync from '@rne-firebase/stores/storeHelpers'
import { Note, Notes, Schema, Travel, Event, Events } from './types'
import { travels } from './devData'
import { produce } from 'immer'
import { immer } from 'zustand/middleware/immer'
import merge from 'ts-deepmerge'

export type NoteStore = {
    notes: Notes
    addNote: (note: Note) => void
}

export const _useNoteStore = create(
    immer<NoteStore>((set) => ({
        notes: travels.travelId1.notes,
        addNote: (note: Note) =>
            set((state: NoteStore) => {
                state.notes[note.uuid] = note
            }),
    }))
)

export type SchemaStore = {
    schema: Schema
    addEvent: (day: number, event: Event) => void
}

export const useSchemaStore = create(
    immer<SchemaStore>((set) => ({
        schema: travels.travelId1.schema,
        addEvent: (day: number, event: Event) =>
            set((state: SchemaStore) => {
                state.schema[day][event.uuid] = event
            }),
    }))
)

export type TravelStore = {
    content: Travel
    state: {
        value: 'loading' | 'hasValue' | 'hasError'
        info: string
    }
    getNotes: () => Notes
    addNote: (note: Note) => any
    getSchema: () => Schema
    getSchemaDay: (day: number) => Events
}
/*
inc: () =>
    set((state) => ({
      nested: { ...state.nested, count: state.nested.count + 1 },
    })),
*/
export const useTravelStore = create(
    immer<TravelStore>((set, get) => ({
        content: travels.travelId1,
        state: {
            value: 'hasValue',
            info: 'ok',
        },
        getNotes: () => get().content.notes, // this is not triggering re-rendering of components
        addNote: (note: Note) =>
            set((state: TravelStore) => {
                state.content.notes[note.uuid] = note
            }),
        getSchema: () => get().content?.schema || null,
        getSchemaDay: (day: number) => {
            return get().content?.schema[day] || null
        },
    }))
)

const fetchTravelFromDb = () => {
    setTimeout(() => {}, 1000)
}

/********** utils ***************/
const createDate = (dateString: string) => {
    const date: any = new Date(dateString)
    if (isNaN(date)) {
        throw new Error(
            'Error: Wrong value in database:' + dateString + '. Not able to parse to date.'
        )
    }
    return date
}

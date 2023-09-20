import { create } from 'zustand'
import { createSelectorFunctions } from 'auto-zustand-selectors-hook'
import { Store, StoreActions } from '@rne-firebase/stores/store'
import actionCallAsync from '@rne-firebase/stores/storeHelpers'
import { Schema, Travel, TravelFromDb } from '../types'
import { travels } from './devData'
import { produce } from 'immer'

export type TravelStore = Store & {
    content: Travel | null | string
    activeTravel: string
    getActiveSchema: () => Schema
}

export const useTravelStoreBase = create<TravelStore>((set, get) => ({
    content: null,
    state: 'loading',
    activeTravel: 'travelId1',
    getActiveSchema: () => {
        throw new Error('Not implemented')
        try {
            return get().content[get().activeTravel].schema
        } catch (e: any) {
            console.log('Unable to fetch current / active schema:', e.message)
        }
    },
}))

export const useTravelStore = createSelectorFunctions(useTravelStoreBase)

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
/********** listen on changes in DB (firebase) ***************/

const listenOnSchemaState = () => {
    console.log('TravelStore - Start listening...')
    setTimeout(() => {
        console.log('TravelStore - got DB value!')
        const fromDb: TravelFromDb = travels['travelId1']
        const existing: TravelStore = useTravelStoreBase.getState()

        const update = produce(existing, (draft: any) => {
            try {
                fromDb.startDate = createDate(fromDb.startDate)
                fromDb.endDate = createDate(fromDb.endDate)
                draft.content = fromDb
                draft.state = 'hasValue'
                throw new Error('some error!!!')
            } catch (e: any) {
                draft.content = e.message
                draft.state = 'hasError'
            }
        })

        useTravelStoreBase.setState(update)
    }, 3000)
}
listenOnSchemaState()

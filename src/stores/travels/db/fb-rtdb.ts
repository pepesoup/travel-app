import { Travel } from '../types.travel'
import merge from 'ts-deepmerge'
import { ref, onValue, set } from 'firebase/database'
import { db } from '@root/src/rne-firebase/firebaseConfig'
//import { useTravelStore } from '../travelStore'
import { differenceInCalendarDays } from 'date-fns'
import * as _ from 'lodash'

const TRAVEL_BASE = '/travel-app/travels'
const CURRENT_TRAVEL_ID = 'travelId1'

export const setDbValue = (relativePath: string, value: any) => {
    const _ref = ref(db, `${TRAVEL_BASE}/${CURRENT_TRAVEL_ID}/${relativePath}`)
    set(_ref, value)
}

// TODO: Enable listening again if there was error inside onValue ??
// TODO: split this to listen on child events - instead of whole travel each time
let travelDbOnValue: any = null
export const listenOnRtdbForTravels = (useTravelStore: any) => {
    if (travelDbOnValue !== null) {
        console.warn('onValue for Travel is already active - cancel start listening again')
        return false
    }
    const travelRef = ref(db, `${TRAVEL_BASE}/${CURRENT_TRAVEL_ID}`)
    setTimeout(() => {
        travelDbOnValue = onValue(travelRef, (snapshot) => {
            const data: Travel = snapshot.val()
            try {
                //console.log(JSON.stringify(data, null, 4))
                const overwrite = {
                    info: {
                        startDate: new Date(data.info.startDate),
                        endDate: new Date(data.info.endDate),
                    },
                }

                const fallback = {}
                const update = merge(fallback, data, overwrite)

                useTravelStore.setState({
                    content: update,
                    state: { value: 'hasValue', info: 'ok' },
                })
            } catch (e: any) {
                useTravelStore.setState({
                    content: {} as Travel,
                    state: { value: 'hasError', info: e.message },
                })
            }
        })
    }, 1)
    return true
}

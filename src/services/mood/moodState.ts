import {
    atom,
    atomFamily,
    selector,
    RecoilState,
    RecoilValueReadOnly,
    Loadable,
    RecoilValue,
    ReadOnlySelectorOptions,
} from 'recoil'
import { authState } from '../auth/authState'
import { firebaseDbApi } from '@app/firebase/firebaseDbApi'
import { ref } from 'firebase/database'
import { db } from '../../../firebaseConfig'
import { LoadedState } from '@app/types/stateTypes'
import { LoadedStateByDb } from '@app/types/stateTypes'
import { AppUser } from '@app/types/userTypes'
import { Log, origin } from '@app/settings/dev'
import { Mood } from '@app/types/moodTypes'
import { userState } from '../user/userState'

const log = new Log(origin.moodState)

const moodState = atom<LoadedStateByDb<Mood>>({
    key: 'services/mood/moodState',
    default: { state: 'loading', contents: null },
})

export const moodSelector = selector<LoadedStateByDb<Mood>>({
    key: 'services/mood/moodSelector',
    get: ({ get }) => {
        log.start('moodSelector, get')
        const auth = get(authState)
        const uid = auth?.uid
        const user = get(userState)
        const mood = get(moodState)

        log.variable('auth.uid', uid)
        log.variable('user', user)
        log.variable('mood', mood)

        if (uid && user.state === 'hasValue') {
            const companyId = user.contents?.info?.company || 'NA'
            log.variable('companyId', companyId)

            firebaseDbApi.streamDbValueToAtom(ref(db, `/mood/${companyId}/${uid}`), moodState)
        }

        log.end('moodSelector, get')
        return mood
    },
})

export const moodGraphSelector = selector({
    key: 'services/mood/moodGraphSelector',
    get: ({ get }) => {
        log.start('moodGraphSelector, get')
        const mood = get(moodState)
        const data = { v1: [], v2: [], v3: [], v4: [] }

        if (mood.state !== 'hasValue') {
            return data
        }

        for (const entry in mood.contents.history) {
            data.v1.push(mood.contents.history[entry].v1)
            data.v2.push(mood.contents.history[entry].v2)
            data.v3.push(mood.contents.history[entry].v3)
            data.v4.push(mood.contents.history[entry].v4)
        }
        log.end('moodGraphSelector, get')

        return data
    },
})

//export const moodGraphBiColorSelector =

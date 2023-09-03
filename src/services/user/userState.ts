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

const log = new Log(origin.userState)

export const companyIdState = atom<LoadedStateByDb<string>>({
    key: 'services/user/companyIdState',
    default: { state: 'loading', contents: null },
})

export const userState = atom<LoadedStateByDb<AppUser>>({
    key: 'services/user/userState',
    default: { state: 'loading', contents: null },
})

export const userSelector = selector<LoadedStateByDb<AppUser>>({
    key: 'services/user/userSelector',
    get: async ({ get }) => {
        log.start('userSelector, get')
        const auth = get(authState)
        const uid = auth?.uid
        const companyId = get(companyIdState)
        const user = get(userState)

        log.variable('auth.uid', uid)
        log.variable('companyId', companyId)
        log.variable('user', user)

        if (uid) {
            firebaseDbApi.streamDbValueToAtom(ref(db, `/users/idToCompany/${uid}`), companyIdState)
            if (companyId.state === 'hasValue') {
                firebaseDbApi.streamDbValueToAtom(
                    ref(db, `/users/accounts/${companyId.contents}/${uid}`),
                    userState,
                    uid
                )
            }
        }
        log.end('userSelector, get')
        return user
    },

    set: ({ set, get }, newValue: any) => {
        // TODO
        log.start('userSelector, set')
        log.variable('newValue:', newValue)
        log.end('userSelector, set')
    },
})

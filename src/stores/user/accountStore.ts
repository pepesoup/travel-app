import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import merge from 'ts-deepmerge'
import { ref, onValue, set } from 'firebase/database'
import { auth, db } from '@root/src/rne-firebase/firebaseConfig'
import * as _ from 'lodash'
import { useAuthStoreBase } from '@root/src/rne-firebase/src/stores/authStore'

export type Account = {
    uid: string
    email: string
    profile: {
        name: string
        phone: string
        profileImgUrl: string
    }
}

export type AccountStore = {
    content: Account
    state: {
        value: 'loading' | 'hasValue' | 'hasError'
        info: string
    }
    actions: {
        saveProfile: (profile: Partial<Account['profile']>) => void
    }
}

export const useAccountStore = create(
    immer<AccountStore>((set, get) => ({
        content: {} as Account,
        state: {
            value: 'loading',
            info: 'initial',
        },
        actions: {
            saveProfile: (profile) => {
                setDbValue('profile', profile)
            },
        },
    }))
)

export const useAccountState = () => useAccountStore((state) => state.state)
export const useAccountContent = () => useAccountStore((state) => state.content)
export const useAccountActions = () => useAccountStore((state) => state.actions)

/************************ Subscribe on Auth Store **************************/
const unsubAuthStoreSubscription = useAuthStoreBase.subscribe((authData: any) => {
    //console.log('AccountStore - got auth-data:', JSON.stringify(authData, null, 3))
    // now we can connect to db to retreive account data
    if (authData.isSignedIn) {
        listenOnRtdbForAccounts(useAccountStore)
    }
})

/************************ Firebase RTDB **************************/
const ACCOUNT_BASE = '/travel-app/accounts'

export const setDbValue = (relativePath: string, value: any) => {
    if (auth.currentUser === null) {
        //throw new Error('Trying to get account data when auth is not set')
        return
    }

    const _ref = ref(db, `${ACCOUNT_BASE}/${auth.currentUser.uid}/${relativePath}`)
    set(_ref, value)
}

// TODO: split this to listen on child events - instead of whole travel each time
export const listenOnRtdbForAccounts = (useAccountStore: any) => {
    if (auth.currentUser === null) {
        //throw new Error('Trying to get account data when auth is not set')
        return
    }
    const travelRef = ref(db, `${ACCOUNT_BASE}/${auth.currentUser.uid}`)
    setTimeout(() => {
        onValue(travelRef, (snapshot) => {
            const data: Account = snapshot.val()
            try {
                //console.log(JSON.stringify(data, null, 4))
                const overwrite = { uid: auth.currentUser?.uid, email: auth.currentUser?.email }
                const fallback = {}
                const update = merge(fallback, data || {}, overwrite)

                useAccountStore.setState({
                    content: update,
                    state: { value: 'hasValue', info: 'ok' },
                })
            } catch (e: any) {
                useAccountStore.setState({
                    content: {} as Account,
                    state: { value: 'hasError', info: e.message },
                })
            }
        })
    }, 0)
}

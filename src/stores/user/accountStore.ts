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
    settings: {
        admin: boolean
    }
    myTravelPlans: {
        selectedTravel: string
        allPlannedTravels: string[]
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
        setSelectedTravel: (travelId: string) => void
        /* - this function will be used in future, in admin interface 
        setAllPlannedTravels: (travelId: string) => void 
        */
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
                set((state: AccountStore) => {
                    return merge(state.content.profile || {}, profile || {})
                })
                setDbValue('profile', profile)
            },

            setSelectedTravel: (travelId) => {
                set((state: AccountStore) => {
                    state.content.myTravelPlans.selectedTravel = travelId
                })
                setDbValue('myTravelPlans/selectedTravel', travelId)
            },

            /* this function will be used in future, in admin interface 
            setAllPlannedTravels: (travelId) => {
                let allPlannedTravelsIds = useAccountContent().myTravelPlans.allPlannedTravels
                allPlannedTravelsIds.add(travelId)

                set((state: AccountStore) => {
                    state.content.myTravelPlans.allPlannedTravels.add(travelId)
                })
                setDbValue('myTravelPlans/allPlannedTravels', allPlannedTravelsIds)
            }
            */
            
        },
    }))
)

export const useAccountState = () => useAccountStore((state) => state.state)
export const useAccountContent = () => useAccountStore((state) => state.content)
export const useAccountActions = () => useAccountStore((state) => state.actions)
export const useAccountSelectedTravel = () => useAccountStore((state) => state.content.myTravelPlans.selectedTravel)
export const useAccountAllTravels = () => useAccountStore((state) => state.content.myTravelPlans.allPlannedTravels)

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

    // travel-app/accounts/5WnKPAlpYWa79BfnrIgzoXJ5otg1/travels
    const _ref = ref(db, `${ACCOUNT_BASE}/${auth.currentUser.uid}/${relativePath}`)
    set(_ref, value)
}

// TODO: split this to listen on child events - instead of whole travel each time
export const listenOnRtdbForAccounts = (useAccountStore: any) => {
    if (auth.currentUser === null) {
        //throw new Error('Trying to get account data when auth is not set')
        return
    }
    //ref guides you to the point(db) through path
    const accountRef = ref(db, `${ACCOUNT_BASE}/${auth.currentUser.uid}`)
    //console.log('accountRef------------', accountRef)

    setTimeout(() => {
        //onValue - Listens for data changes at a particular location.
        // snapshot is the value(account) of the entity at this point of time
        onValue(accountRef, (snapshot) => {
            const data: Account = snapshot.val()
            console.log('data---- from accounStore', data)
            try {
                //console.log(JSON.stringify(data, null, 4))
                // Attributes that needs to be updated
                const overwrite = { uid: auth.currentUser?.uid, email: auth.currentUser?.email }
                const fallback = {}
                // Updated value(entity, account) after applying the over write
                const update = merge(fallback, data || {}, overwrite)

                useAccountStore.setState({
                    //here setting value in the local store
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

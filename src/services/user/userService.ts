import { getRecoil, setRecoil } from 'recoil-nexus'
import { authState } from '../auth/authState'
import { format } from 'date-fns'
import { User } from 'firebase/auth'
import { get, ref, set, update } from 'firebase/database'
import { db } from '../../../firebaseConfig'
import _ from 'lodash'
import { getCompanyFromAuthUserEmail } from './utils'
import { userSettings } from '@app/settings/settings'
import { authService } from '../auth/authService'
import { validateEmailAndPasswords } from '@app/tools/validation'
import { appErrorService } from '@app/app/error/appErrorService'
import { LoadedState } from '@app/types/stateTypes'
import { AppUser } from '@app/types/userTypes'
import { userSelector } from './userState'

export const userService = {
    // TODO:
    // Make a state of userActivity, use path as one during all day,
    // for every same activity, just increment a number (use stateValue++)
    // and write to database
    writeUserActivity: _.throttle(
        async (uid: string, company: string, type: string, value: string) => {
            // TODO: make better data structure for activity
            const date = new Date()
            const month = format(date, 'yy-MMM')
            const day = format(date, 'dd-EEE')
            const time = format(date, 'HH:mm:ss')
            if (company && uid) {
                await set(ref(db, `/activity/${company}/${uid}/${month}/${day}/${time}`), {
                    type,
                    value,
                })
            }
        },
        userSettings.howOftenWriteUserActivity
    ),

    createUserWithEmailAndPassword: async (
        email: string,
        password1: string,
        password2: string
    ): Promise<LoadedState> => {
        const validation = validateEmailAndPasswords(email, password1, password2)
        if (validation !== null) {
            appErrorService.warning(validation)
            return {
                contents: JSON.stringify(validation, null, 2),
                state: 'hasError',
                exists: false,
            }
        }
        const res = await authService.createUserWithEmailAndPassword(email, password1)
        console.log('--- createUserWithEmailAndPassword, res:', JSON.stringify(res, null, 2))
        if (res.state === 'hasValue') {
            userService.onUserCreated(res.contents.user)
        }
        //return { contents: res, state: 'hasValue', exists: true }
        return res
    },

    onUserCreated: async (authUser: User) => {
        //TODO: make a UI for user to select company belonging to
        // add date created
        const company = getCompanyFromAuthUserEmail(authUser)
        const email = authUser.email ? authUser.email : 'NA'
        await set(ref(db, `/users/idToCompany/${authUser.uid}`), company)
        await set(ref(db, `/users/accounts/${company}/${authUser.uid}`), {
            info: {
                company,
            },
            profile: {
                isCompeting: true,
            },
            status: {
                firstLogin: true,
            },
        })
        await userService.writeUserActivity(authUser.uid, company, 'accountCreated', email)
    },

    saveUserProfile: async (appUser: AppUser) => {
        const ref = await userService.getUserAccountRef('profile')
        if (ref) {
            await set(ref, appUser.profile)
        }
    },

    saveUserSettings: async (appUser: AppUser) => {
        const ref = await userService.getUserAccountRef('settings')
        if (ref) {
            await set(ref, appUser.settings)
        }
    },

    saveUserStatus: async (appUser: AppUser) => {
        const ref = await userService.getUserAccountRef('status')
        if (ref) {
            await set(ref, appUser.status)
        }
    },

    saveUserDebug: async (appUser: AppUser) => {
        const ref = await userService.getUserAccountRef('debug')
        if (ref) {
            await set(ref, appUser.debug)
        }
    },
    updateFavoriteChallenge: async (challengeId: string) => {
        const ref = await userService.getUserAccountRef('challenge')
        if (!ref) {
            return
        }
        const user = getRecoil(userSelector)
        const favorites = _.clone(user.contents.challenge?.favorites || [])
        if (favorites.includes(challengeId)) {
            _.pull(favorites, challengeId)
        } else {
            favorites.push(challengeId)
        }
        await update(ref, { favorites })
    },

    getUserAccountRef: async (part: 'profile' | 'settings' | 'status' | 'debug' | 'challenge') => {
        const authUser = getRecoil(authState)
        if (authUser === null) return null
        const company = (await get(ref(db, `/users/idToCompany/${authUser.uid}`))).val()
        if (company === null) return null
        return ref(db, `/users/accounts/${company}/${authUser?.uid}/${part}`)
    },
}

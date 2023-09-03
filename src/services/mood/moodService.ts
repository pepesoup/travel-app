import { AppUser } from '@app/types/userTypes'
import { Auth, User } from 'firebase/auth'
import { getRecoil, setRecoil } from 'recoil-nexus'
import { authState } from '../auth/authState'
import { userSelector, userState } from '../user/userState'
import { LoadedStateByDb } from '@app/types/stateTypes'
import { useResetRecoilState } from 'recoil'
import { firebaseDbApi } from '@app/firebase/firebaseDbApi'
import { ref } from 'firebase/database'
import { db } from '../../../firebaseConfig'
import { Mood } from '@app/types/moodTypes'
import { produce } from 'immer'
import { moodSelector } from './moodState'

type UpdateDbProps = {
    v1: number
    v2: number
    v3: number
    v4: number
}

export class MoodService {
    auth: User | null
    user: LoadedStateByDb<AppUser>
    mood: LoadedStateByDb<Mood>
    companyId: string
    uid: string | undefined

    constructor() {
        this.auth = getRecoil(authState)
        this.user = getRecoil(userSelector)
        this.mood = getRecoil(moodSelector)

        this.uid = this.auth?.uid
        this.companyId = this.user.contents?.info?.company || 'NA'
    }

    updateDb({ v1, v2, v3, v4 }: UpdateDbProps) {
        const d = new Date().valueOf()
        const mood: Mood = {
            current: {
                savedAt: d,
                data: {
                    v1,
                    v2,
                    v3,
                    v4,
                },
            },
            history: {},
        }
        mood.history[d] = {
            v1: { value: v1 },
            v2: { value: v2 },
            v3: { value: v3 },
            v4: { value: v4 },
        }

        firebaseDbApi.updateDbValue(
            ref(db, `/mood/${this.companyId}/${this.uid}/current`),
            mood.current
        )
        firebaseDbApi.updateDbValue(
            ref(db, `/mood/${this.companyId}/${this.uid}/history/${d}`),
            mood.history[d]
        )
    }
}

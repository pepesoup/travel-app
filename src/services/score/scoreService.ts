import { getRecoil } from 'recoil-nexus'
import { db } from '../../../firebaseConfig'
import { companyIdState, userSelector } from '../user/userState'
import { firebaseDbApi } from '@app/firebase/firebaseDbApi'
import { ref } from 'firebase/database'

export const scoreService = {
    dev: {
        removeChallengeScore: () => {
            // /score/gmail-com/00v7jSneUqVh9sKK7OHrLoRIYT53
            const company = getRecoil(companyIdState)
            const user = getRecoil(userSelector)
            const path = `/score/${company.contents}/${user.selector}/challenge`
            //console.log('ref:', ref)
            firebaseDbApi.setDbValue(ref(db, path), null)
            scoreService.dev.triggerScoreRecalc()
        },
        triggerScoreRecalc: async () => {
            const user = getRecoil(userSelector)
            const path = 'queue/tasks'
            const value = {
                case: 'UPDATE_SCORE',
                data: { uid: user.selector },
            }
            firebaseDbApi.pushDbValue(ref(db, path), value)
        },
    },
}

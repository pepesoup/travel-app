import { firebaseDbApi } from '@app/firebase/firebaseDbApi'
import { RecoilLoadable, atom, selector } from 'recoil'
import { Log, origin } from '@app/settings/dev'
import { db } from '../../../firebaseConfig'
import { ref } from 'firebase/database'
import { authState } from '../auth/authState'
import { LoadedStateByDb } from '@app/types/stateTypes'
import { Challenge, ChallengeTaskDefinitions, ChallengeWeekConfig } from '@app/types/challengeTypes'
import { DayOfWeek } from '@app/types/challengeTypes'
import _ from 'lodash'
import { format as formatDate } from 'date-fns'
import { userSelector } from '../user/userState'
import { AppUser } from '@app/types/userTypes'
import { setRecoil } from 'recoil-nexus'

const log = new Log(origin.challengeState)

/******* -> -> -> ******* START
 * This section is 3 Atoms and 1 Selecttor to get value for whole Challenge
 **/

export const challengeDefinitionsState = atom<LoadedStateByDb<ChallengeTaskDefinitions>>({
    key: 'services/challenge/challengeDefinitionsState',
    default: { state: 'loading', contents: null },
})

export const challengeConfigState = atom<LoadedStateByDb<ChallengeWeekConfig>>({
    key: 'services/challenge/challengeConfigState',
    default: { state: 'loading', contents: null },
})

export const challengeDataState = atom<LoadedStateByDb<Challenge>>({
    key: 'services/challenge/challengeDataState',
    default: { state: 'loading', contents: null },
})

export const activeChallengeSelector = selector<LoadedStateByDb<Challenge>>({
    key: 'services/challenge/activeChallengeSelector',
    get: ({ get }) => {
        log.start('activeChallenge, get')
        const auth = get(authState)
        const definition = get(challengeDefinitionsState)
        const config = get(challengeConfigState)
        const challenge = get(challengeDataState)

        log.variable('auth.uid', auth?.uid)
        log.variable('definition', definition)
        log.variable('config', config)
        log.variable('data', challenge)

        if (auth) {
            firebaseDbApi.streamDbValueToAtom(
                ref(db, '/challenges/definitions'),
                challengeDefinitionsState
            )
            firebaseDbApi.streamDbValueToAtom(
                ref(db, '/challenges/weeklyChallenges/config'),
                challengeConfigState
            )

            if (config.state === 'hasValue') {
                const challengeId = config.contents?.activeChallenge
                const path = `/challenges/weeklyChallenges/data/${challengeId}`
                log.variable('challenge path', path)
                firebaseDbApi.streamDbValueToAtom(
                    ref(db, `/challenges/weeklyChallenges/data/${challengeId}`),
                    challengeDataState
                )
            }
        }

        log.end('activeChallenge, get')
        return _.merge({ contents: { id: config.contents?.activeChallenge } }, challenge)
    },
})
/******* <- <- <- ******* END
 * This section is 3 Atoms and 1 Selecttor to get value for whole Challenge
 **/

/******* <- <- <- ******* "challengeDayOfWeekState"
 * depends on default the calendar date or is overridden by user defined debug value
 * ex: ...<uid>/debug/challengeDayOfWeek:"Mon"
 **/
/*
setTimeout(
    () => {
        setRecoil(challengeDayOfWeekState, formatDate(Date.now(), 'EEE') as DayOfWeek)
    },
    1 * 60 * 1000
)

const challengeDayOfWeekState = atom<DayOfWeek>({
    key: 'services/challenge/challengeDayOfWeekState',
    default: formatDate(Date.now(), 'EEE') as DayOfWeek,
})

export const challengeDayOfWeekSelector = selector<DayOfWeek>({
    key: 'services/challenge/challengeDayOfWeekSelector',
    get: ({ get }) => {
        const user: LoadedStateByDb<AppUser> = get(userSelector)
        const normalDay = get(challengeDayOfWeekState)
        const debugDay = user?.contents?.debug?.challengeDayOfWeek

        return debugDay ? debugDay : normalDay
    },
})
*/
/** /challenges/definitions */
/** /challenges/weeklyChallenges/config/activeChallenge */
/** /challenges/weeklyChallenges/data/timestampCreated1 */

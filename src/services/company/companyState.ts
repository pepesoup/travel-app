import { RecoilState, atom, selector } from 'recoil'
import { Log, origin } from '@app/settings/dev'
import { LoadedStateByDb } from '@app/types/stateTypes'
import { Companies } from '@app/types/companyTypes'
import { firebaseDbApi } from '@app/firebase/firebaseDbApi'
import { ref } from 'firebase/database'
import { db } from '../../../firebaseConfig'

const log = new Log(origin.companyState)

export const companiesState: RecoilState<LoadedStateByDb<Companies>> = atom<
    LoadedStateByDb<Companies>
>({
    key: 'services/company/companiesState',
    default: { state: 'loading', contents: null },
    effects: [(ctx) => firebaseDbApi.streamDbValueToAtom(ref(db, '/companies'), companiesState)],
})

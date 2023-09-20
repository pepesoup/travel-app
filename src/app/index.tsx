import { Redirect, useRootNavigation, usePathname, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { useAuthStoreBase } from '@rne-firebase/stores/authStore'
import { TextCmn, Links } from '@rn-components/commonUi'
import { useEditData } from './(app)/schema/edit/hooks/useEditData'

export default function Index_0() {
    const authData = useAuthStoreBase()
    const path = usePathname()
    const rootNavigation = useRootNavigation()
    const router = useRouter()

    /* dev */
    const editData = useEditData()

    useEffect(() => {
        if (rootNavigation?.isReady()) {
            //editData.setDevData()
            setTimeout(() => {
                router.replace(
                    authData.isSignedIn ? '/(app)/retreafy/retreafy' : '/(auth)/login'
                    //authData.isSignedIn ? '/(app)/schema/schemaMain' : '/(auth)/login'
                    //authData.isSignedIn ? '/(app)/schema/edit/[addEvent]' : '/(auth)/login'
                )
            }, 1)
        }
    }, [rootNavigation?.isReady()])

    return <TextCmn variant="titleLarge">Loading Auth and global data used in app ...</TextCmn>
}

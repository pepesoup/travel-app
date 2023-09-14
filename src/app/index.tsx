import { Redirect, useRootNavigation, usePathname, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { useAuthStoreBase } from '@rne-firebase/stores/authStore'
import { TextCmn, Links } from '@rn-components/commonUi'

export default function Index_0() {
    const authData = useAuthStoreBase()
    const path = usePathname()
    const rootNavigation = useRootNavigation()
    const router = useRouter()

    useEffect(() => {
        if (rootNavigation?.isReady()) {
            router.replace(authData.isSignedIn ? '/(app)/retreafy/retreafy' : '/(auth)/login')
        }
    }, [rootNavigation?.isReady()])

    return <TextCmn variant="titleLarge">Loading Auth and global data used in app ...</TextCmn>
}

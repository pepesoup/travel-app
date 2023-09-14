import { Link, useRootNavigation, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { ButtonCmn, ScreenCmn } from '@rn-components/commonUi'
import { useTheme } from 'react-native-paper'
import { authStoreActions } from '@rne-firebase/stores/authStore'

export default function Modal() {
    const router = useRouter()
    const isPresented = router.canGoBack()
    const theme = useTheme()

    const onLogoutPress = async () => {
        await authStoreActions.signOut()
        //router.replace('/')
    }

    return (
        <ScreenCmn style={{ gap: 0, justifyContent: 'center', alignItems: 'center' }}>
            {!isPresented && <Link href="../">Dismiss</Link>}
            <StatusBar style="light" />
            <ButtonCmn title="Logga ut" onPress={onLogoutPress} />
        </ScreenCmn>
    )
}

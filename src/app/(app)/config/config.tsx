import { Link, useRootNavigation, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { ButtonCmn, ScreenCmn } from '@rn-components/commonUi'
import { Menu, useTheme } from 'react-native-paper'
import { authStoreActions } from '@rne-firebase/stores/authStore'
import {
    useAccountActions,
    useAccountAllTravels,
    useAccountSelectedTravel,
} from '@root/src/stores/user/accountStore'
import { View } from 'react-native'


export default function Modal() {
    const router = useRouter()
    const isPresented = router.canGoBack()
    const theme = useTheme()
    const accountActions = useAccountActions()
    const allTravels = useAccountAllTravels()
    const selectedTravelId = useAccountSelectedTravel()

    const onLogoutPress = async () => {
        await authStoreActions.signOut()
        //router.replace('/')
    }

    const selectTravelAndRedirect = (currentTravelId: string) => {
        accountActions.setSelectedTravel(currentTravelId)
        setTimeout(() => {
            router.push('/retreafy/retreafy')
        }, 1)
    }

    return (
        <ScreenCmn style={{ gap: 0, justifyContent: 'center', alignItems: 'center' }}>
            {!isPresented && <Link href="../">Dismiss</Link>}
            <View style={{ flex: 1 }}>
                {allTravels.map((currentTravelId, index) => (
                    <Menu.Item
                        trailingIcon={selectedTravelId === currentTravelId ? 'check' : ''}
                        onPress={() => selectTravelAndRedirect(currentTravelId)}
                        title={currentTravelId}
                        key={index}
                    />
                ))}
            </View>
            <StatusBar style="light" />
            <ButtonCmn title="Logga ut" onPress={onLogoutPress} />
        </ScreenCmn>
    )
}

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
import { TravelPO } from '@root/src/stores/user/accountStore'
import { useChatStore } from '@root/src/getStream/getStreamStore'

export default function Modal() {
    const router = useRouter()
    const isPresented = router.canGoBack()
    const theme = useTheme()
    const accountActions = useAccountActions()
    const allTravels = useAccountAllTravels()
    const selectedTravel = useAccountSelectedTravel()
    const chatStore = useChatStore()

    const onLogoutPress = async () => {
        await authStoreActions.signOut()
        //router.replace('/')
    }

    const selectTravelAndRedirect = (currentTravel: TravelPO) => {
        accountActions.setSelectedTravel(currentTravel)
        chatStore.actions.setChannel(null)
        chatStore.actions.setChatIsReady(false)
        setTimeout(() => {
            router.push('/retreafy/retreafy')
        }, 1)
    }

    return (
        <ScreenCmn style={{ gap: 0, justifyContent: 'center', alignItems: 'center' }}>
            {!isPresented && <Link href="../">Dismiss</Link>}
            <View style={{ flex: 1 }}>
                {allTravels.map((currentTravel, index) => (
                    <Menu.Item
                        trailingIcon={selectedTravel.id === currentTravel.id ? 'check' : ''}
                        onPress={() => selectTravelAndRedirect(currentTravel)}
                        title={currentTravel.name}
                        key={index}
                    />
                ))}
            </View>
            <StatusBar style="light" />
            <ButtonCmn title="Logga ut" onPress={onLogoutPress} />
        </ScreenCmn>
    )
}

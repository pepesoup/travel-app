import { Portal, Text, useTheme } from 'react-native-paper'
import {
    Link,
    Redirect,
    Slot,
    Stack,
    useRootNavigation,
    useRootNavigationState,
    useRouter,
} from 'expo-router'
import { useAuthStoreBase } from '@rne-firebase/stores/authStore'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { RowCmn, TextCmn } from '@rn-components/commonUi'
import { ReactNode, useEffect } from 'react'

export const ModalHeaderLeft = () => {
    return (
        <TextCmn style={{ color: 'white', marginBottom: -15 }}>
            <Link href="../">Stäng</Link>
        </TextCmn>
    )
}

type HeaderRightProps = {
    addIcon?: ReactNode
}
export const iconSizeAtHeader = 30
export const HeaderRight = ({ addIcon }: any) => {
    return (
        <RowCmn style={{ gap: 10 }}>
            <Link href="/notes/notes">
                <MaterialCommunityIcons
                    name="bell-badge-outline"
                    size={iconSizeAtHeader}
                    color={'white'}
                />
            </Link>
            <Link href="/config/config">
                <MaterialIcons name="settings" size={iconSizeAtHeader} color={'white'} />
            </Link>
            {addIcon ? addIcon : null}
        </RowCmn>
    )
}

export default function Layout_AppApp() {
    const rootNavigation = useRootNavigation()
    const theme = useTheme()
    const authData = useAuthStoreBase()
    const router = useRouter()

    useEffect(() => {
        console.log('useEffect 0')
        if (rootNavigation?.isReady() && authData.state === 'hasValue' && !authData.isSignedIn) {
            router.replace('/(auth)/login')
        }
    }, [rootNavigation?.isReady(), authData])

    if (authData.state === 'loading') {
        console.log('loading')
        return (
            <>
                <Text style={{ color: 'purple' }} variant="titleLarge">
                    Layout_AppApp: Loading...
                </Text>
            </>
        )
    }

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.primaryContainer,
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerBackTitleVisible: false,
                headerRight: HeaderRight,
            }}
        >
            <Stack.Screen
                name="notes/notes"
                options={{
                    title: 'Aviseringar',
                    // Set the presentation mode to modal for our modal route.
                    presentation: 'modal',
                    headerRight: () => null,
                    headerLeft: ModalHeaderLeft,
                }}
            />
            <Stack.Screen
                name="config/config"
                options={{
                    title: 'Inställningar',
                    // Set the presentation mode to modal for our modal route.
                    presentation: 'modal',
                    headerRight: () => null,
                    headerLeft: ModalHeaderLeft,
                }}
            />
        </Stack>
    )
}

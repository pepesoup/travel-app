import { Text, useTheme } from 'react-native-paper'
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
import { useEffect } from 'react'

export const modalHeaderLeft = () => {
    return (
        <TextCmn style={{ color: 'white', marginBottom: -15 }}>
            <Link href="../">Stäng</Link>
        </TextCmn>
    )
}

export const headerRight = () => {
    return (
        <RowCmn>
            <Link href="/notes/notes">
                <MaterialCommunityIcons name="bell-badge-outline" size={24} color={'white'} />
            </Link>
            <Link href="/config/config">
                <MaterialIcons name="settings" size={24} color={'white'} />
            </Link>
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
                headerRight,
            }}
        >
            <Stack.Screen
                name="notes/notes"
                options={{
                    title: 'Aviseringar',
                    // Set the presentation mode to modal for our modal route.
                    presentation: 'modal',
                    headerRight: () => null,
                    headerLeft: modalHeaderLeft,
                }}
            />
            <Stack.Screen
                name="config/config"
                options={{
                    title: 'Inställningar',
                    // Set the presentation mode to modal for our modal route.
                    presentation: 'modal',
                    headerRight: () => null,
                    headerLeft: modalHeaderLeft,
                }}
            />
        </Stack>
    )
}

import { Portal, Text, useTheme } from 'react-native-paper'
import {
    Link,
    Redirect,
    Slot,
    Stack,
    usePathname,
    useRootNavigation,
    useRootNavigationState,
    useRouter,
} from 'expo-router'
import { useAuthStoreBase } from '@rne-firebase/stores/authStore'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { AnimatedBadge, RowCmn, TextCmn } from '@rn-components/commonUi'
import { ReactNode, useEffect, useState } from 'react'
import { Badge } from 'react-native-paper'
import { useTravelStore } from '@root/src/stores/travels/travelStore'
import { View } from 'react-native'
import { useNotesAlert } from './notes/hooks/useNotesAlert'

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
export const HeaderRight = ({ addIcon }: HeaderRightProps) => {
    const notes = useTravelStore((state) => state.content.notes)
    const { getNrOfUnreadNotes, setNotesAreRead, clearStorage } = useNotesAlert()

    return (
        <RowCmn.ChildrenRow style={{ gap: 10 }}>
            <Link
                href="/notes/notes"
                onPress={async () => {
                    await setNotesAreRead()
                }}
            >
                <View>
                    <MaterialCommunityIcons
                        name="bell-badge-outline"
                        size={iconSizeAtHeader}
                        color={'white'}
                    />
                    <AnimatedBadge size={17} visible={getNrOfUnreadNotes() > 0}>
                        {getNrOfUnreadNotes()}
                    </AnimatedBadge>
                </View>
            </Link>
            <Link href="/config/config">
                <View>
                    <MaterialIcons name="settings" size={iconSizeAtHeader} color={'white'} />
                </View>
            </Link>
            {addIcon ? addIcon : null}
        </RowCmn.ChildrenRow>
    )
}

export default function Layout_AppApp() {
    const rootNavigation = useRootNavigation()
    const theme = useTheme()
    const authData = useAuthStoreBase()
    const router = useRouter()
    const notes = useTravelStore((state) => state.content.notes)

    useEffect(() => {
        if (rootNavigation?.isReady()) {
            if (authData.state === 'hasValue' && !authData.isSignedIn) {
                router.replace('/(auth)/login')
            }
        }
    }, [rootNavigation?.isReady(), authData])

    /* hm I don't think this is needed here */
    if (authData.state === 'loading') {
        console.log('Auth is loading')
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
                headerRight: () => <HeaderRight />,
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

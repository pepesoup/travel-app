import { TextCmn } from '@root/src/rn-components/src/components/commonUi'
import { Link, Stack } from 'expo-router'
import { Portal, useTheme } from 'react-native-paper'

export const modalHeaderLeft = () => {
    return (
        <TextCmn style={{ color: 'white', marginBottom: -15 }}>
            <Link href="../">Stäng</Link>
        </TextCmn>
    )
}

export default function AppLayout() {
    const theme = useTheme()
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
                headerRight: () => null,
                headerLeft: () => null,
            }}
        >
            <Stack.Screen
                name="forgotPassword"
                options={{
                    title: 'Glömt lösenord',
                    // Set the presentation mode to modal for our modal route.
                    presentation: 'modal',
                    headerRight: () => null,
                    headerLeft: modalHeaderLeft,
                }}
            />
        </Stack>
    )
}

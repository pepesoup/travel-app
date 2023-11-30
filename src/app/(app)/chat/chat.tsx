import { SurfaceCmn, TextCmn } from '@rn-components/commonUi'
import { Stack, router} from 'expo-router'
import { View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ScreenCmn } from '@rn-components/commonUi'
import { useTheme } from 'react-native-paper'

export default function Chat() {
    const theme = useTheme()

    return (
        <ScreenCmn>
            <Stack.Screen
                options={{
                    title: 'Chat',
                }}
            />
            <View
                style={{
                    width: '100%',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    padding: 6,
                }}
            >
                <TextCmn
                    variant="titleMedium"
                    style={{
                        color: theme.colors.primary,
                    }}
                >
                    chat
                </TextCmn>
            </View>
            <View
                style={{
                    marginTop: 30,
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    alignContent: 'center',
                    width: '100%',
                }}
            >
                <SurfaceCmn text="Channel Screen" onPress={() => router.push('/chat/groupChannelScreen')}>
                    <MaterialCommunityIcons
                        name="account-group"
                        size={32}
                        color={theme.colors.primary}
                    />
                </SurfaceCmn>
                <SurfaceCmn text="Channel List Screen" onPress={() => router.push('/chat/groupChannelListScreen')}>
                    <MaterialCommunityIcons
                        name="account-group"
                        size={32}
                        color={theme.colors.primary}
                    />
                </SurfaceCmn>
                <SurfaceCmn text="Channel Create Screen" onPress={() => router.push('/chat/GroupChannelCreateScreen')}>
                    <MaterialCommunityIcons
                        name="account-group"
                        size={32}
                        color={theme.colors.primary}
                    />
                </SurfaceCmn>
            </View>
        </ScreenCmn>
    )
}

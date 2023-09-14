import { RowCmn, ScreenCmn, TextCmn } from '@rn-components/commonUi'
import { Stack } from 'expo-router'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { Image } from 'expo-image'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

export default function Profile() {
    const theme = useTheme()

    return (
        <ScreenCmn>
            <Stack.Screen
                options={{
                    title: 'Profil',
                }}
            />
            <LinearGradient
                colors={[
                    theme.colors.primaryContainer,
                    theme.colors.background,
                    theme.colors.background,
                ]}
                style={{ flex: 1, width: '100%' }}
            >
                <View style={{ height: '40%', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={require('@src/assets/dev/avatar1.png')}
                        style={{
                            //flex: 1,
                            width: '33%',
                            aspectRatio: 1,
                        }}
                        contentFit="cover"
                        transition={1000}
                    />
                    <TextCmn variant="titleLarge">Marie Nilsson</TextCmn>
                </View>
                <View style={{ flex: 1, marginLeft: '10%', gap: 10 }}>
                    <RowCmn>
                        <MaterialCommunityIcons
                            name="email-outline"
                            size={24}
                            color={theme.colors.onSurface}
                        />
                        <TextCmn>MarieNilsson@gmail.com</TextCmn>
                    </RowCmn>
                    <RowCmn>
                        <MaterialCommunityIcons
                            name="phone-outline"
                            size={24}
                            color={theme.colors.onSurface}
                        />
                        <TextCmn>‭070-244 55 40‬</TextCmn>
                    </RowCmn>
                    <RowCmn>
                        <MaterialCommunityIcons
                            name="account-circle-outline"
                            size={24}
                            color={theme.colors.onSurface}
                        />
                        <TextCmn>Redigera profil</TextCmn>
                    </RowCmn>
                    <RowCmn>
                        <MaterialIcons name="settings" size={24} color={theme.colors.onSurface} />
                        <TextCmn>Inställningar</TextCmn>
                    </RowCmn>
                    <RowCmn>
                        <MaterialIcons
                            name="power-settings-new"
                            size={24}
                            color={theme.colors.onSurface}
                        />
                        <TextCmn>Logga ut</TextCmn>
                    </RowCmn>
                </View>
            </LinearGradient>
        </ScreenCmn>
    )
}

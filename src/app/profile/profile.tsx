import { appThemeState } from '../../theme/themeStates'
import { RowCmn, ScreenCmn, SurfaceCmn, TextCmn } from '@rn-components/commonUi'
import { Link, SplashScreen, Stack, router, useRouter } from 'expo-router'
import { useEffect } from 'react'
import { Button, ScrollView, StyleSheet, View } from 'react-native'
import { Avatar, Surface, Text } from 'react-native-paper'
import { useRecoilState, useRecoilValue } from 'recoil'
import { LinearGradient } from 'expo-linear-gradient'
import { Image } from 'expo-image'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

export default function Profile() {
    const theme = useRecoilValue(appThemeState)

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
                        source={require('../../assets/dev/avatar1.png')}
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
                            color={theme.colors.text}
                        />
                        <TextCmn>MarieNilsson@gmail.com</TextCmn>
                    </RowCmn>
                    <RowCmn>
                        <MaterialCommunityIcons
                            name="phone-outline"
                            size={24}
                            color={theme.colors.text}
                        />
                        <TextCmn>‭070-244 55 40‬</TextCmn>
                    </RowCmn>
                    <RowCmn>
                        <MaterialCommunityIcons
                            name="account-circle-outline"
                            size={24}
                            color={theme.colors.text}
                        />
                        <TextCmn>Redigera profil</TextCmn>
                    </RowCmn>
                    <RowCmn>
                        <MaterialIcons name="settings" size={24} color={theme.colors.text} />
                        <TextCmn>Inställningar</TextCmn>
                    </RowCmn>
                    <RowCmn>
                        <MaterialIcons
                            name="power-settings-new"
                            size={24}
                            color={theme.colors.text}
                        />
                        <TextCmn>Logga ut</TextCmn>
                    </RowCmn>
                </View>
            </LinearGradient>
        </ScreenCmn>
    )
}

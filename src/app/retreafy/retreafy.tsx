import { appThemeState } from '../../theme/themeStates'
import { SurfaceCmn, ScreenCmn, TextCmn } from '@rn-components/commonUi'
//import { ScreenCmn, TextCmn } from '@rn-components/commonUi'
import { Link, Redirect, SplashScreen, Stack, router, usePathname, useRouter } from 'expo-router'
import { createContext, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ThemeRetreafy } from '../../theme/themes/retreafyTheme'
import { retreafyTheme } from '../../theme/themesDef'
import { Image } from 'expo-image'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { View, Text } from 'react-native'
import { useTheme } from 'react-native-paper'

export default function Retreafy() {
    const theme = useTheme()
    useEffect(() => {
        SplashScreen.hideAsync()
    }, [])

    const path = usePathname()
    const navigation = useRouter()
    console.log(path)
    if (path === '/') {
        return <Redirect href="/auth/login" />
    }

    return (
        <ScreenCmn>
            <Stack.Screen
                options={{
                    title: 'RETREAFY',
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
                        color: ThemeRetreafy.colors.primary,
                    }}
                >
                    10 Dagar kvar till resan!
                </TextCmn>
            </View>
            <View style={{ flex: 1, padding: 20, alignItems: 'center' }}>
                <Image
                    source={require('../../assets/dev/avatar1.png')}
                    style={{
                        //flex: 1,
                        width: '40%',
                        aspectRatio: 1,
                    }}
                    contentFit="cover"
                    transition={1000}
                />

                <View
                    style={{
                        //flex: 1,
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignContent: 'center',
                        width: '100%',
                    }}
                >
                    <SurfaceCmn text="Min resa">
                        <MaterialCommunityIcons
                            name="palm-tree"
                            size={32}
                            color={theme.colors.primary}
                        />
                    </SurfaceCmn>
                    <SurfaceCmn text="Schema" onPress={() => router.push('/schema/schemaMain')}>
                        <MaterialCommunityIcons
                            name="calendar-month-outline"
                            size={32}
                            color={theme.colors.primary}
                        />
                    </SurfaceCmn>
                    <SurfaceCmn text="Profil" onPress={() => router.push('/profile/profile')}>
                        <MaterialCommunityIcons
                            name="account-circle-outline"
                            size={32}
                            color={theme.colors.primary}
                        />
                    </SurfaceCmn>
                </View>
                <View
                    style={{
                        //flex: 1,
                        marginTop: 30,
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignContent: 'center',
                        width: '100%',
                    }}
                >
                    <SurfaceCmn text="Kontakt" onPress={() => router.push('/contact/contact')}>
                        <MaterialCommunityIcons
                            name="contacts-outline"
                            size={32}
                            color={theme.colors.primary}
                        />
                    </SurfaceCmn>
                    <SurfaceCmn text="Blogg">
                        <MaterialCommunityIcons
                            name="message-text-outline"
                            size={32}
                            color={theme.colors.primary}
                        />
                    </SurfaceCmn>
                    <SurfaceCmn text="Info" onPress={() => router.push('/info/info')}>
                        <MaterialCommunityIcons
                            name="newspaper-variant-outline"
                            size={32}
                            color={theme.colors.primary}
                        />
                    </SurfaceCmn>
                </View>
            </View>
        </ScreenCmn>
    )
}

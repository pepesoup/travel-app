import { appThemeState } from '../../theme/themeStates'
import { ButtonCmn, ScreenCmn, SurfaceCmn, TextCmn, TextInputCmn } from '../../components/common'
import { Link, SplashScreen, Stack, router, useRouter } from 'expo-router'
import { useEffect } from 'react'
import { Button, ScrollView, StyleSheet, View } from 'react-native'
import { Avatar, Surface, Text, useTheme } from 'react-native-paper'

export default function Login() {
    const theme = useTheme()
    useEffect(() => {
        SplashScreen.hideAsync()
    }, [])

    return (
        <ScreenCmn>
            <Stack.Screen
                options={{
                    title: 'Logga in',
                }}
            />

            <View
                style={{
                    width: 130,
                    height: 130,
                    borderRadius: 65,
                    backgroundColor: 'rgb(235, 186, 212)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 30,
                    marginBottom: 20,
                }}
            >
                <TextCmn style={{ color: 'white' }} variant="titleLarge">
                    Retreafy
                </TextCmn>
            </View>
            <View style={{ marginHorizontal: 40 }}>
                <TextInputCmn label="E-post" style={{ backgroundColor: 'white' }} />
                <TextInputCmn label="Lösenord" style={{ backgroundColor: 'white' }} />
            </View>
            <ButtonCmn
                title="Logga in"
                onPress={() => router.replace('/retreafy/retreafy')}
                mode="contained"
            />
            <TextCmn style={{ textDecorationLine: 'underline' }} variant="titleSmall">
                Glömt lösenord?
            </TextCmn>
        </ScreenCmn>
    )
}

import React, { Suspense, useEffect, useRef, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { RecoilRoot, useRecoilValue } from 'recoil'
import RecoilNexus from 'recoil-nexus'
import { PaperProvider, Text } from 'react-native-paper'
import LottieOverlay from '@rn-components/overlay/lottieOverlay'
import { Link, Slot, Stack } from 'expo-router'
import { themeService } from '../theme/themeService'
import {
    darkNavTheme,
    darkTheme,
    lightNavTheme,
    lightTheme,
    retreafyNavTheme,
    retreafyTheme,
} from '../theme/themesDef'
import { ThemeProvider } from '../theme/themeProvider'
var Color = require('color2')
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { RowCmn, TextCmn } from '@rn-components/commonUi'
import { StatusBar } from 'expo-status-bar'

/**
 *
 * TODO:
 *  fix theme provider, pick one solution here
 */

export default function App() {
    const theme = retreafyTheme
    //const theme = darkTheme
    useEffect(() => {}, [])
    var color = new Color(theme.colors.primaryContainer)

    const headerRight = () => {
        return (
            <RowCmn>
                <Link href="/notes/notes">
                    <MaterialCommunityIcons name="bell-badge-outline" size={24} color={'white'} />
                </Link>
                <MaterialIcons name="settings" size={24} color={'white'} />
            </RowCmn>
        )
    }

    const modalHeaderLeft = () => {
        return (
            <TextCmn style={{ color: 'white', marginBottom: -15 }}>
                <Link href="../">Stäng</Link>
            </TextCmn>
        )
    }

    return (
        <RecoilRoot>
            <RecoilNexus />
            <ThemeProvider theme={theme}>
                <SafeAreaProvider>
                    <SafeAreaView
                        style={{
                            flex: 1,
                            backgroundColor: theme.colors.primaryContainer,
                        }}
                    >
                        <Suspense>
                            <LottieOverlay />
                            <StatusBar style="light" />
                            <StatusBar style="light" />
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
                                initialRouteName="/retreafy/index"
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
                                    name="auth/login"
                                    options={{
                                        title: 'Login',
                                        // Set the presentation mode to modal for our modal route.
                                        //presentation: 'modal',
                                        headerRight: () => null,
                                        headerLeft: () => null,
                                    }}
                                />
                            </Stack>
                        </Suspense>
                    </SafeAreaView>
                </SafeAreaProvider>
            </ThemeProvider>
        </RecoilRoot>
    )
}

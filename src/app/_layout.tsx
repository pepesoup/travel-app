import { useEffect } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Slot, Stack, SplashScreen as ss1 } from 'expo-router'
import { retreafyTheme } from '../theme/themesDef'
import { StatusBar } from 'expo-status-bar'
import { DataProvider } from '@rne-firebase/components/data/dataProvider/dataProvider'
import { useAuthStoreBase } from '@rne-firebase/stores/authStore'
import { PaperProvider, Portal, useTheme } from 'react-native-paper'
import { View, StyleSheet } from 'react-native'
var Color = require('color2')

export default function App() {
    const theme = retreafyTheme

    return (
        <PaperProvider theme={theme}>
            <Portal>
                <Test>
                    <SafeAreaProvider>
                        <SafeAreaView style={{ flex: 1 }}>
                            <StatusBar style="light" />
                            <Slot />
                        </SafeAreaView>
                    </SafeAreaProvider>
                </Test>
            </Portal>
        </PaperProvider>
    )
}

const Test = (props: any) => {
    const theme = useTheme()
    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    bottom: -50,
                    backgroundColor: theme.colors.primaryContainer,
                    zIndex: 0,
                }}
            />
            <View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    top: 75,
                    backgroundColor: theme.colors.background,
                    zIndex: 0,
                }}
            />
            {props.children}
        </View>
    )
}

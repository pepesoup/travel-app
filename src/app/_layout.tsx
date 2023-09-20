import { useEffect } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Slot, Stack, SplashScreen as ss1 } from 'expo-router'
import { retreafyTheme } from '../theme/themesDef'
import { StatusBar } from 'expo-status-bar'
import { DataProvider } from '@rne-firebase/components/data/dataProvider/dataProvider'
import { useAuthStoreBase } from '@rne-firebase/stores/authStore'
import { PaperProvider, Portal } from 'react-native-paper'
var Color = require('color2')

/**
 * TODO:
 */

export default function App() {
    const theme = retreafyTheme

    return (
        <PaperProvider theme={theme}>
            <Portal>
                <SafeAreaProvider>
                    <SafeAreaView
                        style={{
                            flex: 1,
                            backgroundColor: theme.colors.primaryContainer,
                        }}
                    >
                        <StatusBar style="light" />
                        <Slot />
                    </SafeAreaView>
                </SafeAreaProvider>
            </Portal>
        </PaperProvider>
    )
}

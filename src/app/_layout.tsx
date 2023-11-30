import { useEffect } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Slot, Stack, SplashScreen as ss1 } from 'expo-router'
import { retreafyTheme } from '../theme/themesDef'
import { StatusBar } from 'expo-status-bar'
import { DataProvider } from '@rne-firebase/components/data/dataProvider/dataProvider'
import { useAuthStoreBase } from '@rne-firebase/stores/authStore'
import { PaperProvider, Portal, useTheme } from 'react-native-paper'
import { View, StyleSheet } from 'react-native'
import { SendbirdUIKitContainer } from '@sendbird/uikit-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    PlayerServiceInterface,
    RecorderServiceInterface,
} from '@sendbird/uikit-react-native';
import { FileService, MediaService, ClipboardService, NotificationService,  } from '../components/sendbird'

var Color = require('color2')

export default function App() {
    const theme = retreafyTheme

    return (
        <PaperProvider theme={theme}>
            <SendbirdUIKitContainer
                appId={'APP_ID'}
                chatOptions={{ localCacheStorage: AsyncStorage }}
                platformServices={{
                    file: FileService,
                    notification: NotificationService,
                    clipboard: ClipboardService,
                    media: MediaService,
                    player: {} as PlayerServiceInterface,
                    recorder: {} as RecorderServiceInterface,
                }}
            >
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
            </SendbirdUIKitContainer>
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
                    top: 50,
                    backgroundColor: theme.colors.background,
                    zIndex: 0,
                }}
            />
            {props.children}
        </View>
    )
}

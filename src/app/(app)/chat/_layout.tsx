import 'react-native-gesture-handler'
import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { OverlayProvider, Chat } from 'stream-chat-expo'
import { StreamChat } from 'stream-chat'
import { chatApiKey } from '@src/getStream/getStreamConfig'

const chatClient = StreamChat.getInstance(chatApiKey)

export default function LayoutChat0() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <OverlayProvider>
                <Chat client={chatClient}>
                    <Stack />
                </Chat>
            </OverlayProvider>
        </GestureHandlerRootView>
    )
}

import { Channel, MessageList, MessageInput } from 'stream-chat-expo' // Or stream-chat-expo
import { View, Text } from 'react-native'
import { Stack, router } from 'expo-router'
import { useChatStore } from '@src/getStream/getStreamStore'
import { initChat } from '@root/src/getStream/initChat'

export default function channelChat() {
    // Init of chat client
    initChat()
    const chatStore = useChatStore()

    return (
        <>
            <Stack.Screen
                options={{
                    title: chatStore.channel?.data?.name,
                }}
            />
            {!chatStore.chatIsReady || !chatStore.channel ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 30 }}>
                    <Text>Loading chat ...</Text>
                </View>
            ) : (
                <Channel channel={chatStore.channel}>
                    <MessageList
                        onThreadSelect={(message) => {
                            if (chatStore.channel?.id) {
                                chatStore.actions.setThread(message)
                                router.push('chat/chatThread')
                            }
                        }}
                    />
                    <MessageInput />
                </Channel>
            )}
        </>
    )
}

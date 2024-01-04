import { Channel, MessageList, MessageInput } from 'stream-chat-expo' // Or stream-chat-expo
import { View, Text } from 'react-native'
import { Stack, router } from 'expo-router'
import { useChatStore } from '@src/getStream/getStreamStore'
import { useChat } from '@root/src/getStream/useChat'
import { useEffect } from 'react'
import { useAccountStore } from '@root/src/stores/user/accountStore'

export default function channelChat() {
    // Init of chat client
    // initChat()
    const chatStore = useChatStore()
    const accountStore = useAccountStore()
    useEffect(() => {
        useChat()
    }, [accountStore.content.myTravelPlans.selectedTravel.id])

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
                <Channel
                    channel={chatStore.channel}
                    keyboardVerticalOffset={140}
                >
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

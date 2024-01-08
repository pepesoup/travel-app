import { Channel, MessageList, MessageInput } from 'stream-chat-expo' // Or stream-chat-expo
import { View, Text } from 'react-native'
import { Stack, router } from 'expo-router'
import { useChatStore } from '@src/getStream/getStreamStore'
import { chatClient, useChat } from '@root/src/getStream/useChat'
import { useEffect } from 'react'
import { useAccountStore } from '@root/src/stores/user/accountStore'
import MessageHeader from './messageHeader'


export default function channelChat() {
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
                <Channel
                    channel={chatStore.channel}
                    keyboardVerticalOffset={140}
                    MessageHeader={(props) =>
                        props.message?.user?.id !== chatClient.userID ? (
                            <MessageHeader 
                                senderName={ props?.message?.user?.name || '' }
                                messageTime={ props.formattedDate}
                            />
                        ) : null
                    }
                    MessageFooter={() => null}
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

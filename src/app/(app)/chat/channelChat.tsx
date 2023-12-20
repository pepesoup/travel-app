import { Channel, MessageList, MessageInput } from 'stream-chat-expo' // Or stream-chat-expo
import { View, Text } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { useChatStore } from '@src/getStream/getStreamStore'

export default function channelChat() {
    const chatStore = useChatStore()
    return (
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
    )
}

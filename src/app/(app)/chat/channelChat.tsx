import { Channel, MessageList, MessageInput } from 'stream-chat-expo' // Or stream-chat-expo
import { View, Text } from 'react-native'
import React from 'react'
import { useChatContext } from '@src/getStream/chatContext'
import { router } from 'expo-router'

export default function channelChat() {
    const { channel, setThread }: any = useChatContext()
    return (
        <Channel channel={channel}>
            <MessageList
                onThreadSelect={(message) => {
                    if (channel?.id) {
                        setThread(message)
                        router.push('chat/chatThread')
                    }
                }}
            />
            <MessageInput />
        </Channel>
    )
}

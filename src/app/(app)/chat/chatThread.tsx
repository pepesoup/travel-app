import { View, Text } from 'react-native'
import React from 'react'
import { Channel, Thread } from 'stream-chat-expo'
import { useChatStore } from '@src/getStream/getStreamStore'

export default function chatThread() {
    const chatStore = useChatStore()
    return (
        <Channel channel={chatStore.channel} thread={chatStore.thread} threadList>
            <Thread />
        </Channel>
    )
}

import { View, Text } from 'react-native'
import React from 'react'
import { useChatContext } from '@src/getStream/chatContext'
import { Channel, Thread } from 'stream-chat-expo' // Or stream-chat-expo

export default function chatThread() {
    const { channel, thread }: any = useChatContext()
    return (
        <Channel channel={channel} thread={thread} threadList>
            <Thread />
        </Channel>
    )
}

import { View, Text } from 'react-native'
import React from 'react'
import { Channel, Thread } from 'stream-chat-expo'
import { useChatStore } from '@src/getStream/getStreamStore'
import { Stack } from 'expo-router'

export default function chatThread() {
    const chatStore = useChatStore()
    return (
        <>
        <Stack.Screen
            options={{
                title: 'Channel Thread', 
            }}
        />
        <Channel channel={chatStore.channel} thread={chatStore.thread} threadList>
            <Thread />
        </Channel> 
        </>
    )
}

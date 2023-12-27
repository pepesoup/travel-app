import { View, Text } from 'react-native'
import React from 'react'
import { ChannelList } from 'stream-chat-expo' // Or stream-chat-expo
import { Stack, router } from 'expo-router'
import { useChatStore } from '@src/getStream/getStreamStore'
import { useAccountStore } from '@root/src/stores/user/accountStore'

export default function channelList() {
    const chatStore = useChatStore()
    const accountStore = useAccountStore()
    const filters = {
        members: {
            $in: [accountStore.content.chat.user.id],
        },
    }

    const sort: any = {
        last_message_at: -1,
    }

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Channel list',
                }}
            />

            <ChannelList
                filters={filters}
                sort={sort}
                onSelect={(channel) => {
                    chatStore.actions.setChannel(channel)
                    router.push('chat/channelChat')
                }}
            />
        </>
    )
}

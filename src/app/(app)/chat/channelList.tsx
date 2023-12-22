import { View, Text } from 'react-native'
import React from 'react'
import { ChannelList } from 'stream-chat-expo' // Or stream-chat-expo
import { router } from 'expo-router'
import { useChatStore } from '@src/getStream/getStreamStore'
import { useAccountStore } from '@root/src/stores/user/accountStore'


const filters = {
    members: {
        $in: useAccountStore.getState().content.uid,
    },
}

const sort: any = {
    last_message_at: -1,
}

export default function channelList() {
    const chatStore = useChatStore()

    return (
        <ChannelList
            filters={filters}
            sort={sort}
            onSelect={(channel) => {
                chatStore.actions.setChannel(channel)
                router.push('chat/channelChat')
            }}
        />
    )
}

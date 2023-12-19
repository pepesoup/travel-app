import { View, Text } from 'react-native'
import React from 'react'
import { ChannelList } from 'stream-chat-expo' // Or stream-chat-expo
import { chatApiKey, chatUsers, chatUserIndex } from '@src/getStream/getStreamConfig'
import { useChatContext } from '@root/src/getStream/chatContext'
import { router } from 'expo-router'

const filters = {
    members: {
        $in: [chatUsers[chatUserIndex].chatUserId],
    },
}

const sort: any = {
    last_message_at: -1,
}

export default function channelList() {
    const { setChannel } = useChatContext()

    return (
        <ChannelList
            filters={filters}
            sort={sort}
            onSelect={(channel) => {
                setChannel(channel)
                router.push('chat/channelChat')
            }}
        />
    )
}

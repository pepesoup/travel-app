import { useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat'
import { chatApiKey, chatSecretKey } from './getStreamConfig'
import { useChatStore } from '@src/getStream/getStreamStore'
import { Account, useAccountStore } from '../stores/user/accountStore'
import JWT from 'expo-jwt'
import { SupportedAlgorithms } from 'expo-jwt/dist/types/algorithms'
import { useTravelStore } from '../stores/travels/travelStore'
import { Channel } from 'stream-chat/dist/types'
import { DefaultGenerics } from 'stream-chat/dist/types'

const chatClient = StreamChat.getInstance(chatApiKey)
function getChatUserNameSufix() {
    return Math.floor(Math.random() * 100)
}

const createToken = (userId: string) => {
    const token = JWT.encode({ user_id: userId }, chatSecretKey, {
        algorithm: SupportedAlgorithms.HS256,
    })
    return token
}

const setupNewChatUser = (): Account['chat'] => {
    const chatUser = {
        user: {
            id: useAccountStore.getState().content.uid,
            name: `Resekompis-${getChatUserNameSufix()}`,
        },
        userToken: '',
    }

    chatUser.userToken = createToken(chatUser.user.id)
    useAccountStore.getState().actions.setChatUserInfo(chatUser)
    console.log('creating user ', chatUser.user.name)
    return chatUser
}

const getChatUser = (): Account['chat'] => {
    // exising user
    if (useAccountStore.getState()?.content?.chat) {
        console.log('exising user')
        return useAccountStore.getState().content.chat
    }

        return setupNewChatUser()
}

const createChatChannel = async (): Promise<Channel<DefaultGenerics>> => {
    // Create a chat channel for the current travel.
    // Set channel in the chat store.
    const channel = chatClient.channel(
        //provide channel type
        'messaging',
        //provide id for channel
        useAccountStore.getState().content.myTravelPlans.selectedTravel.id,
        // channel name set
        {
            name: `${
                useAccountStore.getState().content.myTravelPlans.selectedTravel.name
            }-resenärer`,
        }
    )

    await channel.create()
    console.log('Created channel with id ', useAccountStore.getState().content.myTravelPlans.selectedTravel.id)

    useTravelStore
        .getState()
        .actions.setChatChannelId(
            useAccountStore.getState().content.myTravelPlans.selectedTravel.id
        )

    return channel
}

const getChatChannel = async (): Promise<Channel<DefaultGenerics>> => {
    // If chat channel for current travel is found in db
    // use that.
    if (useTravelStore.getState()?.content?.chat?.channelId) {
        console.log('chat channel for current travel is found in db')
        const filter = { id: { $eq: useTravelStore.getState()?.content?.chat?.channelId } }
        const channels = await chatClient.queryChannels(filter)
        return channels[0]
    }

    return await createChatChannel()
}

export const useChat = async () => {
    try {
        useChatStore.getState().actions.setChatIsReady(false)
        // Get chat user and connect.
        const chatUserInfo = getChatUser()
        // If the chat client has a value in the field `userID`,
        // a user is already connected and we can skip trying
        // to connect the user again.
        if (!chatClient.userID) {
            await chatClient.connectUser(chatUserInfo.user, chatUserInfo.userToken)
        }
        console.log('User connected')

        // Get the chat channel for selected travel
        const channel = await getChatChannel()
        useChatStore.getState().actions.setChannel(channel)

        // Add the user as a member to the channel.
        if (
            !(useTravelStore.getState()?.content?.chat?.userIds || []).includes(
                chatUserInfo.user.id
            )
        ) {
            await channel.addMembers([{ user_id: chatUserInfo.user.id }])
            console.log('Added member to channel')
            useTravelStore.getState()?.actions.addChatChannelMember(chatUserInfo.user.id)
        }

        // Set chat client is ready in chat store.
        useChatStore.getState().actions.setChatIsReady(true)
    } catch (error) {
        if (error instanceof Error) {
            console.error(`An error occurred while connecting the user: ${error.message}`)
        }
        useChatStore.getState().actions.setChatIsReady(false)
    }
}


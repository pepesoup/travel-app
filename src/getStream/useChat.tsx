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
import { addMemberToChannel } from './getStreamApi'

export const chatClient = StreamChat.getInstance(chatApiKey)
function getChatUserNameSufix() {
    return Math.floor(Math.random() * 100)
}

const createToken = (userId: string) => {
    const token = JWT.encode({ user_id: userId }, chatSecretKey, {
        algorithm: SupportedAlgorithms.HS256,
    })
    return token
}

const getUserName = () => {
    return useAccountStore.getState()?.content?.profile?.nickName 
        || useAccountStore.getState()?.content?.profile?.name 
        || `Resekompis-${getChatUserNameSufix()}`
}
const setupNewChatUser = (): Account['chat'] => {
    const chatUser = {
        user: {
            id: useAccountStore.getState().content.uid,
            name: getUserName(), 
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

const createChatChannel = async () => {
    const newChannelId = useAccountStore.getState().content.myTravelPlans.selectedTravel.id
    // Create a chat channel for the selected travel.
    const channel = chatClient.channel(
        //provide channel type
        'messaging',
        //provide id for channel
        newChannelId,
        // channel name set
        {
            name: `${
                useAccountStore.getState().content.myTravelPlans.selectedTravel.name
            }-resenärer`,
        }
    )

    await channel.create()
    console.log('Created channel with id ', newChannelId)
    
    // Set channelid in the travel store.
    useTravelStore.getState().actions.setChatChannelId(newChannelId)
}

const checkIfUserIsAddedToChannel = (userId: string): boolean => {
    return (useTravelStore.getState()?.content?.chat?.userIds || []).includes(userId)
}

const checkIfChannelExists = (): boolean => {
    return (useTravelStore.getState()?.content?.chat?.channelId || '').length > 0 
}

const setupChannel = async (userId: string): Promise<Channel<DefaultGenerics>> => {
    // If chat channel for current travel is not found in db, create one
    if(!checkIfChannelExists()) {
        console.log('No channel id found in the db, creating channel')
        await createChatChannel()
    }

    const channelId = useTravelStore.getState().content.chat.channelId

    // If user is not added to the channel, add user here
    if (!checkIfUserIsAddedToChannel(userId)) {
        await addMemberToChannel('messaging', channelId, userId)
        useTravelStore.getState()?.actions.addChatChannelMember(userId)
    }

    // Get channel here
    const filter = { id: { $eq: channelId } }
    const channels = await chatClient.queryChannels(filter)
    return channels[0]     
}

export const updateChatUser = async() => {
    const chatUser = {
        user: {
            id: useAccountStore.getState().content.uid,
            name: getUserName(), 
        },
        userToken: useAccountStore.getState()?.content?.chat?.userToken || '',
    }

    if(chatUser.userToken === '') {
        chatUser.userToken = createToken(chatUser.user.id)
    }

    await chatClient.upsertUser(chatUser.user);
    useAccountStore.getState().actions.setChatUserInfo(chatUser)
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
        const channel = await setupChannel(chatUserInfo.user.id)
        useChatStore.getState().actions.setChannel(channel)

        // Set chat client is ready in chat store.
        useChatStore.getState().actions.setChatIsReady(true)
    } catch (error) {
        if (error instanceof Error) {
            console.error(`An error occurred while connecting the user: ${error.message}`)
        }
        useChatStore.getState().actions.setChatIsReady(false)
    }
}


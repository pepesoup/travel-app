import { useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat'
import { chatApiKey, chatSecretKey } from './getStreamConfig'
import { useChatStore } from '@src/getStream/getStreamStore'
import { Account, useAccountStore } from '../stores/user/accountStore'
import JWT from 'expo-jwt'

const chatClient = StreamChat.getInstance(chatApiKey)
const _chatUser = 'testUserA'

const createToken = (userId: string) => {
    const token = JWT.encode({ user_id: userId }, chatSecretKey, { algorithm: 'HS256' })
    console.log('token:', token)
    return token
}

const setupNewChatUser = (): Partial<Account['chat']> => {
    const chatUser = {
        user: {
            //id: useAccountStore.getState().content.uid,
            //name: useAccountStore.getState().content.profile.name,
            id: _chatUser,
            name: _chatUser,
        },
        userToken: '',
    }
    //const userToken = chatClient.createToken(useAccountStore.getState().content.uid)
    chatUser.userToken = createToken(chatUser.user.id)
    return chatUser
}

const getChatUser = (): Partial<Account['chat']> => {
    // exising user
    if (useAccountStore.getState()?.content?.chat) {
        return useAccountStore.getState().content.chat
    }

    return setupNewChatUser()
}

export const setupClient = async (setClientIsReady: any | ((ready: boolean) => void)) => {
    try {
        const chatUserInfo = getChatUser()
        chatClient.connectUser(chatUserInfo.user, chatUserInfo.userToken)
        setClientIsReady && setClientIsReady(true)
        useChatStore.getState().actions.setClientIsReady(true)

        // connectUser is an async function. So you can choose to await for it or not depending on your use case (e.g. to show custom loading indicator)
        // But in case you need the chat to load from offline storage first then you should render chat components
        // immediately after calling `connectUser()`.
        // BUT ITS NECESSARY TO CALL connectUser FIRST IN ANY CASE.
    } catch (error) {
        if (error instanceof Error) {
            console.error(`An error occurred while connecting the user: ${error.message}`)
        }
        useChatStore.getState().actions.setClientIsReady(false)
    }
}

export const useChatClient = () => {
    const [clientIsReady, setClientIsReady] = useState(false)

    useEffect(() => {
        // If the chat client has a value in the field `userID`, a user is already connected
        // and we can skip trying to connect the user again.
        if (!chatClient.userID) {
            setupClient(setClientIsReady)
        }
    }, [])

    return {
        clientIsReady,
    }
}

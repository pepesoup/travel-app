import {
    GETSTREAM_APIKEY,
    GETSTREAM_TESTUSER_TOKEN1,
    GETSTREAM_TESTUSER_TOKEN2,
    GETSTREAM_TESTUSER_TOKEN3,
} from '@env'

export const chatApiKey = GETSTREAM_APIKEY
export const chatUserIndex = 1
export const chatUsers = [
    {
        chatUserId: 'testUser1',
        chatUserToken: GETSTREAM_TESTUSER_TOKEN1,
        chatUserName: 'testUser1',
    },
    {
        chatUserId: 'testUser2',
        chatUserToken: GETSTREAM_TESTUSER_TOKEN2,
        chatUserName: 'testUser2',
    },
    {
        chatUserId: 'testUser3',
        chatUserToken: GETSTREAM_TESTUSER_TOKEN3,
        chatUserName: 'testUser3',
    },
]

import { chatApiAuthToken, chatApiKey } from './getStreamConfig'

export async function addMemberToChannel(channelType: string, channelId: string, userId: string) {
    const body = {
        "add_members" : [userId]
    }
    return await post(channelType, channelId, body)
}

export async function getChannel(channelType: string, channelId: string) {
    const body = {
        "data" : { }
    }
    return await post(channelType, channelId, body)
}

async function post(channelType: string, channelId: string, apiBody: any) {
    const apiUrl = 'https://chat.stream-io-api.com'
    const apiEndPoint = 'channels'
    const apiQuery = `api_key=${chatApiKey}`
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Stream-Auth-Type': 'jwt',
        'Authorization': chatApiAuthToken
    }   
    const requestOptions = {
        method: 'POST',
        headers,
        body: JSON.stringify(apiBody)
    };

   try {
        const response = await fetch(`${apiUrl}/${apiEndPoint}/${channelType}/${channelId}?${apiQuery}`, requestOptions)
        return await response.json()
   } catch (error) {
    console.log('post api failed with ', error)
   }
}
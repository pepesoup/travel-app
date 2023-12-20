import { Text, View } from 'react-native'
import { useChatClient } from '@src/getStream/useChatClient'
import { Link } from 'expo-router'
import { useChatStore } from '@src/getStream/getStreamStore'

/** TODO:
 * Store the active chat-route
 * So, when exiting & returning to chat, if it was active before -> load the last saved chat-route
 *
 */

export default function Page() {
    const { clientIsReady } = useChatClient() // this is the init of chat client
    const chatStore = useChatStore()

    if (!chatStore.clientIsReady) {
        return <Text>Loading chat ...</Text>
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 30 }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Chat Home Page</Text>
            <Link href="/chat/channelList">Channel List</Link>
        </View>
    )
}

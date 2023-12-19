import { Text, View } from 'react-native'
import { useChatClient } from '@src/getStream/useChatClient'
import { Link } from 'expo-router'

export default function Page() {
    const { clientIsReady } = useChatClient()

    if (!clientIsReady) {
        return <Text>Loading chat ...</Text>
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 30 }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Chat Home Page</Text>
            <Link href="/chat/channelList">Channel List</Link>
        </View>
    )
}

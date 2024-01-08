import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";

type Props = {
    senderName: string,
    messageTime: string | Date
}

const MessageHeader: React.FC<Props> = ({ senderName, messageTime }) => {
    const theme = useTheme()

    return (
        <View
            style={{ flexDirection: 'row' }}
        >
            <Text style={[{ color: theme.colors.secondary, marginRight: 8 }]}>
                {senderName}
            </Text>
            <Text style={[{ color: theme.colors.secondary }]}>
                {typeof messageTime === 'string' ? messageTime : messageTime.toDateString()}
            </Text>
        </View>
    )
}

export default MessageHeader

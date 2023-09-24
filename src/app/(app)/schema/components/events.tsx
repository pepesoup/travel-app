import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { eventTypes } from '@root/src/constants/event.constants'
import { IconCmn, TextCmn } from '@root/src/rn-components/src/components/commonUi'
import { View, ViewStyle } from 'react-native'
import { useTheme } from 'react-native-paper'

/**
 * Used for picker -> to choose event
 *
 * */

type Props = {
    size: number
    color: string
    withLabel?: boolean
}

const Label = ({ text }: any) => <TextCmn>{text}</TextCmn>

export const eventsList = ({ size, color, withLabel }: Props) => {
    const theme = useTheme()
    const containerStyle: ViewStyle = {
        flexDirection: 'row',
        gap: 20,
        //backgroundColor: 'red',
        width: 120,
        //alignItems: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }

    const list = Object.entries(eventTypes).map(([key, eventType]) => {
        return {
            name: key,
            icon: (
                <View style={containerStyle}>
                    <IconCmn
                        name={eventType.icon.name as any}
                        type={eventType.icon.type}
                        size={size}
                        color={color}
                        allowFontScaling={true}
                    />
                    {withLabel ? <Label text={key} /> : null}
                </View>
            ),
        }
    })
    return list
}

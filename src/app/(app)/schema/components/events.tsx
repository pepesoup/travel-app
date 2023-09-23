import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { eventTypes } from '@root/src/constants/event.constants'
import { IconCmn, TextCmn } from '@root/src/rn-components/src/components/commonUi'
import { View, ViewStyle } from 'react-native'
import { useTheme } from 'react-native-paper'

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

    return [
        {
            name: 'walk',
            icon: (
                <View style={containerStyle}>
                    <MaterialCommunityIcons
                        name="walk"
                        size={size}
                        color={color}
                        allowFontScaling={true}
                    />
                    {withLabel ? <Label text="Walk" /> : null}
                </View>
            ),
        },
        {
            name: 'meal',
            icon: (
                <View style={containerStyle}>
                    <MaterialCommunityIcons
                        name="silverware-fork-knife"
                        size={size}
                        color={color}
                        allowFontScaling={true}
                    />
                    {withLabel ? <Label text="Meal" /> : null}
                </View>
            ),
        },
        {
            name: 'yoga',
            icon: (
                <View style={containerStyle}>
                    <MaterialCommunityIcons
                        name="meditation"
                        size={size}
                        color={color}
                        allowFontScaling={true}
                    />
                    {withLabel ? <Label text="Yoga" /> : null}
                </View>
            ),
        },
        {
            name: 'exercise',
            icon: (
                <View style={containerStyle}>
                    <Ionicons
                        name="barbell-outline"
                        size={size}
                        color={color}
                        allowFontScaling={true}
                    />
                    {withLabel ? <Label text="Exercise" /> : null}
                </View>
            ),
        },
        {
            name: 'lecture',
            icon: (
                <View style={containerStyle}>
                    <MaterialCommunityIcons
                        name="human-male-board-poll"
                        size={size}
                        color={color}
                        allowFontScaling={true}
                    />
                    {withLabel ? <Label text="Lecture" /> : null}
                </View>
            ),
        },
    ]
}

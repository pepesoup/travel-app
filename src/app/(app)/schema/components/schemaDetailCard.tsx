import { appThemeState } from '../../../../theme/themeStates'
import { View } from 'react-native'
import { TextCmn } from '@rn-components/commonUi'
import _ from 'lodash'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import merge from 'ts-deepmerge'
import { useTheme } from 'react-native-paper'
import { Event, EventType } from '@src/stores/types'

export type Props = {
    time: string
    event: Event
    style?: any
}

const Icon = (type: EventType, color: string) => {
    switch (type.name) {
        case 'walk':
            return <MaterialCommunityIcons name="walk" size={32} color={color} />
        case 'meal':
            return <MaterialCommunityIcons name="silverware-fork-knife" size={32} color={color} />
        case 'yoga':
            return <MaterialCommunityIcons name="meditation" size={32} color={color} />
        case 'exercise':
            return <Ionicons name="barbell-outline" size={32} color={color} />
        case 'lecture':
            return <MaterialCommunityIcons name="human-male-board-poll" size={32} color={color} />
    }
}

export const SchemaDetailCard = ({ time, event, style }: Props) => {
    const theme = useTheme()
    const height = 80
    const margin = 20

    const _style = merge(
        {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: height,
        },
        style || {}
    )

    return (
        <View style={_style}>
            <View>
                <TextCmn variant="titleMedium">{time}</TextCmn>
            </View>
            <View
                style={{
                    width: height - margin,
                    height: height - margin,
                    backgroundColor: 'white',
                    borderRadius: height / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 15,
                }}
            >
                <View
                    style={{
                        backgroundColor: 'white',
                        position: 'absolute',
                        top: -margin,
                        width: 10,
                        height: height,
                    }}
                />
                {Icon(event.type, theme.colors.primary)}
            </View>
            <View style={{ flex: 1 }}>
                <TextCmn>{event.description}</TextCmn>
            </View>
        </View>
    )
}

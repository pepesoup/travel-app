import { appThemeState } from "../../theme/themeStates"
import { View } from "react-native"
import { useRecoilValue } from "recoil"
import { TextCmn } from "../common"
import _ from "lodash";
import { useState } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import merge from "ts-deepmerge";

export type Props = {
    dayEvent: {
        time: string
        type: 'walk' | 'meal' | 'yoga' | 'exercise' | 'lecture'
        label: string
    }
    style?: any
}

const Icon = (type: Props['dayEvent']['type'], color: string) => {
    switch (type) {
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

export const SchemaDetailCard = ({ dayEvent, style }: Props) => {
    const theme = useRecoilValue(appThemeState)
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
                <TextCmn variant="titleMedium">{dayEvent.time}</TextCmn>
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
                        height: height
                    }}
                />
                {Icon(dayEvent.type, theme.colors.primary)}
            </View>
            <View style={{ flex: 1 }}>
                <TextCmn>{dayEvent.label}</TextCmn>
            </View>
        </View>
    )
}

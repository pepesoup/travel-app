import { appThemeState } from '@app/app/theme/themeStates'
import _ from 'lodash'
import * as React from 'react'
import { View, Pressable, Dimensions, Image, ScrollView, StyleSheet } from 'react-native'
import { IconButton } from 'react-native-paper'
import { useRecoilValue } from 'recoil'

type Props = {
    navigation: any
    target?: string
    style?: any
}
export const GoBackButton = ({ navigation, target, style }: Props) => {
    const theme = useRecoilValue(appThemeState)

    const _style = {
        ...StyleSheet.absoluteFillObject,
        top: 5,
        left: 5,
        zIndex: 10,
        width: 30,
        height: 30,
    }
    return (
        <View style={[_style, style]} pointerEvents="auto">
            <IconButton
                mode="outlined"
                icon="arrow-left-thin"
                iconColor={theme.colors.primary}
                size={30}
                onPress={() => {
                    target ? navigation.navigate(target) : navigation.goBack()
                }}
                style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
            />
        </View>
    )
}

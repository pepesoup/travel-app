import React from 'react'
import { View, ViewStyle } from 'react-native'
import { Text, Button as PaperButton, ButtonProps as PaperButtonProps } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import merge from 'ts-deepmerge'

export type ButtonProps = Omit<PaperButtonProps, 'children'> & {
    title: string
}

const ButtonCmn = (props: ButtonProps) => {
    const { mode, title, style, labelStyle, ...restProps } = props
    const mergedStyle = merge(
        {
            minWidth: '50%',
            marginVertical: 15,
        } as ViewStyle,
        style || {}
    )
    const mergedLabelStyle = merge(
        {
            fontSize: 18,
        } as ViewStyle,
        labelStyle || {}
    )
    return (
        <PaperButton
            mode={mode || 'outlined'}
            style={mergedStyle}
            labelStyle={mergedLabelStyle}
            {...restProps}
        >
            {title}
        </PaperButton>
    )
}
export default ButtonCmn

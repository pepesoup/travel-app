import React from 'react'
import { View, ViewStyle } from 'react-native'
import {
    TextInput as PaperTextInput,
    TextInputProps as PaperTextInputProps,
} from 'react-native-paper'
import merge from 'ts-deepmerge'

const TextInputCmn = (props: PaperTextInputProps) => {
    const { mode, style, outlineStyle, ...restProps } = props
    const mergedStyle = merge(
        {},
        {
            minWidth: '100%',
            marginVertical: 10,
            backgroundColor: 'transparent',
        } as ViewStyle,
        style || {}
    )
    const mergedOutlineStyle = merge(
        {},
        {
            borderwidth: 1,
            marginVertical: 5,
            borderColor: 'rgba(74, 68, 88, .5)',
        } as ViewStyle,
        outlineStyle || {}
    )

    return (
        <PaperTextInput
            mode={mode || 'outlined'}
            style={mergedStyle}
            outlineStyle={mergedOutlineStyle}
            {...restProps}
        />
    )
}
export default TextInputCmn

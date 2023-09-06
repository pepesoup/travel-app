import React from 'react'
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native'
import { Text as PaperText, TextProps as PaperTextProps } from 'react-native-paper'
import merge from 'ts-deepmerge'
export type TextProps = ViewProps & {
    children: any
}

const RowCmn = (props: TextProps) => {
    const { children, style, ...restProps } = props
    const _style = merge(
        {
            //flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            //backgroundColor: 'red',
            gap: 6,
        },
        style || {}
    )

    return (
        <View style={_style} {...restProps}>
            {children}
        </View>
    )
}

export default RowCmn

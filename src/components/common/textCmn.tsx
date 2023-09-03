import React from 'react'
import { Text as PaperText, TextProps as PaperTextProps } from 'react-native-paper'

export type TextProps = PaperTextProps<any> & {
    children: any
}

const TextCmn = (props: TextProps) => {
    const { children, ...restProps } = props

    return <PaperText {...restProps}>{children}</PaperText>
}

export default TextCmn

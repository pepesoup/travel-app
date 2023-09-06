import * as React from 'react'
import { Surface, Text } from 'react-native-paper'
import { Pressable, StyleSheet, View } from 'react-native'
import merge from 'ts-deepmerge'
import { Shadow } from 'react-native-shadow-2'
import TextCmn from './textCmn'

const SurfaceCmn = ({ onPress, text, size, style, children, containerStyle }: any) => {
    const _style = merge(
        {
            marginBottom: text ? 5 : 0,
            padding: 8,
            height: size || 80,
            width: size || 80,
            //width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            backgroundColor: 'white',
        },
        style || {}
    )

    const _containerStyle = merge({ alignItems: 'center' }, containerStyle || {})

    const _onPress = () => (onPress ? onPress() : null)
    return (
        <Pressable onPress={_onPress}>
            <View style={_containerStyle}>
                <Shadow style={_style} distance={10} offset={[2, 2]} startColor="rgba(0,0,0,0.05)">
                    {children}
                </Shadow>
                {text ? <TextCmn>{text}</TextCmn> : null}
            </View>
        </Pressable>
    )
}

const _SurfaceCmn = ({ size, style, children }: any) => {
    const _style = merge(
        {
            padding: 8,
            height: size || 80,
            width: size || 80,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            marginBottom: 5,
        },
        style || {}
    )
    return (
        <Surface style={_style} elevation={2}>
            {children}
        </Surface>
    )
}

export default SurfaceCmn

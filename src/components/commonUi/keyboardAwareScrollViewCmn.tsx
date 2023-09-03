import React, { useEffect, useState } from 'react'
import {
    KeyboardAwareScrollView,
    KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view'
import { ScrollView } from 'react-native'
import merge from 'ts-deepmerge'

type Props = KeyboardAwareScrollViewProps & {
    transparent?: boolean
    navigateBack?: boolean
}

export const KeyboardAwareScrollViewCmn = (props: Props) => {
    const { children, contentContainerStyle, ...restProps } = props
    const ccStyle = merge(
        {
            flexGrow: 1,
        },
        contentContainerStyle || {}
    )
    return (
        <KeyboardAwareScrollView
            extraScrollHeight={100}
            //automaticallyAdjustContentInsets
            enableOnAndroid
            enableAutomaticScroll
            //keyboardShouldPersistTaps="handled"
            contentContainerStyle={ccStyle}
        >
            <ScrollView
                style={{ flex: 1, width: '100%' }}
                contentContainerStyle={{
                    alignItems: 'center',
                    margin: 20,
                }}
            >
                {children}
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}

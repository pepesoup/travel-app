import React, { useEffect, useState } from 'react'
import {
    KeyboardAwareScrollView,
    KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view'
import _ from 'lodash'
import { ScrollView } from 'react-native'

type Props = KeyboardAwareScrollViewProps & {
    transparent?: boolean
    navigateBack?: boolean
}

export const KeyboardAwareScrollViewCmn = (props: Props) => {
    const { children, contentContainerStyle, ...restProps } = props
    const ccStyle = _.merge(
        {
            flexGrow: 1,
        },
        contentContainerStyle
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

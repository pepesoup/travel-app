import React from 'react'
import { View, ViewStyle } from 'react-native'
import { Text, Switch as PaperSwitch, SwitchProps as PaperSwitchProps } from 'react-native-paper'
import _ from 'lodash'
//import { appThemeState } from '@app/app/theme/themeStates'
import { useRecoilValue } from 'recoil'

export type Props = PaperSwitchProps & {
    theme: any
    label: string
}
/**  
TODO: 
    make theme a dependencymake theme a dependency
    Remove theme from props
*/
const SwitchCmn = (props: Props) => {
    //const theme = useRecoilValue(appThemeState)
    const { theme, label, ...restProps } = props
    return (
        <View
            style={{
                marginVertical: 10,
                //flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text style={{ marginRight: 20 }}>{label}</Text>
            <PaperSwitch {...restProps} color={theme.colors.primary} />
        </View>
    )
}
export default SwitchCmn

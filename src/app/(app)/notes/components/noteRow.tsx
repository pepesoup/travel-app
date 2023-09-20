import { View, ViewStyle } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { GapCmn, RowCmn, ScreenCmn, SurfaceCmn, TextCmn } from '@rn-components/commonUi'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useTheme } from 'react-native-paper'
import merge from 'ts-deepmerge'

export type Props = {
    title: string
    body: string
    date: string
    iconName: any
    containerStyle?: ViewStyle
}

export default function NoteRow({ title, body, date, iconName, containerStyle }: Props) {
    const _containerStyle = merge({}, containerStyle || {})
    const theme = useTheme()
    return (
        <View style={_containerStyle}>
            <RowCmn style={{ alignItems: 'flex-start', gap: 20 }}>
                <SurfaceCmn text="">
                    <MaterialCommunityIcons
                        name={iconName}
                        size={32}
                        color={theme.colors.primary}
                    />
                </SurfaceCmn>
                <View style={{ flex: 1, height: '100%' }}>
                    <TextCmn
                        variant="titleMedium"
                        style={{ fontWeight: '700' }}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                    >
                        {title}
                    </TextCmn>
                    <TextCmn numberOfLines={2} ellipsizeMode="tail">
                        {body}
                    </TextCmn>
                    <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 0 }}>
                        <TextCmn variant="bodySmall">{date}</TextCmn>
                    </View>
                </View>
            </RowCmn>
        </View>
    )
}

/*
<MaterialCommunityIcons
                    name="message-text-outline"
                    size={32}
                    color={theme.colors.primary}
                />
                */

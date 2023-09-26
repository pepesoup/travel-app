import { View, ViewStyle } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { GapCmn, RowCmn, ScreenCmn, SurfaceCmn, TextCmn, IconCmn } from '@rn-components/commonUi'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useTheme } from 'react-native-paper'
import merge from 'ts-deepmerge'
import { Note } from '@root/src/stores/travels/types'
import { useEffect } from 'react'
import { getDateFromTimestamp } from '../utils'
export type Props = {
    note: Note
    containerStyle?: ViewStyle
}

export default function NoteRow({ note, containerStyle }: Props) {
    const _containerStyle = merge(
        {
            flexDirection: 'row',
            width: '100%',
            // fo
        },
        containerStyle || {}
    ) as ViewStyle
    const theme = useTheme()
    const cm = 12

    return (
        <View style={_containerStyle}>
            <View
                style={{
                    justifyContent: 'center',
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'flex-start',
                    //gap: 20,
                }}
            >
                <SurfaceCmn text="">
                    <IconCmn
                        type={note.type.icon.type}
                        name={note.type.icon.name as any}
                        style={{ position: 'absolute', top: cm, left: cm }}
                        size={40}
                        color={theme.colors.primary}
                    />
                    <IconCmn
                        type={note.subIcon.type}
                        name={note.subIcon.name as any}
                        style={{
                            position: 'absolute',
                            right: cm,
                            bottom: cm,
                            backgroundColor: 'rgba(255,255,255, .7)',
                            borderRadius: 10,
                            overflow: 'hidden',
                            padding: 3,
                        }}
                        size={30}
                        color={theme.colors.primaryContainer}
                    />
                </SurfaceCmn>
                <View
                    style={{ flex: 1, height: '100%', paddingVertical: 5, paddingHorizontal: 20 }}
                >
                    <TextCmn
                        variant="titleMedium"
                        style={{ fontWeight: '700' }}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                    >
                        {note.subject}
                    </TextCmn>
                    <TextCmn numberOfLines={2} ellipsizeMode="tail">
                        {note.message}
                    </TextCmn>
                    <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 0 }}>
                        <TextCmn variant="bodySmall">
                            {getDateFromTimestamp(note.timestamp)}
                        </TextCmn>
                    </View>
                </View>
            </View>
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

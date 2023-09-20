import { ScrollView, View } from 'react-native'
import { Link, Stack, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { GapCmn, RowCmn, ScreenCmn, SurfaceCmn, TextCmn } from '@rn-components/commonUi'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Divider, useTheme } from 'react-native-paper'
import NoteRow from './components/noteRow'

export default function Modal() {
    const theme = useTheme()
    return (
        <ScreenCmn style={{ gap: 0, flexDirection: 'column' }}>
            <StatusBar style="light" />
            <ScrollView style={{ width: '100%' }}>
                <GapCmn size={20} direction="vertical" />
                <NoteRow
                    containerStyle={{ marginHorizontal: 30 }}
                    title="Nytt inlägg i bloggen"
                    body="Liten beskrivning om vad det handlar om"
                    date="03 maj kl 19:00"
                    iconName="message-text-outline"
                />
                <GapCmn size={25} direction="vertical" divider />
                <NoteRow
                    containerStyle={{ marginHorizontal: 30 }}
                    title="Ny uppdatering i schemat"
                    body="Liten beskrivning om vad det handlar om"
                    date="03 maj kl 19:00"
                    iconName="calendar-month-outline"
                />
                <GapCmn size={25} direction="vertical" divider />
                <NoteRow
                    containerStyle={{ marginHorizontal: 30 }}
                    title="Nytt inlägg i info"
                    body="Liten beskrivning om vad det handlar om"
                    date="03 maj kl 19:00"
                    iconName="newspaper-variant-outline"
                />
                <GapCmn size={25} direction="vertical" divider />
                <NoteRow
                    containerStyle={{ marginHorizontal: 30 }}
                    title="Träningspass inställt"
                    body="Liten beskrivning om vad det handlar om"
                    date="03 maj kl 19:00"
                    iconName="dumbbell"
                />
                <GapCmn size={25} direction="vertical" divider />
                <NoteRow
                    containerStyle={{ marginHorizontal: 30 }}
                    title="Nytt inlägg i bloggen"
                    body="Liten beskrivning om vad det handlar om"
                    date="03 maj kl 19:00"
                    iconName="message-text-outline"
                />
                <GapCmn size={25} direction="vertical" divider />
                <NoteRow
                    containerStyle={{ marginHorizontal: 30 }}
                    title="Nytt inlägg i bloggen"
                    body="Liten beskrivning om vad det handlar om"
                    date="03 maj kl 19:00"
                    iconName="message-text-outline"
                />
                <GapCmn size={25} direction="vertical" divider />
                <NoteRow
                    containerStyle={{ marginHorizontal: 30 }}
                    title="Nytt inlägg i bloggen"
                    body="Liten beskrivning om vad det handlar om"
                    date="03 maj kl 19:00"
                    iconName="message-text-outline"
                />
                <GapCmn size={25} direction="vertical" divider />
                <NoteRow
                    containerStyle={{ marginHorizontal: 30 }}
                    title="Nytt inlägg i bloggen"
                    body="Liten beskrivning om vad det handlar om"
                    date="03 maj kl 19:00"
                    iconName="message-text-outline"
                />
                <GapCmn size={25} direction="vertical" divider />
                <NoteRow
                    containerStyle={{ marginHorizontal: 30 }}
                    title="Nytt inlägg i bloggen"
                    body="Liten beskrivning.."
                    date="03 maj kl 19:00"
                    iconName="message-text-outline"
                />
                <GapCmn size={25} direction="vertical" divider />
            </ScrollView>
        </ScreenCmn>
    )
}

import { ScrollView, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { GapCmn, ScreenCmn } from '@rn-components/commonUi'
import { Chip, useTheme } from 'react-native-paper'
import NoteRow from './components/noteRow'
import { useTravelStore } from '@root/src/stores/travels/travelStore'
import { Note, Notes } from '@root/src/stores/travels/types'
import { noteTypes } from '@root/src/constants/note.constants'
import { useNotesAlert } from './hooks/useNotesAlert'

export default function Modal() {
    const theme = useTheme()
    const notes = useTravelStore((state) => state.content.notes)
    const addNote = useTravelStore((state) => state.addNote)
    const { getNrOfUnreadNotes, setNotesAreRead, clearStorage } = useNotesAlert()

    const devAddNote = () => {
        const ts = Date.now().toString()
        const newNote: Note = {
            uuid: ts,
            subject: 'hej',
            message: 'hej',
            timestamp: Number(ts),
            type: noteTypes.schema,
            subIcon: { name: 'walk', type: 'MaterialCommunityIcons' },
        }
        addNote(newNote)
    }

    return (
        <ScreenCmn style={{ gap: 0, flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <Chip icon="information" onPress={() => clearStorage()}>
                    Reset
                </Chip>
                <Chip icon="information" onPress={() => devAddNote()}>
                    Add
                </Chip>
            </View>

            <StatusBar style="light" />
            <ScrollView style={{ width: '100%' }}>
                <GapCmn size={20} direction="vertical" />
                {Object.entries(notes as Notes)
                    .sort((a, b) => {
                        const aa = a[1].timestamp
                        const bb = b[1].timestamp
                        return bb - aa
                    })
                    .map(([uuid, note]): any => {
                        return (
                            <View style={{ width: '100%' }} key={uuid}>
                                <GapCmn size={25} direction="vertical" />
                                <NoteRow containerStyle={{ marginHorizontal: 30 }} note={note} />
                            </View>
                        )
                    })}
                <GapCmn size={20} direction="vertical" />
            </ScrollView>
        </ScreenCmn>
    )
}

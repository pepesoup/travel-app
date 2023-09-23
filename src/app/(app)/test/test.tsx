import { StyleSheet } from 'react-native'
import { AnimatedBadge, ButtonCmn, IconCmn } from '../../../rn-components/src/components/commonUi'
import { Note } from '@root/src/stores/travels/types'
import { useEffect, useReducer } from 'react'
import { noteTypes } from '../../../constants/note.constants'
import { useTravelStore } from '@root/src/stores/travels/travelStore'
import { useRouter } from 'expo-router'
import { View } from 'moti'
import { useNotesAlert } from '../notes/hooks/useNotesAlert'

export default function Test() {
    const store = useTravelStore()
    const router = useRouter()
    const [badgeVisible, toggle] = useReducer((s) => !s, true)
    const { getNrOfUnreadNotes, setNotesAreRead, clearStorage } = useNotesAlert()

    useEffect(() => {
        console.log('--- TEST - ok', getNrOfUnreadNotes())
    }, [getNrOfUnreadNotes()])

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View>
                <IconCmn name="walk" type="MaterialCommunityIcons" size={50} />
                <AnimatedBadge visible={badgeVisible} size={17}>
                    {getNrOfUnreadNotes()}
                </AnimatedBadge>
            </View>

            <ButtonCmn
                title="add note"
                onPress={() => {
                    const ts = Date.now().toString()
                    const newNote: Note = {
                        uuid: ts,
                        subject: 'hej',
                        message: 'hej',
                        timestamp: Number(ts),
                        type: noteTypes.schema,
                        subIcon: { name: 'walk', type: 'MaterialCommunityIcons' },
                    }
                    store.addNote(newNote)
                }}
            />
            <ButtonCmn
                title="set notes are read"
                onPress={async () => {
                    await setNotesAreRead()
                }}
            />
            <ButtonCmn
                title="toggle badge visible"
                onPress={() => {
                    toggle()
                }}
            />
            <ButtonCmn
                title="Clear useNotifyAlert"
                onPress={async () => {
                    await clearStorage()
                }}
            />
            <ButtonCmn
                title="Nav to test2"
                onPress={() => {
                    router.push('test/test2')
                }}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    shape: {
        justifyContent: 'center',
        height: 250,
        width: 250,
        borderRadius: 25,
        marginRight: 10,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#9c1aff',
    },
})

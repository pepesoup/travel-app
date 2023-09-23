import { ButtonCmn, ScreenCmn } from '@rn-components/commonUi'
import { KeyboardAwareScrollViewCmn } from '@rn-components/commonUi/keyboardAwareScrollViewCmn'
import { useEffect, useState } from 'react'
import { useTheme } from 'react-native-paper'
import { useSchemaUiStoreBase } from '../schemaUiStore'
import { Stack, useNavigation } from 'expo-router'
import NoteComposer from '../../notes/components/noteComposer'
import { useLocalSearchParams } from 'expo-router'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Note, Event } from '@root/src/stores/travels/types'
import { EventLook } from './components/eventLook'
import { StackActions } from '@react-navigation/native'
import { useEditData } from './hooks/useEditData'
import { useTravelStore } from '@root/src/stores/travels/travelStore'
import { noteTypes } from '@root/src/constants/note.constants'

export default function ConfirmEdit() {
    const editEventAction = useSchemaUiStoreBase().editEventAction
    const theme = useTheme()
    const [noteData, setNoteDate] = useState<Note & { checked?: boolean }>()
    const { title } = useLocalSearchParams() as any
    const [eventToShow, setEventToShow] = useState<Event | null>(null)
    const navigation = useNavigation()
    const editData = useEditData()
    const travelStore = useTravelStore()

    useEffect(() => {
        switch (editEventAction?.action) {
            case 'add':
                setEventToShow(editEventAction.newEvent)
                break
            case 'update':
                setEventToShow(editEventAction.newEvent)
                break
            case 'delete':
                setEventToShow(editEventAction.oldEvent)
                break
        }
    }, [editEventAction])

    const submit = () => {
        if (noteData?.checked) {
            const ts = Date.now().toString()
            //const subIcon = { name: 'walk', type: 'MaterialCommunityIcons' }
            editData.getEventData()?.type.icon

            const newNote: Note = {
                uuid: ts,
                subject: noteData?.subject || 'n/a',
                message: noteData?.message || 'n/a',
                timestamp: Number(ts),
                type: noteTypes.schema,
                subIcon: editData.getEventData()?.type.icon as any,
            }
            travelStore.addNote(newNote)
        }

        /* save the Schema-Event */
        editData.save() // TODO!!

        /* Problem is that routes for edit are on top -
            so, back for main screen is going to last edit screen 
            instead for going to start page (retreafy)
        */
        //router.replace('/schema/schemaMain')

        /** This is removing all history - the screen reached from here have no back button */
        //navigation.dispatch({ type: 'POP_TO_TOP' })
        /*navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [{ name: '/(app)/schema/schemaMain' }],
            })
        )*/

        /** Very good - this one is working great! */
        const popAction = StackActions.pop(2)
        navigation.dispatch(popAction)
    }

    return (
        <ScreenCmn>
            <Stack.Screen
                options={{
                    title: title,
                    headerRight: () => null,
                }}
            />
            <LinearGradient
                colors={[
                    theme.colors.primaryContainer,
                    theme.colors.background,
                    theme.colors.background,
                ]}
                style={{
                    flex: 1,
                    width: '100%',
                    alignItems: 'center',
                }}
            >
                <KeyboardAwareScrollViewCmn>
                    <EventLook eventToShow={eventToShow} />
                    <NoteComposer onChange={(n) => setNoteDate(n as any)} />
                </KeyboardAwareScrollViewCmn>
                <View>
                    <ButtonCmn
                        title="OK"
                        mode="contained"
                        onPress={() => {
                            submit()
                        }}
                        style={{ marginBottom: 20 }}
                    />
                </View>
                <View>
                    <ButtonCmn
                        title="Avbryt"
                        mode="outlined"
                        onPress={() => {
                            const popAction = StackActions.pop(2)
                            navigation.dispatch(popAction)
                        }}
                        style={{ marginBottom: 40 }}
                    />
                </View>
            </LinearGradient>
        </ScreenCmn>
    )
}

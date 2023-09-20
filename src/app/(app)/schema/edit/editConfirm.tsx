import { ButtonCmn, ScreenCmn } from '@rn-components/commonUi'
import { KeyboardAwareScrollViewCmn } from '@rn-components/commonUi/keyboardAwareScrollViewCmn'
import { useEffect, useState } from 'react'
import { useTheme } from 'react-native-paper'
import { useSchemaUiStoreBase } from '../schemaUiStore'
import { Stack, useNavigation } from 'expo-router'
import NoteComposer from './components/noteComposer'
import { useLocalSearchParams } from 'expo-router'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Note, Event } from '@root/src/stores/types'
import { EventLook } from './components/eventLook'
import { StackActions } from '@react-navigation/native'
import { useEditData } from './hooks/useEditData'

export default function EditConfirm() {
    const editEventAction = useSchemaUiStoreBase().editEventAction
    const theme = useTheme()
    //const router = useRouter()
    const [noteData, setNoteDate] = useState<Note | null>(null)
    const { title } = useLocalSearchParams() as any
    const [eventToShow, setEventToShow] = useState<Event | null>(null)
    const navigation = useNavigation()
    const editData = useEditData()

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
        editData.save()
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
                    <NoteComposer onChange={(n: Note) => setNoteDate(n)} />
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

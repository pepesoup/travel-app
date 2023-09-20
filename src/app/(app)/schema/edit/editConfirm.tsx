import { ButtonCmn, ScreenCmn } from '@rn-components/commonUi'
import { KeyboardAwareScrollViewCmn } from '@rn-components/commonUi/keyboardAwareScrollViewCmn'
import { useEffect, useState } from 'react'
import { useTheme } from 'react-native-paper'
import { useSchemaUiStoreBase } from '../schemaUiStore'
import { Stack, useNavigation, useRouter } from 'expo-router'
import { useTravelStoreBase } from '@root/src/stores/travels/travelStore'
import { schemaActions } from '@root/src/services/schema/schemaActions'
import { produce } from 'immer'
import NoteComposer from './components/noteComposer'
import { useLocalSearchParams } from 'expo-router'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Note, Schema, Event } from '@root/src/stores/types'
import { EventLook } from './components/eventLook'
import { router } from 'expo-router'
import { CommonActions } from '@react-navigation/native'
import { StackActions } from '@react-navigation/native'

export default function EditConfirm() {
    const uiStore = useSchemaUiStoreBase()
    const editEventAction = useSchemaUiStoreBase().editEventAction
    const travelStore = useTravelStoreBase()
    const theme = useTheme()
    //const router = useRouter()
    const [noteData, setNoteDate] = useState<Note | null>(null)
    const { title } = useLocalSearchParams() as any
    const [eventToShow, setEventToShow] = useState<Event | null>(null)
    const navigation = useNavigation()

    console.log('title:', title)

    useEffect(() => {
        console.log('useEffect - editEventAction:', editEventAction)
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
        editEventAction
        if (editEventAction === null) {
            console.warn('Something whent wrong...')
            return
        }
        const { action, newEvent, oldEvent, schema } = editEventAction
        if (action === 'add' && newEvent === null) {
            console.warn('Something whent wrong...')
            return
        }
        if (action === 'update' && newEvent === null) {
            console.warn('Something whent wrong...')
            return
        }
        if (action === 'delete' && oldEvent === null) {
            console.warn('Something whent wrong...')
            return
        }

        /*** data OK ***/
        let updatedSchema: Schema | null = null

        if (action === 'add') {
            updatedSchema = schemaActions
                .day(schema, newEvent?.day as any)
                .eventAction(newEvent?.uuid as any)
                .add(newEvent?.time as any, newEvent?.type as any, newEvent?.description as any)

            useSchemaUiStoreBase.setState(
                produce(uiStore, (draft) => {
                    draft.selectedEvent = null
                    draft.editEventAction = null
                })
            )
        } else if (action === 'update') {
            updatedSchema = schemaActions
                .day(schema, newEvent?.day as any)
                .eventAction(newEvent?.uuid as any)
                .update(newEvent?.time as any, newEvent?.type as any, newEvent?.description as any)

            useSchemaUiStoreBase.setState(
                produce(uiStore, (draft) => {
                    draft.selectedEvent = null
                    draft.editEventAction = null
                })
            )
        } else if (action === 'delete') {
            updatedSchema = schemaActions
                .day(schema, oldEvent?.day as any)
                .eventAction(oldEvent?.uuid as any)
                .delete()

            useSchemaUiStoreBase.setState(
                produce(uiStore, (draft) => {
                    draft.selectedEvent = null
                    draft.editEventAction = null
                })
            )
        }

        useTravelStoreBase.setState(
            produce(travelStore, (draft) => {
                draft.content.schema = updatedSchema
                draft.state = 'hasValue'
            })
        )

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
                            router.replace('/schema/schemaMain')
                        }}
                        style={{ marginBottom: 40 }}
                    />
                </View>
            </LinearGradient>
        </ScreenCmn>
    )
}

import { TextCmn, TextInputCmn, ButtonCmn, ScreenCmn } from '@rn-components/commonUi'
import { KeyboardAwareScrollViewCmn } from '@rn-components/commonUi/keyboardAwareScrollViewCmn'
import { View, SafeAreaView } from 'react-native'
import { WheelPicker } from './components/wheelPicker'
import { useState, useRef, useEffect } from 'react'
import { Divider, useTheme } from 'react-native-paper'
import { useSchemaUiStoreBase } from '../schemaUiStore'
import { Stack, usePathname, useRouter } from 'expo-router'
import { ModalHeaderLeft } from '../../_layout'
import { EventType, Schema, Event } from '@root/src/stores/types'
import { useTravelStoreBase } from '@root/src/stores/travels/travelStore'
import { schemaActions } from '@root/src/services/schema/schemaActions'
import { produce } from 'immer'

export default function AddEvent() {
    const uiStore = useSchemaUiStoreBase.getState()
    const travelStore = useTravelStoreBase()
    const selectedDay = useSchemaUiStoreBase.getState().selectedDay
    const theme = useTheme()
    const router = useRouter()
    const [description, setDescription] = useState('')
    const [note, setNote] = useState('')
    const [timeAndEvent, setTimeAndEvent] = useState({
        hour: 0,
        minute: 0,
        eventType: { name: 'walk' },
    } as { hour: number; minute: number; eventType: EventType })

    useEffect(() => {
        console.log('+++++++++ timeAndEvent: +++++++++++++:', timeAndEvent)
    }, [timeAndEvent])

    const submit = () => {
        console.log('+++++++++ submit +++++++++++++:')
        const data = {
            schema: travelStore.content.schema as Schema,
            day: uiStore.selectedDay,
            time: (timeAndEvent.hour.toString().padStart(2, '0') +
                ':' +
                timeAndEvent.minute.toString().padStart(2, '0')) as string,
            event: {
                type: timeAndEvent.eventType,
                description: description,
            } as Event,
        }
        if (data.day === null || isNaN(data.day)) {
            // todo: error message
            console.log('+++++++++ data fails +++++++++++++')
        }
        console.log('')
        const updatedSchema = schemaActions
            .day(data.schema, Number(data.day))
            .eventAction(data.time)
            .add(data.event.type, data.event.description)

        //console.log('+++++++++ data +++++++++++++', JSON.stringify(data, null, 4))
        console.log('+++++++++ updatedSchema +++++++++++++', JSON.stringify(updatedSchema, null, 4))

        useTravelStoreBase.setState(
            produce(travelStore, (draft) => {
                draft.content.schema = updatedSchema
                draft.state = 'hasValue'
            })
        )
        router.back()
    }

    const pickerState = (state: any) => {
        console.log('+++++++++ pickerState +++++++++++++:', state)
        setTimeAndEvent(state)
    }

    return (
        <ScreenCmn>
            <Stack.Screen
                options={{
                    title: `Lägg till event - Dag ${selectedDay === null ? 1 : selectedDay + 1}`,
                    headerRight: () => null,
                }}
            />
            <WheelPicker setState={pickerState} />
            <View
                style={{
                    borderBottomColor: theme.colors.primaryContainer,
                    borderBottomWidth: 6,
                    width: '100%',
                }}
            />
            <KeyboardAwareScrollViewCmn>
                <TextInputCmn
                    label="Beskrivning"
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    style={{ backgroundColor: 'white' }}
                />
                <TextInputCmn
                    label="Notering (todo...)"
                    value={note}
                    onChangeText={(text) => setNote(text)}
                    style={{ backgroundColor: 'white' }}
                />
            </KeyboardAwareScrollViewCmn>
            <ButtonCmn
                title="Lägg till"
                mode="contained"
                onPress={() => {
                    submit()
                }}
                style={{ marginBottom: 40 }}
            />
        </ScreenCmn>
    )
}

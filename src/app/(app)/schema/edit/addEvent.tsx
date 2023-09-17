import {
    TextCmn,
    TextInputCmn,
    ButtonCmn,
    ScreenCmn,
} from '@root/src/rn-components/src/components/commonUi'
import { KeyboardAwareScrollViewCmn } from '@root/src/rn-components/src/components/commonUi/keyboardAwareScrollViewCmn'
import { View, SafeAreaView } from 'react-native'
import { WheelPicker } from './components/wheelPicker'
import { useState, useRef, useEffect } from 'react'
import { Divider, useTheme } from 'react-native-paper'
import { useSchemaUiStoreBase } from '../schemaUiStore'
import { Stack, usePathname, useRouter } from 'expo-router'
import { ModalHeaderLeft } from '../../_layout'

export default function AddEvent() {
    const uiStore = useSchemaUiStoreBase.getState()
    const selectedDay = useSchemaUiStoreBase.getState().selectedDay
    const theme = useTheme()
    const [description, setDescription] = useState('')
    const [note, setNote] = useState('')
    const router = useRouter()

    useEffect(() => {
        console.log('************* selectedDay *************', selectedDay)
    }, [selectedDay])

    return (
        <ScreenCmn
            style={
                {
                    //flex: 1,
                    //backgroundColor: 'rgba(255, 255, 255, 1)',
                    //alignItems: 'center',
                    //justifyContent: 'center',
                    //paddingHorizontal: 40,
                    //paddingVertical: 20,
                    //gap: 20,
                }
            }
        >
            <Stack.Screen
                options={{
                    title: `Lägg till event - Dag ${selectedDay === null ? 1 : selectedDay + 1}`,
                    // Set the presentation mode to modal for our modal route.
                    //presentation: 'modal',
                    headerRight: () => null,
                    //headerLeft: ModalHeaderLeft,
                }}
            />
            <WheelPicker />
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
                    label="Notering"
                    value={note}
                    onChangeText={(text) => setNote(text)}
                    style={{ backgroundColor: 'white' }}
                />
            </KeyboardAwareScrollViewCmn>
            <ButtonCmn
                title="Lägg till"
                mode="contained"
                onPress={() => {
                    console.log('description:', description)
                    router.back()
                }}
                style={{ marginBottom: 40 }}
            />
        </ScreenCmn>
    )
}

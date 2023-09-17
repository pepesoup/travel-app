import { View, StyleSheet, Modal } from 'react-native'
import { useSchemaUiStoreBase } from '../schemaUiStore'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { FAB, IconButton, useTheme } from 'react-native-paper'
import { th } from 'date-fns/locale'
import { colors } from './colors'
import { useEffect, useState, useRef } from 'react'
import {
    ButtonCmn,
    TextCmn,
    TextInputCmn,
    TextRowCmn,
} from '@root/src/rn-components/src/components/commonUi'
import WheelPickerExpo from 'react-native-wheel-picker-expo'
import { WheelPicker } from '../edit/components/wheelPicker'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAwareScrollViewCmn } from '@root/src/rn-components/src/components/commonUi/keyboardAwareScrollViewCmn'

const CITIES = 'Jakarta,Bandung,Sumbawa,Taliwang,Lombok,Bima'.split(',')

export const EditDay = () => {
    const uiStore = useSchemaUiStoreBase()
    const theme = useTheme()
    const [visible, setVisible] = useState(true)
    const description = useRef('')
    const [note, setNote] = useState('')

    useEffect(() => {}, [])

    const OnVisible = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    setVisible(!visible)
                }}
            >
                <SafeAreaProvider>
                    <SafeAreaView
                        style={{
                            flex: 1,
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            alignItems: 'center',
                            //justifyContent: 'center',
                            paddingHorizontal: 40,
                            paddingVertical: 20,
                            gap: 20,
                        }}
                    >
                        <TextCmn>Dag 1: Lägg till händelse</TextCmn>
                        <WheelPicker />
                        <KeyboardAwareScrollViewCmn>
                            <TextInputCmn
                                label="Beskrivning"
                                //value={description.current}
                                onChangeText={(text) => {
                                    description.current = text
                                }}
                            />
                            <TextInputCmn
                                label="Notering"
                                value={note}
                                onChangeText={(text) => setNote(text)}
                            />
                            <ButtonCmn
                                title="Lägg till"
                                onPress={() => {
                                    console.log('description:', description.current)
                                    //setVisible((current) => !current)
                                }}
                            />
                        </KeyboardAwareScrollViewCmn>
                    </SafeAreaView>
                </SafeAreaProvider>
            </Modal>
        )
    }

    const OnHidden = () => (
        <IconButton
            icon="plus"
            iconColor={colors.editPencilInAdmin[0]}
            //mode="contained-tonal"
            //mode="contained"
            mode="outlined"
            size={30}
            onPress={() => {
                console.log('onPress - visible:', visible)
                setVisible((current) => !current)
            }}
            style={{
                position: 'absolute',
                right: 20,
                bottom: 20,
                zIndex: 10000,
            }}
        />
    )

    return <>{visible ? <OnVisible /> : <OnHidden />}</>
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        zIndex: 100000000,
    },
})

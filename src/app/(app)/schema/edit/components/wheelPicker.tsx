import { useState, useRef, useEffect } from 'react'
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native'
import WheelPickerExpo from 'react-native-wheel-picker-expo'
import { eventTypes } from '@src/services/schema/event.constants'
import { Events } from '../../components/events'
import { TextInput, useTheme } from 'react-native-paper'
import { RowCmn, TextCmn, TextRowCmn } from '@root/src/rn-components/src/components/commonUi'

const HOUR = '07,08,09,10,11,12,13,14,15,16,17,18,19,20'.split(',')
const MINUTE = '00,15,30,45'.split(',')

/* eslint-disable react-native/no-inline-styles */

export const WheelPicker = () => {
    const theme = useTheme()
    const [province, setProvince] = useState('')
    const [city, setCity] = useState('')
    const wheelRef = useRef<WheelPickerExpo>(null)
    const { width: ww, height: wh } = useWindowDimensions()
    const height = 200
    const backgroundColor = '#FFFFFF'
    const borderColor = '#888'
    const timeWidth = 50
    //const iconWidth = ww - 2 * timeWidth - 2 * margin
    const iconWidth = 140

    useEffect(() => {}, [])

    return (
        <>
            <View
                style={{
                    //flex: 1,
                    width: '100%',
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <WheelPickerExpo
                    ref={wheelRef}
                    width={timeWidth}
                    backgroundColor={backgroundColor}
                    selectedStyle={{ borderColor: borderColor, borderWidth: 2 }}
                    height={height}
                    initialSelectedIndex={0}
                    items={HOUR.map((name) => ({ label: name, value: '' }))}
                    onChange={({ item }) => setProvince(item.label)}
                    renderItem={(props) => {
                        return (
                            <Text
                                style={[
                                    styles.text,
                                    {
                                        //fontSize: props.fontSize - 4,
                                        fontSize: 18,
                                        //color: props.fontColor,'
                                        //color: 'green',
                                        textAlign: props.textAlign,
                                    },
                                ]}
                            >
                                {props.label}
                            </Text>
                        )
                    }}
                />
                <TextCmn variant="titleLarge">:</TextCmn>
                <WheelPickerExpo
                    backgroundColor={backgroundColor}
                    selectedStyle={{ borderColor: borderColor, borderWidth: 2 }}
                    height={height}
                    width={timeWidth}
                    initialSelectedIndex={0}
                    items={MINUTE.map((name) => ({ label: name, value: '' }))}
                    onChange={({ item }) => setCity(item.label)}
                    haptics={true}
                />
                <TextCmn variant="titleLarge"> </TextCmn>
                <WheelPickerExpo
                    backgroundColor={backgroundColor}
                    selectedStyle={{ borderColor: borderColor, borderWidth: 2 }}
                    height={height}
                    width={iconWidth}
                    initialSelectedIndex={0}
                    items={Events({ size: 32, color: theme.colors.primary, withLabel: true }).map(
                        (event) => {
                            return {
                                label: event.icon,
                                value: event.name,
                            } as any
                        }
                    )}
                    onChange={({ item }) => setCity(item.value)}
                    haptics={true}
                    renderItem={(props) => {
                        return <View>{props.label}</View>
                    }}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container2: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})

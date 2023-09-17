import { useState, useRef, useEffect } from 'react'
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native'
import WheelPickerExpo from 'react-native-wheel-picker-expo'
import { eventTypes } from '@src/services/schema/event.constants'
import { Events } from '../../components/events'
import { TextInput, useTheme } from 'react-native-paper'
import { RowCmn, TextCmn, TextRowCmn } from '@root/src/rn-components/src/components/commonUi'
import { produce } from 'immer'
import { EventType } from '@root/src/stores/types'

const HOUR = '07,08,09,10,11,12,13,14,15,16,17,18,19,20'.split(',')
const MINUTE = '00,15,30,45'.split(',')

export const WheelPicker = ({ setState }: any) => {
    const theme = useTheme()
    const EVENTS = Events({ size: 32, color: theme.colors.primary, withLabel: true })
    const [city, setCity] = useState('')
    const wheelRef = useRef<WheelPickerExpo>(null)
    const { width: ww, height: wh } = useWindowDimensions()
    const height = 200
    const backgroundColor = '#FFFFFF'
    const borderColor = '#888'
    const timeWidth = 50
    const iconWidth = 140
    const [timeAndEvent, setTimeAndEvent] = useState({
        hour: Number(HOUR[0]),
        minute: Number(MINUTE[0]),
        eventType: { name: 'walk' },
    } as { hour: number; minute: number; eventType: EventType })

    useEffect(() => {
        setState(timeAndEvent)
    }, [timeAndEvent])

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
                    items={HOUR.map((name) => ({ label: name, value: Number(name) }))}
                    onChange={({ item }) =>
                        setTimeAndEvent(
                            produce(timeAndEvent, (draft) => {
                                draft.hour = item.value
                            })
                        )
                    }
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
                    items={MINUTE.map((name) => ({ label: name, value: Number(name) }))}
                    onChange={({ item }) =>
                        setTimeAndEvent(
                            produce(timeAndEvent, (draft) => {
                                draft.minute = item.value
                            })
                        )
                    }
                    haptics={true}
                />
                <TextCmn variant="titleLarge"> </TextCmn>
                <WheelPickerExpo
                    backgroundColor={backgroundColor}
                    selectedStyle={{ borderColor: borderColor, borderWidth: 2 }}
                    height={height}
                    width={iconWidth}
                    initialSelectedIndex={0}
                    items={EVENTS.map((event) => {
                        return {
                            label: event.icon,
                            value: { name: event.name },
                        } as any
                    })}
                    onChange={({ item }) =>
                        setTimeAndEvent(
                            produce(timeAndEvent, (draft) => {
                                draft.eventType = item.value
                            })
                        )
                    }
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

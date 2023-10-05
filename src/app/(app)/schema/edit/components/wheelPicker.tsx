import { useState, useRef, useEffect } from 'react'
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native'
import WheelPickerExpo from 'react-native-wheel-picker-expo'
import { Checkbox, useTheme } from 'react-native-paper'
import { TextCmn } from '@root/src/rn-components/src/components/commonUi'
import { EventType } from '@root/src/stores/travels/types.travel'
import { useEditActions } from '../hooks/useEditActions'
import { useSchemaUiStoreBase } from '../../schemaUiStore'
import { eventTypes } from '@root/src/constants/event.constants'
import { useDisplayData } from '../hooks/useDisplayData'

export const WheelPicker = () => {
    const wheelRef = useRef<WheelPickerExpo>(null)
    const height = 200
    const backgroundColor = '#FFFFFF'
    const borderColor = '#888'
    const timeWidth = 50
    const iconWidth = 140
    const editData = useEditActions()
    const uiStore = useSchemaUiStoreBase()
    const display = useDisplayData()
    const [useTime, setUseTime] = useState(true)

    if (uiStore.editEventAction === null) {
        return null
    }

    const updateTime = (hour: string | null, minute: string | null) => {
        if (hour === '-') {
            editData.updateEventData({ time: '-' })
            return
        }
        const [h, m] = editData.getEventData()?.time.split(':') as any[]
        const newTime = display.createTimeString(hour || h, minute || m)
        editData.updateEventData({ time: newTime })
    }

    const checkIfTimeIsTaken = (hour: string | null, minute: string | null) => {
        const [h, m] = editData.getEventData()?.time.split(':') as any[]
        const newTime = display.createTimeString(hour || h, minute || m)
        return editData.isTimeAlreadyTaken(newTime)
    }

    const getInitialHourIndex = () => {
        if (uiStore.editEventAction?.action === 'add') {
            return 8
        }

        const [h, m] = editData.getEventData()?.time.split(':') as any[]
        const tryIndex = editData.getAvailableData('hours').findIndex((hour: string) => hour === h)
        return tryIndex < 0 ? 0 : tryIndex
    }
    const getInitialMinuteIndex = () => {
        if (uiStore.editEventAction?.action === 'add') {
            return 1
        }
        const [h, m] = editData.getEventData()?.time.split(':') as any[]
        const tryIndex = editData
            .getAvailableData('minutes')
            .findIndex((minute: string) => minute === m)
        return tryIndex < 0 ? 0 : tryIndex
    }
    const getInitialEventTypeIndex = () => {
        if (uiStore.editEventAction?.action === 'add') {
            return 0
        }
        const typeName = editData.getEventData()?.type.name
        const tryIndex = editData
            .getAvailableData('rendableEventTypes')
            .findIndex((et: EventType) => et.name === typeName)
        return tryIndex < 0 ? 0 : tryIndex
    }

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
                {/*<Checkbox.Item
                    label=""
                    status={useTime ? 'checked' : 'unchecked'}
                    color={useTime ? 'rgba(0, 200, 0, 1)' : 'rgba(111,111,111,0.3)'}
                    //uncheckedColor="red"
                    mode="android"
                    onPress={() => {
                        setUseTime(!useTime)
                    }}
                    style={{ marginLeft: -20 }}
                />*/}
                <WheelPickerExpo
                    ref={wheelRef}
                    width={timeWidth}
                    backgroundColor={backgroundColor}
                    selectedStyle={{ borderColor: borderColor, borderWidth: 2 }}
                    height={height}
                    initialSelectedIndex={getInitialHourIndex()}
                    items={editData
                        .getAvailableData('hours')
                        .map((name: string) => ({ label: name, value: name }))}
                    onChange={({ item }) => updateTime(item.value, null)}
                    haptics={true}
                    renderItem={(props) => {
                        return (
                            <Text
                                style={{
                                    fontSize: props.fontSize,
                                    fontWeight: 'bold',
                                    color: checkIfTimeIsTaken(props.label, null)
                                        ? 'red'
                                        : props.fontColor,
                                    textAlign: props.textAlign,
                                }}
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
                    initialSelectedIndex={getInitialMinuteIndex()}
                    items={editData
                        .getAvailableData('minutes')
                        .map((name: string) => ({ label: name, value: name }))}
                    onChange={({ item }) => updateTime(null, item.value)}
                    renderItem={(props) => {
                        return (
                            <Text
                                style={{
                                    fontSize: props.fontSize,
                                    fontWeight: 'bold',
                                    color: checkIfTimeIsTaken(null, props.label)
                                        ? 'red'
                                        : props.fontColor,
                                    textAlign: props.textAlign,
                                }}
                            >
                                {props.label}
                            </Text>
                        )
                    }}
                />
                <TextCmn variant="titleLarge"> </TextCmn>
                <WheelPickerExpo
                    backgroundColor={backgroundColor}
                    selectedStyle={{ borderColor: borderColor, borderWidth: 2 }}
                    height={height}
                    width={iconWidth}
                    initialSelectedIndex={getInitialEventTypeIndex()}
                    items={editData
                        .getAvailableData('rendableEventTypes')
                        .map((event: EventType) => {
                            return {
                                label: event.icon,
                                value: eventTypes[event.name],
                            } as any
                        })}
                    onChange={({ item }) => {
                        // TODO: on confirm remove
                        editData.updateEventData({ type: item.value })
                    }}
                    haptics={true}
                    renderItem={(props) => {
                        return <View>{props.label}</View>
                    }}
                />
            </View>
        </>
    )
}

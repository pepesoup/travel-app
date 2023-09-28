import { View, ViewStyle, Pressable } from 'react-native'
import { IconCmn, TextCmn } from '@rn-components/commonUi'
import _ from 'lodash'
import merge from 'ts-deepmerge'
import { useTheme } from 'react-native-paper'
import { Event } from '@root/src/stores/travels/types.travel'
import { colors } from '../edit/components/colors'
import { useSchemaUiStoreBase } from '../schemaUiStore'
import { useEffect, useState } from 'react'
import { useDisplayData } from '../edit/hooks/useDisplayData'

export type Props = {
    dayId: string
    event?: Event | null
    style?: any
    freeStanding?: boolean
}

export const SchemaDetailCard = ({ dayId, event, style, freeStanding }: Props) => {
    const eventId = event?.uuid
    const uiStore = useSchemaUiStoreBase()
    const theme = useTheme()
    const height = 80
    const margin = 20
    const [isSelected, setIsSelected] = useState(false)
    const display = useDisplayData()

    useEffect(() => {
        setIsSelected(dayId === uiStore.selectedDayId && eventId === uiStore.selectedEvent?.uuid)
    }, [uiStore.selectedDayId, uiStore.selectedEvent])

    const _style = merge(
        {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: height,
        },
        style || {}
    )

    const styleIconContainer: ViewStyle = {
        width: height - margin,
        height: height - margin,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 0,
        marginRight: 10,
        borderRadius: height / 2,
    }

    const onPress = () => {
        if (freeStanding) {
            return
        }
        if (uiStore.selectedEvent?.uuid === eventId) {
            useSchemaUiStoreBase.setState({ selectedEvent: null })
        } else {
            useSchemaUiStoreBase.setState({ selectedEvent: event })
        }
    }

    if (!event) {
        return <TextCmn>Inga event...</TextCmn>
    }

    return (
        <View style={_style}>
            <View style={{ width: 60 }}>
                <TextCmn variant="titleMedium">{display.fixTimeString(event?.time)}</TextCmn>
            </View>
            <View style={styleIconContainer}>
                <Pressable
                    onPress={onPress}
                    style={[
                        styleIconContainer,
                        {
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            backgroundColor: 'transparent',
                            borderWidth: uiStore.isAdminMode && isSelected ? 2 : 0,
                            borderColor: colors.editEvent,
                            zIndex: 2,
                        },
                    ]}
                ></Pressable>
                {freeStanding ? null : (
                    <View
                        style={{
                            backgroundColor: 'white',
                            position: 'absolute',
                            top: -margin,
                            width: 10,
                            height: height,
                            zIndex: 0,
                        }}
                    />
                )}
                <IconCmn
                    name={event.type.icon.name as any}
                    type={event.type.icon.type}
                    color={theme.colors.primary}
                    size={28}
                />
            </View>
            <View style={{ flex: 1 }}>
                <TextCmn>{event.description}</TextCmn>
            </View>
        </View>
    )
}

import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { Portal, FAB, useTheme } from 'react-native-paper'
import { useSchemaUiStoreBase } from '../../schemaUiStore'
import { colors } from './colors'
import { TextCmn } from '@root/src/rn-components/src/components/commonUi'
import { View, StyleSheet } from 'react-native'
import _ from 'lodash'
import { useTravelSchema } from '@root/src/stores/travels/travelStore'

export const DayFab = () => {
    const theme = useTheme()
    const uiStore = useSchemaUiStoreBase()
    const schema = useTravelSchema()
    const [state, setState] = useState({ open: false })
    const onStateChange = ({ open }: any) => setState({ open })
    const { open } = state

    if (!uiStore.dayFabVisible()) {
        //return null
    }

    const OnOpen = () => {
        if (!open) {
            return null
        }
        return (
            <View
                style={{
                    backgroundColor: 'rgba(33,33,33,0.9)',
                    borderRadius: 20,
                    borderColor: 'rgba(99,99,99,1)',
                    borderWidth: 2,
                    marginTop: 80,
                    marginHorizontal: 40,
                    padding: 20,
                    overflow: 'hidden',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    zIndex: 10,
                    gap: 25,
                }}
            >
                <TextCmn
                    variant="titleLarge"
                    style={{ color: 'white', textDecorationLine: 'underline' }}
                >
                    Dag{' '}
                    {uiStore.selectedDayId === null
                        ? '?'
                        : schema[uiStore.selectedDayId].info.day + 1}
                </TextCmn>
                <TextCmn variant="titleMedium" style={{ color: 'white' }}>
                    Tid {uiStore.selectedEvent === null ? '--:--' : uiStore.selectedEvent.time}
                </TextCmn>
            </View>
        )
    }

    const maybeActions = [
        {
            labelTextColor: 'white',
            icon: 'bell',
            label: 'Gör notering (todo)',
            onPress: () => console.log('Pressed notifications'),
        },
    ]

    const actionsForSelectedDay = [
        {
            labelTextColor: theme.colors.tertiaryContainer,
            color: theme.colors.tertiaryContainer,
            icon: 'plus',
            label: 'Lägg till event',
            onPress: () => {
                router.push('/schema/edit/addEvent')
            },
        },
    ]
    const actionsForSelectedDayAndTime = [
        {
            labelTextColor: colors.editEvent,
            color: colors.delete,
            icon: 'delete-empty-outline',
            label: 'Radera event',
            onPress: () => {
                router.push('/schema/edit/deleteEvent')
            },
        },
        {
            labelTextColor: colors.editEvent,
            color: colors.modify,
            icon: 'circle-edit-outline',
            label: 'Ändra event',
            onPress: () => {
                router.push('/schema/edit/updateEvent')
            },
        },
        {
            labelTextColor: theme.colors.tertiaryContainer,
            color: theme.colors.tertiaryContainer,
            icon: 'plus',
            label: 'Lägg till event',
            onPress: () => {
                router.push({ pathname: '/schema/edit/[addEvent]', params: { id: Date.now() } })
            },
        },
    ]

    const getActions = () => {
        return (
            uiStore.selectedDayId !== null && uiStore.selectedEvent !== null
                ? actionsForSelectedDayAndTime
                : actionsForSelectedDay
        ) as any
    }
    return (
        <Portal>
            <OnOpen />
            <FAB.Group
                backdropColor="rgba(33, 33,33,0.85)"
                open={open}
                visible={uiStore.dayFabVisible()}
                variant="tertiary"
                icon={open ? 'calendar-today' : 'plus'}
                actions={getActions()}
                onStateChange={onStateChange}
                onPress={() => {
                    if (open) {
                        // do something if the speed dial is open
                    }
                }}
            />
        </Portal>
    )
}

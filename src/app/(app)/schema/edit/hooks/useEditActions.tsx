import { useTheme } from 'react-native-paper'
import { eventsList } from '../../components/events'
import { useEffect, useState } from 'react'
import { SchemaUiState, useSchemaUiStoreBase } from '../../schemaUiStore'
import {
    useTravelActions,
    useTravelSchema,
    //useTravelStore,
} from '@root/src/stores/travels/travelStore'
import { produce } from 'immer'
import { Event, Schema } from '@root/src/stores/travels/types.travel'
import uuid from 'react-native-uuid'
import merge from 'ts-deepmerge'
import { schemaActions } from '@root/src/stores/travels/schema/schemaActions'
import { eventTypes } from '@root/src/constants/event.constants'
import { useDisplayData } from './useDisplayData'

export const useEditActions = () => {
    const theme = useTheme()
    const { setSchema } = useTravelActions()
    const schema = useTravelSchema()
    const display = useDisplayData()

    const HOUR =
        '-,00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24'.split(',')
    const MINUTE = '-,00,15,30,45'.split(',')
    const RENDABLE_EVENTS = eventsList({ size: 32, color: theme.colors.primary, withLabel: true })
    const uiStore = useSchemaUiStoreBase()

    /**
     *********************** Dev ******************************
     */
    const logData = () => {
        console.log('--------- useEditData - logData() START --------------')
        console.log('ALL in uiStore:', JSON.stringify(uiStore, null, 4))
        console.log('--------- useEditData - logData() END --------------')
    }
    const setDevData = () => {
        useSchemaUiStoreBase.setState(
            produce(uiStore, (draft) => {
                draft.selectedDayId = 'day_0'
                draft.selectedEvent = {
                    uuid: 'guid1',
                    day: 0,
                    time: '19:00',
                    type: eventTypes.meal,
                    description: 'Gemensam middag',
                }
            })
        )
    }

    /**
     *********************** Init ******************************
     */
    const initAddEvent = () => {
        if (uiStore.selectedDayId === null || uiStore.selectedDayId === undefined) {
            throw Error('No selection for schema-dayId')
        }
        const editEventAction = {
            action: 'add',
            schema: schema,
            newEvent: {
                uuid: uuid.v4().toString(),
                day: schema[uiStore.selectedDayId].info.day,
                time: display.createTimeString(HOUR[0], MINUTE[0]),
                type: eventTypes.meal,
                description: '',
            },
            oldEvent: null,
        } as SchemaUiState['editEventAction']

        uiStore.setEditedEventAction(editEventAction)
    }

    const initDeleteEvent = () => {
        const editEventAction = {
            action: 'delete',
            schema: schema,
            newEvent: null,
            oldEvent: uiStore.selectedEvent,
        } as SchemaUiState['editEventAction']

        uiStore.setEditedEventAction(editEventAction)
    }
    const initUpdateEvent = () => {
        const editEventAction = {
            action: 'update',
            schema: schema,
            newEvent: uiStore.selectedEvent,
            oldEvent: uiStore.selectedEvent,
        } as SchemaUiState['editEventAction']

        uiStore.setEditedEventAction(editEventAction)
    }

    const unInitializeEdit = () => {
        /*
        useSchemaUiStoreBase.setState(
            //produce(useSchemaUiStoreBase.getState(), (draft) => {
            produce(uiStore, (draft) => {
                draft.enableFabs = false // test
                draft.selectedDayId = null // test
                draft.selectedEvent = null
                draft.editEventAction = null
            })
        )*/

        useSchemaUiStoreBase.setState({
            selectedDayId: null,
            selectedEvent: null,
            isAdminMode: false,
            enableFabs: false,
            editEventAction: null,
        })
    }
    /**
     *********************** General ******************************
     */
    const updateEventData = (props: Partial<Event>) => {
        if (
            uiStore.editEventAction !== null &&
            uiStore.editEventAction.newEvent !== null &&
            props !== null
        ) {
            const update = produce(uiStore.editEventAction, (draft) => {
                const action = uiStore.editEventAction?.action
                if (action === 'add') {
                    draft.newEvent = merge(draft.newEvent as Event, props as Event)
                } else if (action === 'update') {
                    draft.newEvent = merge(draft.newEvent as Event, props as Event)
                }
            })
            uiStore.setEditedEventAction(update)
        }
    }
    const getEventData = () => {
        switch (uiStore.editEventAction?.action) {
            case 'add':
                return uiStore.editEventAction?.newEvent
            case 'update':
                return uiStore.editEventAction?.newEvent
            case 'delete':
                return uiStore.editEventAction?.oldEvent
            default:
                return null
        }
    }

    const getAvailableData: any = (key: 'hours' | 'minutes' | 'rendableEventTypes') => {
        switch (key) {
            case 'hours':
                return HOUR
            case 'minutes':
                return MINUTE
            case 'rendableEventTypes':
                return RENDABLE_EVENTS
        }
    }

    const isTimeAlreadyTaken = (time: string) => {
        if (uiStore.selectedDayId === null) {
            return false
        }
        const events = schema[uiStore.selectedDayId].events
        if (events === undefined) {
            return false
        }
        const taken = Object.values(events).map((event: Event) => {
            return event.time === time
        })
        return taken.includes(true)
    }

    const save = () => {
        //const editEventAction = uiStore.editEventAction
        const editEventAction = useSchemaUiStoreBase.getState().editEventAction
        const dayId = useSchemaUiStoreBase.getState().selectedDayId

        if (editEventAction === null || dayId === null) {
            console.warn('Something whent wrong...')
            return
        }
        const { action, newEvent, oldEvent } = editEventAction
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
        /*** TODO - replace this "save" with an -event-action in store */

        /*** data OK ***/
        let updatedSchema: Schema | null = null

        if (action === 'add') {
            updatedSchema = schemaActions
                .day(schema, dayId)
                .eventAction(newEvent?.uuid as any)
                .add(newEvent?.time as any, newEvent?.type as any, newEvent?.description as any)

            useSchemaUiStoreBase.setState(
                //produce(useSchemaUiStoreBase.getState(), (draft) => {
                produce(uiStore, (draft) => {
                    draft.selectedEvent = null
                    draft.editEventAction = null
                })
            )
        } else if (action === 'update') {
            updatedSchema = schemaActions
                .day(schema, dayId)
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
                .day(schema, dayId)
                .eventAction(oldEvent?.uuid as any)
                .delete()

            useSchemaUiStoreBase.setState(
                produce(uiStore, (draft) => {
                    draft.selectedEvent = null
                    draft.editEventAction = null
                })
            )
        }

        /* original */
        /*
        useTravelStore.setState(
            produce(useTravelStore.getState(), (draft) => {
                if (
                    draft.content !== null &&
                    draft.content.schema !== null &&
                    updatedSchema !== null
                ) {
                    draft.content.schema = updatedSchema
                }
            })
        ) // */
        if (updatedSchema !== null) {
            setSchema(updatedSchema)
        } else {
            throw Error('Schema is null')
        }
    }

    return {
        initAddEvent,
        initDeleteEvent,
        initUpdateEvent,
        unInitializeEdit,
        updateEventData,
        getEventData,
        getAvailableData,
        isTimeAlreadyTaken,
        save,
        setDevData,
    }
}

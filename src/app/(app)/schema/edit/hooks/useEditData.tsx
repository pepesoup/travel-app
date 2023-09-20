import { useTheme } from 'react-native-paper'
import { Events } from '../../components/events'
import { useEffect, useState } from 'react'
import { SchemaUiState, useSchemaUiStoreBase } from '../../schemaUiStore'
import { useTravelStore, useTravelStoreBase } from '@root/src/stores/travels/travelStore'
import { produce } from 'immer'
import { Event, Schema } from '@src/stores/types'
import uuid from 'react-native-uuid'
import { createTimeString } from '../../utils'
import merge from 'ts-deepmerge'
import { schemaActions } from '@root/src/stores/travels/schema/schemaActions'

export const useEditData = () => {
    const theme = useTheme()

    const HOUR = '07,08,09,10,11,12,13,14,15,16,17,18,19,20'.split(',')
    const MINUTE = '00,15,30,45'.split(',')
    const EVENTS = Events({ size: 32, color: theme.colors.primary, withLabel: true })

    /* TravelStore */
    const travelStore = useTravelStoreBase()

    /* UiStore */
    const uiStore = useSchemaUiStoreBase()

    useEffect(() => {
        //setDevData()
    }, [])

    useEffect(() => {
        //logData()
        //console.log('++++ uiStore update', uiStore)
    }, [uiStore])

    useEffect(() => {
        //console.log('++++ travelStore / actions update', travelStore)
    }, [travelStore])

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
                draft.selectedDay = 0
                draft.selectedEvent = {
                    uuid: 'guid1',
                    day: 0,
                    time: '19:00',
                    type: {
                        name: 'meal',
                        icon: '',
                    },
                    description: 'Gemensam middag',
                }
            })
        )
    }

    /**
     *********************** Init ******************************
     */
    const initAddEvent = () => {
        const editEventAction = {
            confirming: false,
            action: 'add',
            schema: travelStore.content.schema,
            newEvent: {
                uuid: uuid.v4().toString(),
                day: uiStore.selectedDay,
                time: createTimeString(HOUR[0], MINUTE[0]),
                type: {
                    name: 'meal',
                    icon: '',
                },
                description: '',
            },
            oldEvent: null,
        } as SchemaUiState['editEventAction']

        uiStore.setEditedEventAction(editEventAction)
    }

    const initDeleteEvent = () => {
        const editEventAction = {
            confirming: false,
            action: 'delete',
            schema: travelStore.content.schema,
            newEvent: null,
            oldEvent: uiStore.selectedEvent,
        } as SchemaUiState['editEventAction']

        uiStore.setEditedEventAction(editEventAction)
    }
    const initUpdateEvent = () => {
        const editEventAction = {
            action: 'update',
            schema: travelStore.content.schema,
            newEvent: uiStore.selectedEvent,
            oldEvent: uiStore.selectedEvent,
        } as SchemaUiState['editEventAction']

        uiStore.setEditedEventAction(editEventAction)
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
            default:
                return null
        }
    }

    const getAvailableData: any = (key: 'hours' | 'minutes' | 'eventTypes') => {
        switch (key) {
            case 'hours':
                return HOUR
            case 'minutes':
                return MINUTE
            case 'eventTypes':
                return EVENTS
        }
    }

    const isTimeAlreadyTaken = (time: string) => {
        const day = uiStore.selectedDay
        if (day === null) {
            return false
        }
        const events = uiStore.editEventAction?.schema[day]
        if (events === undefined) {
            return false
        }
        const taken = Object.values(events).map((event: Event) => {
            return event.time === time
        })
        return taken.includes(true)
    }

    const setConfirming = () => {
        uiStore.setEditedEventAction(
            produce(uiStore.editEventAction, (draft: any) => {
                draft.confirming = true
            })
        )
    }

    const save = () => {
        const editEventAction = uiStore.editEventAction
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
    }

    return {
        initAddEvent,
        initDeleteEvent,
        initUpdateEvent,
        updateEventData,
        getEventData,
        getAvailableData,
        isTimeAlreadyTaken,
        setConfirming,
        save,
        setDevData,
    }
}

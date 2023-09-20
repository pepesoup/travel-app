import { produce } from 'immer'
import { EventType, Schema, Event } from '../../stores/types'
import uuid from 'react-native-uuid'

/**
 * Todo:
 *      1) make actions in test / perform state
 *          -> so when data changes you can get feedback if is ok or not
 *
 *      2) produce Note-items for every written change to schema.
 *          return a note on performed action, so user have prefilled data
 */
export const schemaActions = {
    day: (schema: Schema, day: number) => {
        return {
            eventAction: (eventId: string) => {
                return {
                    add: (time: string, type: EventType, description: string): Event => {
                        return produce(schema, (draft) => {
                            //draft[day][time] = { type, description }
                            draft[day][eventId] = { uuid: eventId, day, time, type, description }
                        }) as Event
                    },
                    delete: () => {
                        // Note: Event is canceled
                        return produce(schema, (draft) => {
                            delete draft[day][eventId]
                        })
                    },
                    update: (newTime?: string, newType?: EventType, newDescription?: string) => {
                        // Note: Event is changed
                        const existingEvent = schema[day][eventId]
                        if (!existingEvent) {
                            throw new Error('Update call for non existing event')
                        }
                        const type = newType || existingEvent.type
                        const description = newDescription || existingEvent.description
                        const time = newTime || existingEvent.time
                        return produce(schema, (draft) => {
                            delete draft[day][time]
                            draft[day][eventId] = { uuid: eventId, day, time, type, description }
                        })
                    },
                }
            },
            dayAction: {
                new: (time: string, type: EventType) => {
                    // Note: new Event added
                },
                delete: {
                    // Note: Event is canceled
                },
                change: () => {
                    // Note: Event is changed
                },
                replaced: {
                    // Note: Event is replaced with another Event
                },
                moved: {
                    // Note: Event is moved to another date-time
                },
            },
        }
    },
}

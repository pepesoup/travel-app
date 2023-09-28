import { produce } from 'immer'
import { EventType, Schema, Event } from '../types.travel'
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
    day: (schema: Schema, dayId: string) => {
        return {
            eventAction: (eventId: string) => {
                return {
                    add: (time: string, type: EventType, description: string) => {
                        const day = schema[dayId].info.day
                        return produce(schema, (draft) => {
                            if (!draft[dayId].events) {
                                draft[dayId].events = {}
                            }
                            draft[dayId].events[eventId] = {
                                uuid: eventId,
                                day,
                                time,
                                type,
                                description,
                            }
                        })
                    },
                    delete: () => {
                        return produce(schema, (draft) => {
                            delete draft[dayId].events[eventId]
                        })
                    },
                    update: (newTime?: string, newType?: EventType, newDescription?: string) => {
                        // TODO: maybe add prossible to change day for event?
                        const day = schema[dayId].info.day
                        const existingEvent = schema[dayId].events[eventId]
                        if (!existingEvent) {
                            throw new Error('Update call for non existing event')
                        }
                        const type = newType || existingEvent.type
                        const description = newDescription || existingEvent.description
                        const time = newTime || existingEvent.time
                        return produce(schema, (draft) => {
                            delete draft[dayId].events[time]
                            draft[dayId].events[eventId] = {
                                uuid: eventId,
                                day,
                                time,
                                type,
                                description,
                            }
                        })
                    },
                }
            },
            dayAction: {
                new: () => {},
                delete: {},
                change: () => {},
                replaced: {},
                moved: {},
            },
        }
    },
}

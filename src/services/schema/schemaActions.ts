import { produce } from 'immer'
import { EventType, Schema } from '../../stores/types'

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
            eventAction: (time: string) => {
                return {
                    add: (type: EventType, description: string): any => {
                        // Note: new Event added
                        return produce(schema, (draft) => {
                            draft[day][time] = { type, description }
                        })
                    },
                    delete: () => {
                        // Note: Event is canceled
                        return produce(schema, (draft) => {
                            delete draft[day][time]
                        })
                    },
                    update: (newTime?: string, newType?: EventType, newDescription?: string) => {
                        // Note: Event is changed
                        const existingEvent = schema[day][time]
                        if (!existingEvent) {
                            throw new Error('Update call for non existing event')
                        }
                        const type = newType || existingEvent.type
                        const description = newDescription || existingEvent.description
                        return produce(schema, (draft) => {
                            delete draft[day][time]
                            draft[day][newTime || time] = { type, description }
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

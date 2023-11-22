import { MaterialCommunityIcons } from '@expo/vector-icons'
import { IconCmn } from '../../rn-components/src/components/commonUi'
export type EventType = {
    name: 'walk' | 'meal' | 'yoga' | 'exercise' | 'lecture' | 'pool' | 'travel' | 'party'
    icon: {
        name: (typeof IconCmn)['name']
        type: (typeof IconCmn)['type']
    }
}

export type Event = {
    uuid: string
    day: number
    time: string
    type: EventType
    description: string
}

export type Events = { [eventId: string]: Event }

export type Schema = {
    [dayId: string]: {
        info: { day: number }
        events: Events
    }
}

export type NoteType = {
    name: 'travel' | 'schema'
    icon: {
        name: (typeof IconCmn)['name']
        type: (typeof IconCmn)['type']
    }
}
export type Note = {
    uuid: string
    subject: string
    message: string
    timestamp: number
    type: NoteType
    subIcon: {
        name: (typeof IconCmn)['name']
        type: (typeof IconCmn)['type']
    }
}

export type Notes = { [uuid: string]: Note }

export type Travel = {
    info: {
        startDate: Date
        endDate: Date
        residence: {
            name: string
            place: string
            address: string[]
            email: string
            web: {
                name: string
                url: string
            }
            tel: string[]
            pictureUrl: string[]
        }
        acuteNumber: string[]
        coordinators: {
            name: string
            tel: string
        }[]
        recommendation: string
    }
    schema: Schema
    notes: Notes
}

export interface TravelPO {
    id: string
    name: string
}

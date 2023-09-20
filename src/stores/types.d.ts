export type EventType = {
    name: 'walk' | 'meal' | 'yoga' | 'exercise' | 'lecture'
    icon?: string
}

export type Event = {
    uuid: string
    day: number
    time: string
    type: EventType
    description: string
}

export type Events = { [eventId: string]: Event }

export type Schema = { [day: number]: Events }

export type Note = {
    subject: string
    message: string
    timestamp: number
    type: 'schema' | 'travel'
}

export type Travel = {
    startDate: Date
    endDate: Date
    residence: {
        name: string
        place: string
        address: string[]
        web: string
        email: string
        tel: string
        pictureUrl: string
    }
    acuteContact: [{ name: string; tel: string[]; email: string }]
    schema: { [day: number]: { [eventId: string]: Event } }
    notes: { [uuid: 'string']: Note }
}
export type TravelFromDb =
    | Travel
    | {
          startDate: any
          endDate: any
      }

export type EventType = {
    name: 'walk' | 'meal' | 'yoga' | 'exercise' | 'lecture'
    icon: string
}

export type Event = {
    type: EventType
    description: string
}

export type Events = { [time: string]: Event }

export type Schema = { [day: number]: Events }

export type Travel = {
    startDate: Date //string
    endDate: Date //string
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
    schema: { [day: number]: { [time: string]: Event } }
}
export type TravelFromDb =
    | Travel
    | {
          startDate: any
          endDate: any
      }

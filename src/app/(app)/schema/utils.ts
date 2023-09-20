import { Event } from '@src/stores/types'

export const fixTimeString = (time: any) => {
    if (time === undefined || time === null) {
        return ''
    }
    const [hour, minute] = time.split(':')
    return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`
}

export const createTimeString = (hour: number | string, minute: number | string) => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
}

export const displaySelectedDay = (day: number | null) => {
    return day === null ? 1 : day + 1
}

export const displaySelectedEventTime = (event: Event | null) => {
    return event?.time ? event.time : '?'
}

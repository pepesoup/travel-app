import { useTravelSchema } from '@root/src/stores/travels/travelStore'
import { Event } from '@root/src/stores/travels/types.travel'

export const useDisplayData = () => {
    const schema = useTravelSchema()

    const fixTimeString = (time: any) => {
        if (time === undefined || time === null) {
            return ''
        }
        const [hour, minute] = time.split(':')
        return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`
    }

    const createTimeString = (hour: number | string, minute: number | string) => {
        return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
    }

    const displaySelectedDay = (dayId: string | null) => {
        if (dayId === null || dayId === undefined) {
            return 'Error'
        }
        const day = schema[dayId].info.day
        return day === null ? 1 : day + 1
    }

    const displaySelectedEventTime = (event: Event | null) => {
        return event?.time ? event.time : '?'
    }

    return { fixTimeString, createTimeString, displaySelectedDay, displaySelectedEventTime }
}

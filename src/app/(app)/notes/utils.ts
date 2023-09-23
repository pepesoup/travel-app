import fromUnixTime from 'date-fns/fromUnixTime'
import { format, addDays } from 'date-fns'
import { sv } from 'date-fns/locale'
import _ from 'lodash'

export const getDateFromTimestamp = (timestamp: string | number) => {
    const date = new Date(timestamp)
    const dayNumber = format(date, 'dd', { locale: sv })
    const monthName = format(date, 'LLLL', { locale: sv })
    const clock = format(date, 'HH:mm')
    // '03 maj kl 19:00'
    return `${dayNumber} ${monthName} kl ${clock}`
}

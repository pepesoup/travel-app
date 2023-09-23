import { Note, NoteType } from '../stores/travels/types'

export const noteTypes: { [key: string]: NoteType } = {
    travel: {
        name: 'travel',
        icon: { name: 'airplane', type: 'MaterialCommunityIcons' },
    },
    schema: {
        name: 'schema',
        icon: { name: 'calendar-month-outline', type: 'MaterialCommunityIcons' },
    },
}

import { EventType } from '../stores/travels/types.travel'

export const eventTypes: { [key: string]: EventType } = {
    walk: {
        name: 'walk',
        icon: { name: 'walk', type: 'MaterialCommunityIcons' },
    },
    meal: {
        name: 'meal',
        icon: { name: 'silverware-fork-knife', type: 'MaterialCommunityIcons' },
    },
    yoga: {
        name: 'yoga',
        icon: { name: 'meditation', type: 'MaterialCommunityIcons' },
    },
    exercise: {
        name: 'exercise',
        icon: { name: 'barbell-outline', type: 'Ionicons' },
    },
    lecture: {
        name: 'lecture',
        icon: { name: 'human-male-board-poll', type: 'MaterialCommunityIcons' },
    },
}

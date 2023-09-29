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
    pool: {
        name: 'pool',
        icon: { name: 'pool', type: 'MaterialIcons' },
    },
    travel: {
        name: 'travel',
        icon: { name: 'airplane', type: 'MaterialCommunityIcons' },
    },
    party: {
        name: 'party',
        icon: { name: 'glass-cheers', type: 'FontAwesome5' },
    },
    lecture: {
        name: 'lecture',
        icon: { name: 'human-male-board-poll', type: 'MaterialCommunityIcons' },
    },
}

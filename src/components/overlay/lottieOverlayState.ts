import { atom } from 'recoil'

type NewScoreState = {
    score: number
    timestamp: number
}

export const newScoreState: any = atom({
    key: 'overlay/newScoreState',
    default: undefined,
})

export const runAnimationState: any = atom({
    key: 'overlay/runAnimationState',
    default: undefined,
})

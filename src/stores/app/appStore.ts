import { create } from 'zustand'

export type AppStore = {
    nrOfUnreadNotes: number
    setNrOfUnreadNotes: (nr: number) => void // TODO: put in actions {}
}
export const useAppStore = create<AppStore>((set) => ({
    nrOfUnreadNotes: 0,
    setNrOfUnreadNotes: (nr) => set(() => ({ nrOfUnreadNotes: nr })), // TODO: put in actions {}
}))

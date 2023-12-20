import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export type ChatStore = {
    clientIsReady: boolean
    channel: any
    thread: any
    actions: {
        setClientIsReady: (isReady: boolean) => void
        setChannel: (channel: any) => void
        setThread: (thread: any) => void
    }
}

export const useChatStore = create(
    immer<ChatStore>((set, get) => ({
        clientIsReady: false,
        channel: null,
        thread: null,
        actions: {
            setClientIsReady: (isReady) =>
                set((state) => {
                    state.clientIsReady = isReady
                }),
            setChannel: (channel) =>
                set((state) => {
                    state.channel = channel
                }),
            setThread: (thread) =>
                set((state) => {
                    state.thread = thread
                }),
        },
    }))
)

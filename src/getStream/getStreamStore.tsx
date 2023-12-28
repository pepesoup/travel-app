import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { Channel } from 'stream-chat/dist/types'
import { DefaultGenerics } from 'stream-chat/dist/types'

export type ChatStore = {
    chatIsReady: boolean
    channel: Channel<DefaultGenerics> | null
    thread: any
    actions: {
        setChatIsReady: (isReady: boolean) => void
        setChannel: (channel: any) => void
        setThread: (thread: any) => void
    }
}

export const useChatStore = create(
    immer<ChatStore>((set, get) => ({
        chatIsReady: false,
        channel: null,
        thread: null,
        actions: {
            setChatIsReady: (isReady) =>
                set((state) => {
                    state.chatIsReady = isReady
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

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTravelStore } from '@root/src/stores/travels/travelStore'
import _ from 'lodash'
import { useState, useEffect, useRef } from 'react'
import { useAppStore } from '@src/stores/app/appStore'
import { useFocusEffect } from 'expo-router'

export const useNotesAlert = () => {
    const notes = useTravelStore((state) => state.content.notes)
    const latestNoteTs = useRef(0)
    const currentNotesTs = useRef<number[]>([])
    const appStore = useAppStore()
    const nrOfUnreadNotes = useAppStore((state) => state.nrOfUnreadNotes)

    useFocusEffect(() => {
        console.log('+++ useNotesAlert - useFocusEffect:')
    })

    useEffect(() => {
        currentNotesTs.current = Object.entries(notes || {}).map(([id, note]) => note?.timestamp)
        latestNoteTs.current = _.max(currentNotesTs.current) || 0
        const update = async () => {
            await setNrOfUnreadNotes()
        }
        update()
    }, [notes])

    const storeLastReadNote = async (value: any) => {
        try {
            await AsyncStorage.setItem('last-note-read', value.toString())
        } catch (e) {
            console.warn(e)
        }
    }

    const getLastReadNote = async () => {
        try {
            const value = await AsyncStorage.getItem('last-note-read')
            return Number(value) || 0
        } catch (e) {
            console.warn(e)
            return 0
        }
    }

    const setNrOfUnreadNotes = async () => {
        const lastReadNote = await getLastReadNote()
        const nr = currentNotesTs.current.filter((ts) => ts > lastReadNote).length
        appStore.setNrOfUnreadNotes(nr)
    }

    const setNotesAreRead = async () => {
        await storeLastReadNote(latestNoteTs.current)
        appStore.setNrOfUnreadNotes(0)
    }

    const clearStorage = async () => {
        await storeLastReadNote(0)
        await setNrOfUnreadNotes()
    }

    const getNrOfUnreadNotes = () => {
        return nrOfUnreadNotes
    }

    return { getNrOfUnreadNotes, setNotesAreRead, clearStorage }
}

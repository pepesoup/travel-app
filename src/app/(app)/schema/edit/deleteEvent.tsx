import { ButtonCmn, ScreenCmn } from '@rn-components/commonUi'
import { KeyboardAwareScrollViewCmn } from '@rn-components/commonUi/keyboardAwareScrollViewCmn'
import { useEffect, useState } from 'react'
import { useTheme } from 'react-native-paper'
import { SchemaUiState, useSchemaUiStoreBase } from '../schemaUiStore'
import { Stack, useRouter } from 'expo-router'
import { useTravelStoreBase } from '@root/src/stores/travels/travelStore'
import { schemaActions } from '@root/src/services/schema/schemaActions'
import { produce } from 'immer'
import NoteComposer from './components/noteComposer'
import { Schema, Event, Note } from '@root/src/stores/types'
import uuid from 'react-native-uuid'
import { fixTimeString } from '../utils'
import { View } from 'react-native'
import { EventLook } from './components/eventLook'
import { LinearGradient } from 'expo-linear-gradient'
import { useEditData } from './hooks/useEditData'

export default function DeleteEvent() {
    const uiStore = useSchemaUiStoreBase.getState()
    const eventToShow = useSchemaUiStoreBase.getState().selectedEvent
    const travelStore = useTravelStoreBase.getState()
    const selectedDay = useSchemaUiStoreBase.getState().selectedDay
    const theme = useTheme()
    const router = useRouter()
    const editData = useEditData()

    useEffect(() => {
        editData.initDeleteEvent()
    }, [])

    const submit = () => {
        editData.setConfirming()
        router.push({ pathname: '/schema/edit/editConfirm', params: { title: 'Radera event' } })
    }

    return (
        <ScreenCmn>
            <Stack.Screen
                options={{
                    title: `Radera event - Dag ${selectedDay === null ? 1 : selectedDay + 1}`,
                    headerRight: () => null,
                }}
            />
            <LinearGradient
                colors={[
                    theme.colors.primaryContainer,
                    theme.colors.background,
                    theme.colors.background,
                ]}
                style={{
                    flex: 1,
                    width: '100%',
                    alignItems: 'center',
                }}
            >
                <EventLook eventToShow={eventToShow} />
                <View style={{ flex: 1 }} />
                <ButtonCmn
                    title="Bekräfta"
                    mode="contained"
                    onPress={() => {
                        submit()
                    }}
                    style={{ marginBottom: 40 }}
                />
            </LinearGradient>
        </ScreenCmn>
    )
}

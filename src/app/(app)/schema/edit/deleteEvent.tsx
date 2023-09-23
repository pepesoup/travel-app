import { ButtonCmn, ScreenCmn } from '@rn-components/commonUi'
import { useEffect } from 'react'
import { useTheme } from 'react-native-paper'
import { useSchemaUiStoreBase } from '../schemaUiStore'
import { Stack, useRouter } from 'expo-router'
import { View } from 'react-native'
import { EventLook } from './components/eventLook'
import { LinearGradient } from 'expo-linear-gradient'
import { useEditData } from './hooks/useEditData'

export default function DeleteEvent() {
    const eventToShow = useSchemaUiStoreBase.getState().selectedEvent
    const selectedDay = useSchemaUiStoreBase.getState().selectedDay
    const theme = useTheme()
    const router = useRouter()
    const editData = useEditData()

    useEffect(() => {
        editData.initDeleteEvent()
    }, [])

    const submit = () => {
        editData.setConfirming()
        router.push({ pathname: '/schema/edit/confirmEdit', params: { title: 'Radera event' } })
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

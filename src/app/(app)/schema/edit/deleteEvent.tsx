import { ButtonCmn, ScreenCmn } from '@rn-components/commonUi'
import { useEffect } from 'react'
import { useTheme } from 'react-native-paper'
import { useSchemaUiStoreBase } from '../schemaUiStore'
import { Stack, useRouter } from 'expo-router'
import { View } from 'react-native'
import { EventLook } from './components/eventLook'
import { LinearGradient } from 'expo-linear-gradient'
import { useEditActions } from './hooks/useEditActions'
import { useDisplayData } from './hooks/useDisplayData'

export default function DeleteEvent() {
    const eventToShow = useSchemaUiStoreBase((s) => s.selectedEvent)
    const selectedDayId = useSchemaUiStoreBase((s) => s.selectedDayId)
    const theme = useTheme()
    const router = useRouter()
    const editData = useEditActions()
    const display = useDisplayData()

    useEffect(() => {
        editData.initDeleteEvent()
    }, [])

    const submit = () => {
        router.push({ pathname: '/schema/edit/confirmEdit', params: { title: 'Radera event' } })
    }

    return (
        <ScreenCmn>
            <Stack.Screen
                options={{
                    title: `Radera event - Dag ${display.displaySelectedDay(selectedDayId)}`,
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

import { ButtonCmn, ScreenCmn, TextCmn } from '@rn-components/commonUi'
import { useEffect } from 'react'
import { useSchemaUiStoreBase } from '../schemaUiStore'
import { Stack, useRouter } from 'expo-router'
import { useTravelState, useTravelStore } from '@root/src/stores/travels/travelStore'
import AddAndUpdate from './components/addAndUpdate'
import { useEditActions } from './hooks/useEditActions'
import { useDisplayData } from './hooks/useDisplayData'

export default function AddEvent() {
    const uiStore = useSchemaUiStoreBase()
    const travelState = useTravelState()
    const editData = useEditActions()
    const router = useRouter()
    const display = useDisplayData()

    const title = () => {
        return uiStore.selectedDayId !== null
            ? `Lägg till event - Dag ${display.displaySelectedDay(uiStore.selectedDayId)}`
            : 'Error'
    }

    useEffect(() => {
        if (travelState.value === 'hasValue') {
            editData.initAddEvent()
        }
    }, [travelState])

    const submit = () => {
        router.push({
            pathname: '/schema/edit/confirmEdit',
            params: { title: title() },
        })
    }

    if (travelState.value === 'loading') {
        return <TextCmn>Travelstore is loading</TextCmn>
    }

    return (
        <ScreenCmn>
            <Stack.Screen
                getId={({ params }) => String(Date.now())} /* clears screen on push nav */
                options={{
                    title: title(),
                    headerRight: () => null,
                }}
            />
            <AddAndUpdate action="add" />
            <ButtonCmn
                title="Bekräfta"
                mode="contained"
                onPress={() => {
                    submit()
                }}
                style={{ marginBottom: 40 }}
            />
        </ScreenCmn>
    )
}

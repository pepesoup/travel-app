import { ButtonCmn, ScreenCmn, TextCmn } from '@rn-components/commonUi'
import { useEffect } from 'react'
import { useSchemaUiStoreBase } from '../schemaUiStore'
import { Stack, useRouter } from 'expo-router'
import AddAndUpdate from './components/addAndUpdate'
import { useEditActions } from './hooks/useEditActions'
import { useTravelSchema, useTravelState } from '@root/src/stores/travels/travelStore'
import { useDisplayData } from './hooks/useDisplayData'

export default function UpdateEvent() {
    const uiStore = useSchemaUiStoreBase()
    const travelState = useTravelState()
    const schema = useTravelSchema()
    const editData = useEditActions()
    const router = useRouter()
    const display = useDisplayData()

    const title = () => {
        return uiStore.selectedDayId !== null
            ? `Uppdatera event - Dag ${display.displaySelectedDay(uiStore.selectedDayId)}`
            : 'Error'
    }

    useEffect(() => {
        if (travelState.value === 'hasValue') {
            editData.initUpdateEvent()
        }
    }, [travelState])

    const submit = () => {
        router.push({
            pathname: '/schema/edit/confirmEdit',
            params: {
                title: title(),
            },
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
            <AddAndUpdate action="update" />
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

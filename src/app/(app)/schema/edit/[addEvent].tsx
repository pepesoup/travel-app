import { ButtonCmn, ScreenCmn, TextCmn } from '@rn-components/commonUi'
import { useEffect } from 'react'
import { useSchemaUiStoreBase } from '../schemaUiStore'
import { Stack, useRouter } from 'expo-router'
import { useTravelStore } from '@root/src/stores/travels/travelStore'
import { displaySelectedDay } from '../utils'
import AddAndUpdate from './components/addAndUpdate'
import { useEditData } from './hooks/useEditData'

export default function AddEvent() {
    const uiStore = useSchemaUiStoreBase()
    const travelStore = useTravelStore()
    const editData = useEditData()
    const router = useRouter()

    useEffect(() => {
        if (travelStore.state.value === 'hasValue') {
            editData.initAddEvent()
        }
    }, [travelStore])

    const submit = () => {
        editData.setConfirming()
        router.push({
            pathname: '/schema/edit/confirmEdit',
            params: { title: `Lägg till event - Dag ${displaySelectedDay(uiStore.selectedDay)}` },
        })
    }

    if (travelStore.state.value === 'loading') {
        return <TextCmn>Travelstore is loading</TextCmn>
    }

    return (
        <ScreenCmn>
            <Stack.Screen
                getId={({ params }) => String(Date.now())} /* clears screen on push nav */
                options={{
                    title: `Lägg till event - Dag ${displaySelectedDay(uiStore.selectedDay)}`,
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

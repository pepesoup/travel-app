import { ButtonCmn, ScreenCmn, TextCmn } from '@rn-components/commonUi'
import { useEffect } from 'react'
import { useSchemaUiStoreBase } from '../schemaUiStore'
import { Stack, useRouter } from 'expo-router'
import { useTravelStoreBase } from '@root/src/stores/travels/travelStore'
import { displaySelectedDay, displaySelectedEventTime } from '../utils'
import AddAndUpdate from './components/addAndUpdate'
import { useEditData } from './hooks/useEditData'

export default function UpdateEvent() {
    const uiStore = useSchemaUiStoreBase()
    const travelStore = useTravelStoreBase()
    const editData = useEditData()
    const router = useRouter()

    const title = () => `Uppdatera event - Dag ${displaySelectedDay(uiStore.selectedDay)}`

    useEffect(() => {
        if (travelStore.state === 'hasValue') {
            editData.initUpdateEvent()
        }
    }, [travelStore])

    const submit = () => {
        editData.setConfirming()
        router.push({
            pathname: '/schema/edit/editConfirm',
            params: {
                title: title(),
            },
        })
    }

    if (travelStore.state === 'loading') {
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

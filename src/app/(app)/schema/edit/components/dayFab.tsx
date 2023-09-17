import { useTravelStoreBase } from '@root/src/stores/travels/travelStore'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { Portal, FAB } from 'react-native-paper'
import { useSchemaUiStoreBase } from '../../schemaUiStore'

export const DayFab = () => {
    const travel = useTravelStoreBase()
    const uiStore = useSchemaUiStoreBase()
    const [state, setState] = useState({ open: false })
    const onStateChange = ({ open }: any) => setState({ open })
    const { open } = state

    useEffect(() => {})

    if (!uiStore.dayFabVisible()) {
        return null
    }

    return (
        <Portal>
            <FAB.Group
                open={open}
                visible
                variant="tertiary"
                icon={open ? 'calendar-today' : 'plus'}
                actions={[
                    {
                        icon: 'plus',
                        label: 'Event',
                        onPress: () => {
                            router.push('/schema/edit/addEvent')
                        },
                    },

                    {
                        icon: 'bell',
                        label: 'Notering',
                        onPress: () => console.log('Pressed notifications'),
                    },
                ]}
                onStateChange={onStateChange}
                onPress={() => {
                    if (open) {
                        // do something if the speed dial is open
                    }
                }}
            />
        </Portal>
    )
}

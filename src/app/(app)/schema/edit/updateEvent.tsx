import { ButtonCmn, ScreenCmn, TextCmn } from '@rn-components/commonUi'
import { useEffect } from 'react'
import { useSchemaUiStoreBase } from '../schemaUiStore'
import { Stack, useNavigation, useRouter } from 'expo-router'
import AddAndUpdate from './components/addAndUpdate'
import { useEditActions } from './hooks/useEditActions'
import { useTravelSchema, useTravelState } from '@root/src/stores/travels/travelStore'
import { useDisplayData } from './hooks/useDisplayData'
import { IconButton } from 'react-native-paper'
import { StackActions } from '@react-navigation/native'


export default function UpdateEvent() {
    const uiStore = useSchemaUiStoreBase()
    const travelState = useTravelState()
    const schema = useTravelSchema()
    const editData = useEditActions()
    const router = useRouter()
    const display = useDisplayData()
    const navigation = useNavigation()

    const title = () => {
        return uiStore.selectedDayId !== null
            ? `Uppdatera event - Dag ${display.displaySelectedDay(uiStore.selectedDayId)}`
            : 'Error'
    }

    useEffect(() => {
        editData.initUpdateEvent()
    }, [])

    const submit = () => {
        router.push({
            pathname: '/schema/edit/confirmEdit',
            params: {
                title: title(),
            },
        })
    }

    return (
        <ScreenCmn>
            <Stack.Screen
                getId={({ params }) => String(Date.now())} /* clears screen on push nav */
                options={{
                    title: title(),
                    headerRight: () => null,
                    headerLeft: (props) => {
                        return (
                            <IconButton
                                icon="arrow-left"
                                iconColor={props.tintColor}
                                onPress={() => {
                                    console.log('hepp')
                                    editData.unInitializeEdit()
                                    navigation.dispatch(StackActions.pop(1))
                                }}
                            />
                        )
                    },
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

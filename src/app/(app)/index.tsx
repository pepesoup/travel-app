import { Redirect, useRootNavigation, usePathname, useRouter, Stack } from 'expo-router'
import { useEffect, useState } from 'react'
import { useAuthStoreBase } from '@rne-firebase/stores/authStore'
import { TextCmn, Links, ButtonCmn } from '@rn-components/commonUi'
import { useTravelStoreBase } from '@root/src/stores/travels/travelStore'
import { View } from 'react-native'
import * as Updates from 'expo-updates'

export default function Index_1() {
    const path = usePathname()
    const rootNavigation = useRootNavigation()
    const router = useRouter()
    //const authData = useAuthStoreBase()
    const travelData = useTravelStoreBase()

    const [infoText, setInfoText] = useState('')
    const [errorText, setErrorText] = useState('')

    useEffect(() => {
        console.log('index_1')
        if (travelData.state === 'loading') {
            setInfoText('Loading Travel...')
        } else if (travelData.state === 'hasError') {
            setInfoText('Prova att starta om Appen. Error:')
            setErrorText(travelData.content)
        }
        if (rootNavigation?.isReady()) {
            if (travelData.state === 'hasValue') {
                navigateOnDataIsReady()
            }
        }
    }, [travelData.state, rootNavigation?.isReady()])

    const navigateOnDataIsReady = () => {
        setTimeout(() => {
            router.replace('/retreafy/retreafy')
        }, 1)
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <TextCmn variant="titleLarge">{infoText}</TextCmn>
            <TextCmn variant="titleSmall" style={{ color: 'red' }}>
                {errorText}
            </TextCmn>
        </View>
    )
}

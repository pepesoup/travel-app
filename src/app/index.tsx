import { Redirect, useRootNavigation, usePathname, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { useAuthStoreBase } from '@rne-firebase/stores/authStore'
import { TextCmn, Links, ButtonCmn } from '@rn-components/commonUi'
import { useEditActions } from './(app)/schema/edit/hooks/useEditActions'
import { View } from 'react-native'

export default function Index_0() {
    //return <Test />
    const authData = useAuthStoreBase()
    const path = usePathname()
    const rootNavigation = useRootNavigation()
    const router = useRouter()

    const [infoText, setInfoText] = useState('')
    const [errorText, setErrorText] = useState('')

    useEffect(() => {
        console.log('index_0', authData.state)
        //console.log('index_0', JSON.stringify(authData.content, null, 4))
        if (authData.state === 'loading') {
            setInfoText('Loading Auth...')
        } else if (authData.state === 'hasError') {
            setInfoText('Got an error for Auth:')
            setErrorText(authData.content)
        }
        if (rootNavigation?.isReady()) {
            if (authData.state === 'hasValue') {
                navigateOnAuthIsReady()
            }
        }
    }, [authData.state, rootNavigation?.isReady()])

    const navigateOnAuthIsReady = () => {
        console.log('index_0 - navigateOnAuthIsReady')
        setTimeout(() => {
            /* test */
            router.replace(
                /* prod */
                authData.isSignedIn ? '/(app)' : '/(auth)/login'

                /* dev */
                //authData.isSignedIn ? '/(app)/test/test' : '/(auth)/login'
                //authData.isSignedIn ? '/(app)/schema/schemaMain' : '/(auth)/login'
                //authData.isSignedIn ? '/(app)/schema/edit/[addEvent]' : '/(auth)/login'
            )
        }, 1)
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TextCmn variant="titleLarge">{infoText}</TextCmn>
            <TextCmn variant="titleSmall" style={{ color: 'red' }}>
                {errorText}
            </TextCmn>
            {authData.state === 'hasError' ? (
                <ButtonCmn
                    title="Logga in"
                    onPress={() => {
                        router.replace('/(auth)/login')
                    }}
                />
            ) : null}
        </View>
    )
}

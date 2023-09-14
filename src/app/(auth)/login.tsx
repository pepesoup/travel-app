import { Links, ButtonCmn, ScreenCmn, TextCmn, TextInputCmn } from '@rn-components/commonUi'
import { Stack, router, useRootNavigation } from 'expo-router'
import { ActivityIndicator, Modal, View } from 'react-native'
import { useTheme, Button } from 'react-native-paper'
import { authStoreActions, useAuthStoreBase } from '@rne-firebase/stores/authStore'
import { useEffect, useState } from 'react'

export default function Login() {
    const theme = useTheme()
    const authData = useAuthStoreBase()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const rootNavigation = useRootNavigation()
    const [ready, setReady] = useState(false)
    const [message, setMessage] = useState('')
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        setReady(!!rootNavigation?.isReady())
    }, [rootNavigation?.isReady()])

    if (!ready) {
        return null
    }

    const onLoginPress = async () => {
        setShowModal(true)
        const res = await authStoreActions.signInWithEmailAndPassword(email, password)
        if (res.isSignedIn) {
            router.replace('/(app)/retreafy/retreafy')
            //router.replace('/')
        } else {
            setMessage(res.content)
        }
        setShowModal(false)
    }

    return (
        <ScreenCmn>
            <Modal
                animationType="slide"
                transparent={true}
                visible={false}
                //presentationStyle="fullScreen"
                //style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }}
            >
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.4)',
                    }}
                >
                    <ActivityIndicator animating={true} />
                </View>
            </Modal>
            <Stack.Screen
                options={{
                    title: 'Logga in',
                    headerRight: () => null,
                    headerLeft: () => null,
                }}
            />

            <View
                style={{
                    width: 130,
                    height: 130,
                    borderRadius: 65,
                    backgroundColor: 'rgb(235, 186, 212)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 30,
                    marginBottom: 20,
                }}
            >
                <TextCmn style={{ color: 'white' }} variant="titleLarge">
                    Retreafy
                </TextCmn>
            </View>
            <View style={{ marginHorizontal: 40 }}>
                <TextInputCmn
                    label="E-post"
                    style={{ backgroundColor: 'white' }}
                    onChangeText={(t) => setEmail(t)}
                    autoCapitalize="none"
                />
                <TextInputCmn
                    label="Lösenord"
                    style={{ backgroundColor: 'white' }}
                    onChangeText={(t) => setPassword(t)}
                    secureTextEntry
                    autoCapitalize="none"
                />
            </View>
            <View style={{ flex: 1, gap: 10, alignItems: 'center' }}>
                <TextCmn variant="titleMedium">{message}</TextCmn>
                <ButtonCmn
                    title="Logga in"
                    onPress={onLoginPress}
                    mode="contained"
                    disabled={email.length === 0 || password.length === 0}
                />
                <Links.NavLink href="/signup">Registrera konto</Links.NavLink>
                <Links.NavLink href="/forgotPassword">Glömt lösenord?</Links.NavLink>
            </View>
        </ScreenCmn>
    )
}

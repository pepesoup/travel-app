import { ButtonCmn, ScreenCmn, TextCmn, TextInputCmn } from '@rn-components/commonUi'
import { Stack, router } from 'expo-router'
import { View, StyleSheet, Pressable } from 'react-native'
import { Modal, Portal, useTheme, Text } from 'react-native-paper'
import { authStoreActions, useAuthStoreBase } from '@rne-firebase/stores/authStore'
import { useEffect, useRef, useState } from 'react'
import merge from 'ts-deepmerge'

export default function SignUp() {
    const theme = useTheme()
    const authData = useAuthStoreBase()
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [showMessage, setShowMessage] = useState('')
    const [seconds, setSeconds] = useState(3)
    const intervalId = useRef<any>()

    useEffect(() => {
        if (seconds < 0) {
            router.back()
            return clearInterval(intervalId.current)
        }
    }, [seconds])

    const onSignupPress = async () => {
        if (password1 !== password2) {
            setShowMessage('Lösenorden skiljer sig!')
            return
        }
        const res = await authStoreActions.signUp(email, password1)
        console.log('res:', res.isSignedIn)
        if (res.state === 'hasValue') {
            setShowMessage('Kontot är registrerat! Nu kan du logga in')
            intervalId.current = setInterval(() => {
                setSeconds((prev) => prev - 1)
                console.log('hepp')
            }, 1000)
        } else {
            setShowMessage(res.content)
        }
    }

    // todo: if isSignedIn -> redirect to app-home (or /app/index is better?)
    return (
        <ScreenCmn>
            <Stack.Screen
                options={{
                    title: 'Registrera konto',
                    headerRight: () => null,
                    headerLeft: () => null,
                }}
            />
            <View
                style={{
                    zIndex: 0,
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
                    onChangeText={(t) => setPassword1(t)}
                    secureTextEntry
                    autoCapitalize="none"
                />
                <TextInputCmn
                    label="Repetera lösenord"
                    style={{ backgroundColor: 'white' }}
                    onChangeText={(t) => setPassword2(t)}
                    secureTextEntry
                    autoCapitalize="none"
                />
            </View>
            <ButtonCmn
                title="Registrera"
                onPress={onSignupPress}
                mode="contained"
                disabled={email.length === 0 || password1.length === 0 || password2.length === 0}
            />
            {showMessage.length > 0 ? (
                <>
                    <Text variant="titleMedium">{showMessage}</Text>
                    <Text variant="titleMedium">...{seconds}</Text>
                </>
            ) : null}
        </ScreenCmn>
    )
}

import { Link, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { ButtonCmn, ScreenCmn, TextCmn, TextInputCmn } from '@rn-components/commonUi'
import { useTheme } from 'react-native-paper'
import { authStoreActions } from '@rne-firebase/stores/authStore'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@root/src/rne-firebase/firebaseConfig'
import { useState } from 'react'
import { Text } from 'react-native-paper'

export default function ForgotPassword() {
    // If the page was reloaded or navigated to directly, then the modal should be presented as
    // a full screen page. You may need to change the UI to account for this.
    const isPresented = router.canGoBack()
    const theme = useTheme()
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const resetEmail = async () => {
        try {
            const res = await sendPasswordResetEmail(auth, email)
            setMessage('Mailet är nu skickat till ' + email + '!')
        } catch (e: any) {
            setMessage('Ett fel uppstog: ' + e.code)
        }
    }

    return (
        <ScreenCmn style={{ gap: 0, justifyContent: 'center', alignItems: 'center', padding: 30 }}>
            {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
            {!isPresented && <Link href="../">Dismiss</Link>}
            {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
            <StatusBar style="light" />
            <TextCmn>
                Ange din E-post adress så kommer du få ett meil med en länk som återställer
                lösenordet.
            </TextCmn>
            <TextInputCmn
                label="E-post"
                style={{ backgroundColor: 'white' }}
                onChangeText={(t) => setEmail(t)}
                autoCapitalize="none"
            />
            <Text variant="titleMedium">{message}</Text>
            <ButtonCmn title="Återställ lösenord" onPress={resetEmail} />
        </ScreenCmn>
    )
}

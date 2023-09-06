import { SplashScreen, Redirect } from 'expo-router'
import { useEffect } from 'react'

export default function Index() {
    useEffect(() => {
        SplashScreen.hideAsync()
    }, [])

    return <Redirect href="/auth/login" />
}

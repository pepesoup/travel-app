import { ScreenCmn } from '@rn-components/commonUi'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import { SchemaDayCard } from './components/schemaDayCard'

export default function SchemaMain() {
    useEffect(() => {
        SplashScreen.hideAsync()
    }, [])

    return (
        <ScreenCmn>
            <Stack.Screen
                options={{
                    title: 'Schema',
                }}
            />
            <ScrollView
                style={{
                    width: '100%',
                    //marginTop: 30,
                    paddingTop: 30,
                }}
                contentContainerStyle={{
                    alignItems: 'center',
                }}
            >
                <SchemaDayCard startDate={new Date()} plusDays={0} />
                <SchemaDayCard startDate={new Date()} plusDays={1} />
                <SchemaDayCard startDate={new Date()} plusDays={2} />
                <SchemaDayCard startDate={new Date()} plusDays={3} />
                <SchemaDayCard startDate={new Date()} plusDays={4} />
                <SchemaDayCard startDate={new Date()} plusDays={5} />
                <SchemaDayCard startDate={new Date()} plusDays={6} />
                <View style={{ height: 40 }} />
            </ScrollView>
        </ScreenCmn>
    )
}

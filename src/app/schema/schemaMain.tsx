import { appThemeState } from '../../theme/themeStates'
import { ScreenCmn, SurfaceCmn, TextCmn } from '../../components/common'
import { Link, SplashScreen, Stack, router, useRouter } from 'expo-router'
import { useEffect } from 'react'
import { Button, ScrollView, StyleSheet, View } from 'react-native'
import { Avatar, Surface, Text } from 'react-native-paper'
import { useRecoilState, useRecoilValue } from 'recoil'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SchemaDayCard } from '../../components/schema/schemaDayCard'


export default function SchemaMain() {
    const theme = useRecoilValue(appThemeState)
    useEffect(() => {
        SplashScreen.hideAsync()
    }, [])


    return (
        <ScreenCmn>
            <Stack.Screen
                options={{
                    title: "Schema",
                }}
            />
            <ScrollView style={{
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

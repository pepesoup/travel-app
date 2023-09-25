import { ScreenCmn, TextCmn } from '@rn-components/commonUi'
import { ImageBackground } from 'expo-image'
import { InfoHotel } from './components/infoHotel'
import { ScrollView, StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Stack } from 'expo-router'
import { useTravelInfo } from '@root/src/stores/travels/travelStore'
import { InfoCoordinators } from './components/infoCoordinators'
import { useEffect, useRef, useState } from 'react'

export default function Travel() {
    const travelInfo = useTravelInfo()

    useEffect(() => {}, [])

    return (
        <ScreenCmn>
            <Stack.Screen
                options={{
                    title: `Min resa till ${travelInfo.residence.place}`,
                }}
            />
            <ImageBackground
                source={travelInfo.residence.pictureUrl[0]}
                style={{ flex: 1, width: '100%' }}
                contentFit="cover"
            >
                <LinearGradient
                    colors={['rgba(0,0,0,0.5)', 'transparent']}
                    style={{
                        ...StyleSheet.absoluteFillObject,
                    }}
                />

                <View
                    style={{
                        flex: 1,
                        //margin: '10%',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <TextCmn style={{ color: 'white', marginVertical: 30 }} variant="headlineLarge">
                        Välkommen till {travelInfo.residence.place}!
                    </TextCmn>

                    <ScrollView
                        style={{ flex: 1, width: '100%' }}
                        contentContainerStyle={{ padding: '10%', gap: 20 }}
                    >
                        <InfoHotel />
                        <InfoCoordinators />
                    </ScrollView>
                </View>
            </ImageBackground>
        </ScreenCmn>
    )
}

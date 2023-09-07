import { ScreenCmn, TextCmn } from '@rn-components/commonUi'
import { ImageBackground } from 'expo-image'
import { InfoCard } from './components/infoCard'
import { StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Stack } from 'expo-router'

export default function Travel() {
    return (
        <ScreenCmn>
            <Stack.Screen
                options={{
                    title: 'Min resa',
                }}
            />
            <ImageBackground
                source={require('./data/hotel.png')}
                style={{ flex: 1, width: '100%' }}
                contentFit="cover"
            >
                <LinearGradient
                    colors={['rgba(0,0,0,0.5)', 'transparent']}
                    style={{
                        ...StyleSheet.absoluteFillObject,
                    }}
                />
                <View style={{ flex: 1, margin: '10%' }}>
                    <View style={{ flex: 1 }}>
                        <TextCmn style={{ color: 'white' }} variant="headlineLarge">
                            Kommande resa till Rhodos om 10 dagar!
                        </TextCmn>
                    </View>
                    <View style={{ flex: 2 }}>
                        <InfoCard />
                    </View>
                </View>
            </ImageBackground>
        </ScreenCmn>
    )
}

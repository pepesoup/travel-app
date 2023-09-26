import { ScreenCmn, TextCmn } from '@rn-components/commonUi'
import { ImageBackground } from 'expo-image'
import { InfoHotel } from './components/infoHotel'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Stack, useFocusEffect, useRouter } from 'expo-router'
import { useTravelInfo } from '@root/src/stores/travels/travelStore'
import { InfoCoordinators } from './components/infoCoordinators'
import { useEffect, useRef, useState } from 'react'
import { InfoAcuteNr } from './components/infoAcuteNr'
import { Octicons } from '@expo/vector-icons'
import { InfoRecommend } from './components/infoRecommend'

export default function Travel() {
    const travelInfo = useTravelInfo()
    const router = useRouter()
    const imgInterval = useRef<any>()
    const [imgIndex, setImgIndex] = useState(0)

    useEffect(() => {
        imgInterval.current = setInterval(() => {
            setImgIndex((current) => {
                if (current === travelInfo.residence.pictureUrl.length - 1) {
                    return 0
                }
                return current + 1
            })
        }, 5000)
        return () => clearInterval(imgInterval.current)
    }, [])

    return (
        <ScreenCmn>
            <Stack.Screen
                options={{
                    title: `Min resa till ${travelInfo.residence.place}`,
                }}
            />
            <ImageBackground
                source={travelInfo.residence.pictureUrl[imgIndex]}
                style={{ flex: 1, width: '100%' }}
                contentFit="cover"
                transition={1500}
            >
                <LinearGradient
                    colors={['rgba(0,0,0,0.3)', 'transparent']}
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
                    <View
                        style={{
                            //flex: 1,
                            height: '30%',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        <TextCmn style={{ color: 'white', marginTop: 10 }} variant="headlineLarge">
                            Välkommen till {travelInfo.residence.place}!
                        </TextCmn>
                        <Pressable
                            style={{ marginVertical: 10 }}
                            onPress={() => {
                                router.push('travel/video/videoIndex')
                            }}
                        >
                            <Octicons name="video" size={54} color="rgba(255,255,255,.5)" />
                        </Pressable>
                    </View>

                    <ScrollView
                        style={{
                            flex: 1,
                            width: '100%',
                        }}
                        contentContainerStyle={{
                            paddingHorizontal: '10%',
                            gap: 20,
                            paddingBottom: 20,
                            //flexDirection: 'column',
                            //justifyContent: 'flex-end',
                            //flex: 1,
                            overflow: 'scroll',
                        }}
                    >
                        <InfoHotel />
                        <InfoCoordinators />
                        <InfoAcuteNr />
                        <InfoRecommend />
                    </ScrollView>
                </View>
            </ImageBackground>
        </ScreenCmn>
    )
}

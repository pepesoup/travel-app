import * as React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Animated } from 'react-native'
import { Video, AVPlaybackStatus, ResizeMode } from 'expo-av'
import { useRef } from 'react'

const video1 = require('./videos/hero1.mp4')
interface Props {
    children?: React.ReactNode
}

export default function VideoBackground2({ children }: Props) {
    const video = useRef(null).current
    const fadeAnim = useRef(new Animated.Value(1)).current

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 5000,
            useNativeDriver: true,
        }).start()
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'brown' }}>
            <Video
                isLooping
                ref={video}
                isMuted
                resizeMode={ResizeMode.COVER}
                shouldPlay={true}
                source={video1}
                style={{
                    ...StyleSheet.absoluteFillObject,
                }}
                rate={0.5}
                onLoad={() => {
                    fadeOut()
                }}
            />
            <Animated.View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: 'rgb(1,1,1)',
                    opacity: fadeAnim,
                }}
            ></Animated.View>
            <View
                style={{
                    //backgroundColor: 'rgba(52, 52, 52, .7)',
                    backgroundColor: 'rgba(31, 31, 31, .7)',
                    ...StyleSheet.absoluteFillObject,
                }}
            >
                {children}
            </View>
        </View>
    )
}

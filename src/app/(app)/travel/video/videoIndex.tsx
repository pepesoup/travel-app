import { ScrollView, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { ButtonCmn, GapCmn, ScreenCmn, TextCmn } from '@rn-components/commonUi'
import { Chip, useTheme } from 'react-native-paper'
import { useTravelActions, useTravelNotes } from '@root/src/stores/travels/travelStore'
import { Note, Notes } from '@root/src/stores/travels/types.travel'
import { noteTypes } from '@root/src/constants/note.constants'
import { ResizeMode, Video } from 'expo-av'
import { useEffect, useRef, useState } from 'react'

const videoUri = require('@src/assets/IMG_2111.mp4')

export default function Modal() {
    const theme = useTheme()
    const video = useRef<any>(null)
    const [status, setStatus] = useState<any>({})

    useEffect(() => {
        video.current.playAsync()
    }, [])

    return (
        <ScreenCmn style={{ gap: 0, flexDirection: 'column', backgroundColor: 'black' }}>
            <Video
                ref={video}
                style={{ width: '100%', height: '80%' }}
                /*source={{
                    uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                }}*/
                source={videoUri}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
            <ButtonCmn
                title={status.isPlaying ? 'Pause' : 'Play'}
                onPress={() =>
                    status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                }
            />
        </ScreenCmn>
    )
}

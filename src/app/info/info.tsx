import { appThemeState } from '../../theme/themeStates'
import { GapCmn, RowCmn, ScreenCmn, SurfaceCmn, TextCmn } from '../../components/common'
import { Link, SplashScreen, Stack, router, useRouter } from 'expo-router'
import { useEffect } from 'react'
import { Button, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native'
import { Avatar, Surface, Text } from 'react-native-paper'
import { useRecoilState, useRecoilValue } from 'recoil'
import { LinearGradient } from 'expo-linear-gradient'
import { Image } from 'expo-image'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import NoteRow from '../notes/components/noteRow'

export default function Info() {
    const theme = useRecoilValue(appThemeState)
    const { height, width } = useWindowDimensions()
    const styles = StyleSheet.create({
        surface: {
            marginHorizontal: 30,
            height: 80,
            width: width - 60,
            //width: 'auto',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
        },
        surfaceContainer: {
            alignItems: 'flex-start',
        },
    })
    return (
        <ScreenCmn>
            <Stack.Screen
                options={{
                    title: 'Info',
                }}
            />
            <ScrollView style={{ width: width }}>
                <GapCmn size={20} direction="vertical" />
                <SurfaceCmn style={styles.surface} containerStyle={styles.surfaceContainer}>
                    <TextCmn
                        style={
                            {
                                //backgroundColor: 'red',
                                //width: '100%',
                            }
                        }
                    >
                        Todo...
                    </TextCmn>
                </SurfaceCmn>
                <GapCmn size={25} direction="vertical" divider />
            </ScrollView>
        </ScreenCmn>
    )
}

import * as React from 'react'
import { View, StyleSheet, Pressable, Dimensions, Image, ScrollView, Linking } from 'react-native'
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import Animated, { FadeIn, FadeOut, ZoomOut } from 'react-native-reanimated'
import { CachedImage } from '@app/components/system/cachedImage'
import { TextCmn } from '@app/components/common'
import { isRecoilValue, useRecoilState, useRecoilValue } from 'recoil'
import { mainNavigatorVisibleState } from '@app/app/navigation/navigationState'
import { IconButton, SegmentedButtons } from 'react-native-paper'
import { GalleryItem, StackParamList } from '../../screens/home2/types'
import { LinearGradient } from 'expo-linear-gradient'
import { appThemeState } from '@app/app/theme/themeStates'
import { Icon } from '@rneui/base'

type Props = {
    navigation: any
    galleryItem: GalleryItem
    mode?: 'Article' | 'Instagram' | 'Archive'
}

export const GalleryCard = ({ navigation, galleryItem, mode }: Props) => {
    const goToDetails = (item: GalleryItem) => {
        switch (mode) {
            case 'Article':
                navigation.navigate('Article', { galleryItem: item })
                break
            case 'Archive':
                navigation.navigate('Archive', { galleryItem: item })
                break
            case 'Instagram':
                navigation.navigate('Instagram')
                break
            default:
                navigation.navigate('Article', { galleryItem: item })
        }
    }
    const theme = useRecoilValue(appThemeState)
    return (
        <>
            <Animated.View
                entering={FadeIn.delay(150).duration(1000)}
                exiting={ZoomOut}
                style={{
                    marginTop: 0,
                    backgroundColor: galleryItem.color,
                    alignSelf: 'flex-start',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderTopStartRadius: 15,
                    borderTopEndRadius: 15,
                    minWidth: 150,
                    alignItems: 'center',
                }}
            >
                <TextCmn variant="titleMedium" style={{ color: 'rgba(0,0,0,0.7)' }}>
                    {galleryItem.title}
                </TextCmn>
            </Animated.View>
            <Pressable onPress={() => goToDetails(galleryItem)}>
                <Animated.View
                    entering={FadeIn.delay(150).duration(1000)}
                    exiting={ZoomOut}
                    style={{
                        backgroundColor: galleryItem.color,
                        borderRadius: 15,
                        borderTopStartRadius: 0,
                        padding: 5,
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            position: 'absolute',
                            right: 10,
                            bottom: 10,
                            zIndex: 100,
                            padding: 10,
                            borderRadius: 15,
                            flexDirection: 'row',
                        }}
                    >
                        <TextCmn style={{}}>{galleryItem.title2}</TextCmn>
                        <Icon name="arrow-right" size={20} color={theme.colors.primary} />
                    </View>

                    <Animated.Image
                        sharedTransitionTag={galleryItem.tag}
                        source={galleryItem.src}
                        style={{
                            width: '100%',
                            height: 200,
                            borderRadius: 15,
                        }}
                    />
                </Animated.View>
            </Pressable>
        </>
    )
}

type Props2 = {
    navigation: any
    galleryItem1: GalleryItem
    galleryItem2: GalleryItem
}
export const GalleryCard2 = ({ navigation, galleryItem1, galleryItem2 }: Props2) => {
    return (
        <>
            <Pressable onPress={() => goToDetails(galleryItem)}>
                <Animated.View>
                    <TextCmn
                        style={{
                            position: 'absolute',
                            left: 40,
                            top: 20,
                            zIndex: 10000,
                        }}
                    >
                        Lorem ipsum dolor sit amet
                    </TextCmn>
                    <Animated.Image
                        sharedTransitionTag={galleryItem.tag}
                        source={galleryItem.src}
                        style={{
                            width: '100%',
                            height: 200,
                            marginTop: 20,
                            borderRadius: 15,
                        }}
                        //resizeMode="cover"
                    />
                </Animated.View>
            </Pressable>
        </>
    )
}

/*
<LinearGradient
                        // Background Linear Gradient
                        colors={[
                            'rgba(0,0,0,0.8)',
                            'transparent',
                            'transparent',
                            galleryItem.color,
                        ]}
                        style={{
                            ...StyleSheet.absoluteFillObject,
                            borderRadius: 15,
                            zIndex: 110000,
                        }}
                    />
*/

import * as React from 'react'
import {
    View,
    StyleSheet,
    Pressable,
    Dimensions,
    ScrollView,
    Linking,
    ViewStyle,
} from 'react-native'
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import Animated, { FadeIn, FadeOut, ZoomOut } from 'react-native-reanimated'
import { CachedImage } from '@app/components/system/cachedImage'
import { TextCmn } from '@app/components/common'
import { isRecoilValue, useRecoilState, useRecoilValue } from 'recoil'
import { mainNavigatorVisibleState } from '@app/app/navigation/navigationState'
import { Avatar, IconButton, SegmentedButtons } from 'react-native-paper'
import { GalleryItem, StackParamList } from '../../screens/home2/types'
import { LinearGradient } from 'expo-linear-gradient'
import { appThemeState } from '@app/app/theme/themeStates'
import { Icon } from '@rneui/base'
import { cathegoryColor } from '@app/data/colors'
import { Image } from 'expo-image'
import { HomeCardsData } from '@app/data/dev/home/homeCardData'
const Color = require('color')

type Props = {
    data: HomeCardsData
    style?: ViewStyle
    onPress: () => void
}

export const GalleryCardV2 = ({ data, style, onPress }: Props) => {
    const theme = useRecoilValue(appThemeState)

    // color def
    const color1 = Color(data.color).darken(0.1).rgb().string()
    const color2 = Color(data.color).lighten(0.1).rgb().string()
    const borderColor = Color(data.color).darken(0.4).rgb().string()

    // fixed styling
    const mainPadding = 20
    const topSize = 50
    const mainRadius = (mainPadding + topSize) / 2

    // dependent styling
    const contentRow1Style =
        data.contentRow1.variant === 'titleLarge' ? styles.titleContent : styles.subtitleContent
    const contentRow2Style =
        data.contentRow2.variant === 'titleLarge' ? styles.titleContent : styles.subtitleContent
    const contentRow3Style =
        data.contentRow2.variant === 'titleLarge' ? styles.titleContent : styles.subtitleContent

    // image
    const blurhash =
        '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

    return (
        <>
            <Pressable onPress={onPress}>
                <LinearGradient
                    start={[0, 1]}
                    end={[1, 0]}
                    style={[
                        { ...style },
                        {
                            //flex: 1,
                            width: '100%',
                            aspectRatio: 1.7,
                            borderRadius: mainRadius,
                            padding: mainPadding,
                            borderWidth: 1,
                            borderColor: borderColor,
                        },
                    ]}
                    colors={[color1, color2]}
                >
                    <View
                        style={{
                            ...StyleSheet.absoluteFillObject,
                            backgroundColor: 'transparent',
                            marginTop: topSize + 10,
                            marginRight: mainPadding,
                        }}
                    >
                        <Image
                            source={data.mainImage}
                            cachePolicy="memory-disk"
                            contentFit="contain"
                            placeholder={blurhash}
                            contentPosition="bottom right"
                            transition={1000}
                            style={{
                                flex: 1,
                                width: '100%',
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            height: topSize,
                            alignItems: 'center',
                        }}
                    >
                        {data.avatarImage !== null ? (
                            <Avatar.Image source={data.avatarImage} size={topSize} />
                        ) : null}
                        <TextCmn
                            style={[styles.text, { marginLeft: mainPadding }]}
                            variant="titleLarge"
                        >
                            {data.topTitle}
                        </TextCmn>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            marginBottom: mainPadding,
                        }}
                    >
                        <TextCmn
                            style={[styles.text, contentRow1Style]}
                            variant={data.contentRow1.variant}
                        >
                            {data.contentRow1.text}
                        </TextCmn>
                        <TextCmn
                            style={[styles.text, contentRow2Style]}
                            variant={data.contentRow2.variant}
                        >
                            {data.contentRow2.text}
                        </TextCmn>
                        <TextCmn
                            style={[styles.text, contentRow3Style]}
                            variant={data.contentRow3.variant}
                        >
                            {data.contentRow3.text}
                        </TextCmn>
                    </View>
                </LinearGradient>
            </Pressable>
        </>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'rgba(0,0,0,0.7)',
    },
    titleContent: {
        //fontSize: 40,
        fontWeight: '800',
        //backgroundColor: 'blue',
    },
    subtitleContent: {
        //fontWeight: '800',
    },
})

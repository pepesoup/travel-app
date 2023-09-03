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
import { ButtonCmn, TextCmn } from '@app/components/common'
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
import { userSelector } from '@app/services/user/userState'
const Color = require('color')

type Props = {
    style?: ViewStyle
    onPress?: () => void
    navigation: any
}

export const UserProfileCard = ({ style, onPress, navigation }: Props) => {
    const theme = useRecoilValue(appThemeState)
    const user = useRecoilValue(userSelector)

    // color def
    const color1 = Color(cathegoryColor.userProfile).darken(0.1).rgb().string()
    const color2 = Color(cathegoryColor.userProfile).lighten(0.1).rgb().string()
    const borderColor = Color(cathegoryColor.userProfile).darken(0.4).rgb().string()

    // fixed styling
    const mainPadding = 20
    const topSize = 50
    const mainRadius = (mainPadding + topSize) / 2

    console.log('++++++++++++++ userProfileCard:', user)
    if (user.state === 'loading' || user.contents === null) {
        return null
    }

    return (
        <>
            <LinearGradient
                //start={[0, 1]}
                //end={[1, 0]}
                style={[
                    {
                        borderTopLeftRadius: mainRadius,
                        borderTopRightRadius: mainRadius,
                        padding: mainPadding,
                        paddingBottom: 0,
                        borderBottomWidth: 5,
                        borderColor: borderColor,
                    },
                    { ...style },
                ]}
                colors={[color2, color1]}
            >
                <View
                    style={{
                        flexDirection: 'row',
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            marginRight: 5,
                        }}
                    >
                        <Avatar.Image
                            source={require('@app/data/images/card/mårten1.png')}
                            size={80}
                        />
                        <TextCmn
                            style={[
                                styles.bigText,
                                {
                                    marginTop: 10,
                                },
                            ]}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {`${user.contents?.profile?.firstName} ${user?.contents?.profile?.surName}`}
                        </TextCmn>
                        <TextCmn
                            style={styles.bigText}
                        >{`"${user.contents?.profile?.displayName}"`}</TextCmn>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View>
                            <TextCmn style={styles.text} variant="titleLarge">
                                Nivå: Medium
                            </TextCmn>
                            <TextCmn style={styles.text} variant="bodyMedium">
                                Till nästaniva: 1226
                            </TextCmn>
                        </View>
                        <View style={{ marginTop: 8 }}>
                            <TextCmn style={styles.bigText}>
                                Poäng: {user.contents?.score?.total}
                            </TextCmn>
                            <TextCmn style={styles.text} variant="bodyMedium">
                                Denna manad: {user.contents?.score?.periodTotal}
                            </TextCmn>
                        </View>
                        <ButtonCmn
                            title="Resultat"
                            onPress={() => {
                                navigation.navigate('ChallengeScoreNavigation', { screen: 'Score' })
                            }}
                            mode="contained"
                        />
                    </View>
                </View>
            </LinearGradient>
        </>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'rgba(0,0,0,0.7)',
        fontWeight: '500',
    },
    bigText: {
        color: 'rgba(0,0,0,0.7)',
        fontWeight: '800',
        fontSize: 20,
    },
})

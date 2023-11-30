import { SurfaceCmn, ScreenCmn, TextCmn } from '@rn-components/commonUi'
import { Stack, router } from 'expo-router'
import { Image } from 'expo-image'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useTravelInfo } from '@root/src/stores/travels/travelStore'
import { differenceInCalendarDays } from 'date-fns'
import { useEffect } from 'react'

export default function RetreafyIndex() {
    const theme = useTheme()
    const travelInfo = useTravelInfo()

    const infoText = () => {
        const daysLeft = differenceInCalendarDays(travelInfo.startDate, new Date())
        const place = travelInfo.residence.place
        return `${daysLeft} dagar kvar till ${place}!`
    }

    return (
        <ScreenCmn>
            <Stack.Screen
                options={{
                    title: 'RETREAFY',
                }}
            />
            <View
                style={{
                    width: '100%',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    padding: 6,
                }}
            >
                <TextCmn
                    variant="titleMedium"
                    style={{
                        color: theme.colors.primary,
                    }}
                >
                    {infoText()}
                </TextCmn>
            </View>
            <View style={{ flex: 1, padding: 20, alignItems: 'center' }}>
                <Image
                    source={require('@src/assets/dev/greece2.avif')}
                    style={{
                        //flex: 1,
                        //width: '40%',
                        width: 200,
                        aspectRatio: 1,
                        borderRadius: 200 / 2,
                        overflow: 'hidden',
                    }}
                    contentFit="cover"
                    transition={1000}
                />

                <View
                    style={{
                        //flex: 1,
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignContent: 'center',
                        width: '100%',
                    }}
                >
                    <SurfaceCmn text="Min resa" onPress={() => router.push('/travel/travel')}>
                        <MaterialCommunityIcons
                            name="palm-tree"
                            size={32}
                            color={theme.colors.primary}
                        />
                    </SurfaceCmn>
                    <SurfaceCmn text="Schema" onPress={() => router.push('/schema/schemaMain')}>
                        <MaterialCommunityIcons
                            name="calendar-month-outline"
                            size={32}
                            color={theme.colors.primary}
                        />
                    </SurfaceCmn>
                    <SurfaceCmn text="Profil" onPress={() => router.push('/profile/profile')}>
                        <MaterialCommunityIcons
                            name="account-circle-outline"
                            size={32}
                            color={theme.colors.primary}
                        />
                    </SurfaceCmn>
                </View>
                <View
                    style={{
                        //flex: 1,
                        marginTop: 30,
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignContent: 'center',
                        width: '100%',
                    }}
                >
                    <SurfaceCmn text="Kontakt" onPress={() => router.push('/contact/contact')}>
                        <MaterialCommunityIcons
                            name="contacts-outline"
                            size={32}
                            color={theme.colors.primary}
                        />
                    </SurfaceCmn>
                    <SurfaceCmn text="Chat" onPress={() => router.push('/chat/chat')}>
                        <MaterialCommunityIcons
                            name="message-text-outline"
                            size={32}
                            color={theme.colors.primary}
                        />
                    </SurfaceCmn>
                    <SurfaceCmn text="Info" onPress={() => router.push('/info/info')}>
                        <MaterialCommunityIcons
                            name="newspaper-variant-outline"
                            size={32}
                            color={theme.colors.primary}
                        />
                    </SurfaceCmn>
                </View>
            </View>
        </ScreenCmn>
    )
}

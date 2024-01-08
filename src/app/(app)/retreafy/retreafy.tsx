import { SurfaceCmn, ScreenCmn, TextCmn } from '@rn-components/commonUi'
import { Stack, router } from 'expo-router'
import { Image } from 'expo-image'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useTravelInfo, useTravelStore } from '@root/src/stores/travels/travelStore'
import { differenceInCalendarDays } from 'date-fns'
import { useEffect, useState } from 'react'
import { useChatStore } from '@root/src/getStream/getStreamStore'
import { useAccountStore } from '@root/src/stores/user/accountStore'
import { useChat } from '@root/src/getStream/useChat'

export default function RetreafyIndex() {
    const [hasUnreadMessage, setHasUnreadMessage] = useState(false)

    const theme = useTheme()
    const travelInfo = useTravelInfo()

    const infoText = () => {
        const daysLeft = differenceInCalendarDays(travelInfo.startDate, new Date())
        const place = travelInfo.residence.place
        return `${daysLeft} dagar kvar till ${place}!`
    }

    const chatStore = useChatStore()

    useEffect(() => {
        if (chatStore.channel !== null) {
            chatStore.channel.on('message.new', event => {
                console.log('event-----', event.total_unread_count);
                if(event?.total_unread_count || 0 > 0) {
                    setHasUnreadMessage(true)
                }
            });
        }
    }, [chatStore.channel])

    const handleUnreadMessage = () => {
        setHasUnreadMessage(false)
        router.push('/chat/channelChat')
    }

    /*
    const accountStore = useAccountStore()
    useEffect(() => {
        useChat()
        console.log('account store here-------')
    }, [accountStore.content.myTravelPlans.selectedTravel.id])
    */
    const travelStore = useTravelStore()
    useEffect(() => {
        useChat()
        console.log('account store here-------')
    }, [travelStore?.content?.chat?.channelId])


    return (
        <ScreenCmn>
            <Stack.Screen
                options={{
                    title: 'RETREAFY',
                    headerTitleAlign: 'center'
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
                    <SurfaceCmn text="Chat" onPress={() => handleUnreadMessage()}>
                        <MaterialCommunityIcons
                            name={hasUnreadMessage ? "message-text-clock-outline" : "message-text-outline"}
                            size={32}
                            color={hasUnreadMessage ? 'red' : theme.colors.primary}
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

import { RowCmn, ScreenCmn, TextCmn } from '@rn-components/commonUi'
import { Stack, useRouter } from 'expo-router'
import { View, StyleSheet, Pressable } from 'react-native'
import { IconButton, useTheme } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { Image } from 'expo-image'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useAccountStore } from '@root/src/stores/user/accountStore'
import { useEffect } from 'react'
import { authStoreActions } from '@root/src/rne-firebase/src/stores/authStore'

export default function Profile() {
    const theme = useTheme()
    const account = useAccountStore()
    const router = useRouter()

    return (
        <ScreenCmn>
            <Stack.Screen
                options={{
                    title: 'Profil',
                }}
            />
            <LinearGradient
                colors={[
                    theme.colors.primaryContainer,
                    theme.colors.background,
                    theme.colors.background,
                ]}
                style={{ flex: 1, width: '100%' }}
            >
                <View
                    style={{
                        margin: 30,
                        marginTop: 20,
                        gap: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Image
                        source={require('@src/assets/dev/greece2.avif')}
                        style={{
                            //flex: 1,
                            width: 200,
                            aspectRatio: 1,
                            borderRadius: 100,
                            overflow: 'hidden',
                        }}
                        contentFit="cover"
                        transition={1000}
                    />
                    <TextCmn variant="titleLarge">{account.content?.profile?.name || '-'}</TextCmn>
                </View>
                <View
                    style={{
                        flex: 1,
                        marginLeft: '10%',
                        marginRight: '10%',
                        marginBottom: '10%',
                        gap: 10,
                    }}
                >
                    <RowCmn.ChildrenRow>
                        <MaterialCommunityIcons
                            name="email-outline"
                            size={24}
                            color={theme.colors.onSurface}
                        />
                        <TextCmn>{account?.content?.email}</TextCmn>
                    </RowCmn.ChildrenRow>
                    <RowCmn.ChildrenRow>
                        <MaterialCommunityIcons
                            name="phone-outline"
                            size={24}
                            color={theme.colors.onSurface}
                        />
                        <TextCmn>{account.content?.profile?.phone || '-'}</TextCmn>
                    </RowCmn.ChildrenRow>
                    <Pressable onPress={() => router.push('profile/editProfile')}>
                        <RowCmn.ChildrenRow>
                            <MaterialCommunityIcons
                                name="account-circle-outline"
                                size={24}
                                color={theme.colors.onSurface}
                            />
                            <TextCmn>Redigera profil</TextCmn>
                        </RowCmn.ChildrenRow>
                    </Pressable>
                    <RowCmn.ChildrenRow>
                        <MaterialIcons name="settings" size={24} color={theme.colors.onSurface} />
                        <TextCmn>Inställningar</TextCmn>
                    </RowCmn.ChildrenRow>
                    <Pressable onPress={() => authStoreActions.signOut()}>
                        <RowCmn.ChildrenRow>
                            <MaterialIcons
                                name="power-settings-new"
                                size={24}
                                color={theme.colors.onSurface}
                            />
                            <TextCmn>Logga ut</TextCmn>
                        </RowCmn.ChildrenRow>
                    </Pressable>
                    {/*<View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <IconButton
                            icon="pencil"
                            mode="outlined"
                            onPress={() => router.push('profile/editProfile')}
                        />
                    </View>*/}
                </View>
            </LinearGradient>
        </ScreenCmn>
    )
}

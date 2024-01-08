import { StatusBar } from 'expo-status-bar'
import {
    ButtonCmn,
    GapCmn,
    ScreenCmn,
    TextCmn,
    RowCmn,
    TextInputCmn,
} from '@rn-components/commonUi'
import { Chip, useTheme, TextInput } from 'react-native-paper'
import { Image } from 'expo-image'
import { View } from 'react-native'
import { useRouter } from 'expo-router'
import { useAccountActions, useAccountStore } from '@root/src/stores/user/accountStore'
import { useEffect, useState } from 'react'
import { MaskedTextInput } from 'react-native-mask-text'
import { useChatStore } from '@root/src/getStream/getStreamStore'
import { updateChatUser } from '@root/src/getStream/useChat'

export default function EditProfile() {
    const theme = useTheme()
    const router = useRouter()
    const account = useAccountStore()
    const accountActions = useAccountActions()
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [nickName, setNickName] = useState('')

    const [maskedValue, setMaskedValue] = useState('')
    const [unMaskedValue, setUnmaskedValue] = useState('')

    useEffect(() => {
        setName(account.content?.profile?.name)
        setPhone(account.content?.profile?.phone)
        setNickName(account?.content?.profile?.nickName)
    }, [account])

    return (
        <ScreenCmn style={{ gap: 20, flexDirection: 'column', padding: '10%' }}>
            <StatusBar style="light" />
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
            <Chip style={{ position: 'absolute', top: 130, alignSelf: 'center' }} icon="camera">
                todo...
            </Chip>
            <View style={{ flex: 1, gap: 10, width: '100%' }}>
                <RowCmn.ChildrenRow>
                    <TextInput
                        value={name}
                        style={{ width: '100%' }}
                        dense
                        mode="outlined"
                        placeholder="Namn"
                        onChange={() => {}}
                        onChangeText={(t) => setName(t)}
                    />
                </RowCmn.ChildrenRow>
                <RowCmn.ChildrenRow>
                    <TextInput
                        value={phone}
                        style={{ width: '100%' }}
                        dense
                        mode="outlined"
                        placeholder="Telefon nummer"
                        onChangeText={(t) => setPhone(t)}
                    />
                    {/*
                        <MaskedTextInput
                            mask="99/99/9999"
                            onChangeText={(text, rawText) => {
                                setMaskedValue(text)
                                setUnmaskedValue(rawText)
                            }}
                            style={styles.input}
                            keyboardType="numeric"
                        />
                        */}
                </RowCmn.ChildrenRow>                
                <RowCmn.ChildrenRow>
                    <TextInput
                        value={nickName}
                        style={{ width: '100%' }}
                        dense
                        mode="outlined"
                        placeholder="NickName"
                        onChange={() => {}}
                        onChangeText={(t) => setNickName(t)}
                    />
                </RowCmn.ChildrenRow>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <ButtonCmn
                        title="Spara"
                        onPress={() => {
                            accountActions.saveProfile({ name, phone, nickName })
                            updateChatUser()
                            router.back()
                        }}
                    />
                </View>
            </View>
        </ScreenCmn>
    )
}

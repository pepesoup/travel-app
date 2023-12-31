import { View } from 'react-native'
import { Stack } from 'expo-router'
import { ButtonCmn, GapCmn, Links, RowCmn, ScreenCmn, TextCmn } from '@rn-components/commonUi'
import { useTheme } from 'react-native-paper'
import { Image } from 'expo-image'
import * as Linking from 'expo-linking'

export default function Contact() {
    const theme = useTheme()
    return (
        <ScreenCmn>
            <Stack.Screen
                options={{
                    title: 'Kontakt',
                }}
            />
            <View
                style={{
                    flex: 1,
                    width: '100%',
                    backgroundColor: 'rgb(249, 253, 255)',
                    paddingTop: 20,
                }}
            >
                <Image
                    source={require('@src/assets/dev/mårten1.png')}
                    style={{
                        flex: 1,
                        width: '100%',
                        //height: '100%',

                        //aspectRatio: 1.4,
                    }}
                    contentFit="contain"
                    transition={1000}
                />
            </View>

            <View
                style={{
                    flex: 1,
                    width: '100%',
                    padding: 40,
                    paddingTop: 50,
                    //backgroundColor: 'red',
                    //gap: 10,
                }}
            >
                <TextCmn variant="titleLarge">RETRAFYAB</TextCmn>
                <GapCmn size={10} direction="vertical" />
                <TextCmn>Adress: Östra Hamngatan 16, Göteborg</TextCmn>
                <GapCmn size={10} direction="vertical" />
                <RowCmn.ChildrenRow label="E-mail:">
                    <Links.LinkCmn url="mailto:info@retreafy.com">info@retreafy.com</Links.LinkCmn>
                </RowCmn.ChildrenRow>
                <GapCmn size={10} direction="vertical" />
                <RowCmn.ChildrenRow label="Instagram:">
                    <Links.LinkCmn url="https://www.instagram.com/retreafycom/">
                        retreafycom
                    </Links.LinkCmn>
                </RowCmn.ChildrenRow>
                <GapCmn size={10} direction="vertical" />
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <ButtonCmn title="Kontakta oss" mode="contained" />
                </View>
            </View>
        </ScreenCmn>
    )
}

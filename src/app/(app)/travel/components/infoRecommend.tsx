import { RowCmn, Links, TextCmn } from '@root/src/rn-components/src/components/commonUi'
import { useTravelInfo } from '@root/src/stores/travels/travelStore'
import _ from 'lodash'
import { View, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import { LinkPreview } from '@flyerhq/react-native-link-preview'

export const InfoRecommend = () => {
    const theme = useTheme()
    const travelInfo = useTravelInfo()

    return (
        <View style={{ borderRadius: 6, overflow: 'hidden' }}>
            <View
                style={{
                    width: '100%',
                    backgroundColor: theme.colors.primaryContainer,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 4,
                }}
            >
                <TextCmn style={{ color: 'white' }} variant="titleMedium">
                    Retreafy Rekommenderar
                </TextCmn>
            </View>
            <View style={{ backgroundColor: theme.colors.background, padding: 2 }}>
                <LinkPreview
                    text={travelInfo.recommendation}
                    enableAnimation
                    /*
                    renderText={(t: any) => {
                        console.log(JSON.stringify(t, null, 4))
                        t = ''
                        return <TextCmn>hej</TextCmn>
                    }}
                    renderLinkPreview={(props: any) => {
                        console.log(JSON.stringify(props, null, 4))
                        return <TextCmn>hej</TextCmn>
                    }}*/

                    renderText={(t: any) => {
                        console.log(JSON.stringify(t, null, 4))
                        t = ''
                        return (
                            <TextCmn style={{ width: '100%', height: 0, marginTop: -20 }}>
                                hej
                            </TextCmn>
                        )
                    }}
                />
            </View>
        </View>
    )
}

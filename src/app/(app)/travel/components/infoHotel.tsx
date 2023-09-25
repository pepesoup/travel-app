import { RowCmn, Links, TextCmn } from '@root/src/rn-components/src/components/commonUi'
import { useTravelInfo } from '@root/src/stores/travels/travelStore'
import _ from 'lodash'
import { View, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'

export const InfoHotel = () => {
    const theme = useTheme()
    const travelInfo = useTravelInfo()

    return (
        <View style={{ width: '100%', borderRadius: 6, overflow: 'hidden' }}>
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
                    Mitt hotell
                </TextCmn>
            </View>
            <View
                style={{
                    width: '100%',
                    backgroundColor: theme.colors.background,
                    padding: 10,
                    gap: 10,
                }}
            >
                <RowCmn.TextRow label="Adress:" hideOnEmptyText>
                    {travelInfo.residence.address.join(', ')}
                </RowCmn.TextRow>

                <RowCmn.ChildrenRow label="Telefon:">
                    {travelInfo.residence.tel.map((tel: string) => (
                        <Links.LinkCmn url={`tel:+${tel}`} key={`tel_${tel}`}>
                            {tel}
                        </Links.LinkCmn>
                    ))}
                </RowCmn.ChildrenRow>

                <RowCmn.ChildrenRow label="E-post:" hideIfValueIsEmpty={travelInfo.residence.email}>
                    <Links.LinkCmn url={`mailto:${travelInfo.residence.email}`}>
                        {travelInfo.residence.email}
                    </Links.LinkCmn>
                </RowCmn.ChildrenRow>

                <RowCmn.ChildrenRow
                    label="Hemsida:"
                    hideIfValueIsEmpty={travelInfo.residence.web.url}
                >
                    <Links.LinkCmn url={travelInfo.residence.web.url}>
                        {travelInfo.residence.web.name}
                    </Links.LinkCmn>
                </RowCmn.ChildrenRow>
            </View>
        </View>
    )
}

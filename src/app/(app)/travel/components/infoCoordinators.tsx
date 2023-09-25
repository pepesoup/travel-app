import { RowCmn, Links, TextCmn } from '@root/src/rn-components/src/components/commonUi'
import { useTravelInfo } from '@root/src/stores/travels/travelStore'
import _ from 'lodash'
import { View, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'

export const InfoCoordinators = () => {
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
                    Kontakt Coordinatorer
                </TextCmn>
            </View>
            <View style={{ backgroundColor: theme.colors.background, padding: 10, gap: 10 }}>
                {travelInfo.coordinators.map(({ name, tel }, i) => (
                    <RowCmn.ChildrenRow label={name} key={`coord_tel_${i}`}>
                        <Links.LinkCmn url={`tel:+${tel}`}>{tel}</Links.LinkCmn>
                    </RowCmn.ChildrenRow>
                ))}
            </View>
        </View>
    )
}

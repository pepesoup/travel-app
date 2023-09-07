import { LinkCmn, TextCmn } from '@root/src/rn-components/src/components/commonUi'
import TextRowCmn from '@root/src/rn-components/src/components/commonUi/text/textRowCmn'
import { View, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'

const testUrl =
    'https://www.apollo.se/grekland/rhodos/afandou-och-kolymbia/hotell/levante--powered-by-playitas?productCategoryCode=FlightAndHotel&catalogueItemId=165291&page=priceCalendar&departureAirportCode=ARN&duration=0&paxAges=18,18&departureDate=2023-09-13&isExternalFlight=false&arrivalAirportCode=RHO&flightPackageCode=1~v:3;onr:NVR265;inr:NVR266;dair:ARN;ddate:2023-09-13;dur:7;cls:Y;i_tp:0;aair:RHO;outdeptime:20230913T0700;outarrtime:20230913T1155;indeptime:20230920T2300;inarrtime:20230921T0205;cyc:20230913%7C20230920;fcd:ARNRHO31ARNRHO%7CARNRHO31RHOARN;id:189045432%2F435910%7C189047593%2F435911'

export const InfoCard = () => {
    const theme = useTheme()
    const styles = StyleSheet.create({
        linkText: {
            fontWeight: 'bold',
            textDecorationLine: 'underline',
            color: theme.colors.primary,
        },
        containerStyle: {
            paddingTop: 10,
        },
    })
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
                    Mitt hotell
                </TextCmn>
            </View>
            <View style={{ backgroundColor: theme.colors.background, padding: 10 }}>
                <TextRowCmn label="Adress:">Street name 36 23455, Chania Grekland</TextRowCmn>
                <TextRowCmn label="Telefon:">+36-7658585</TextRowCmn>
                <TextRowCmn
                    label="E-post:"
                    style={styles.linkText}
                    styleContainer={{ paddingTop: 10 }}
                >
                    <LinkCmn url="mailto:sunny.inn@mail.com">sunny.inn@mail.com</LinkCmn>
                </TextRowCmn>
                <TextRowCmn
                    label="Hemsida:"
                    style={styles.linkText}
                    styleContainer={{ paddingTop: 10 }}
                >
                    <LinkCmn url={testUrl}>sunnyinn.com</LinkCmn>
                </TextRowCmn>
            </View>
        </View>
    )
}

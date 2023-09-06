import { appThemeState } from "../../theme/themeStates"
import { Pressable, View } from "react-native"
import { useRecoilValue } from "recoil"
import { TextCmn } from "../common"
import { intervalToDuration, formatDuration, format, addDays } from "date-fns";
import { sv } from "date-fns/locale";
import _ from "lodash";
import { useState } from "react";
import { SchemaDetailCard } from "./schemaDetailCard";

export const SchemaDayCard = ({ startDate, plusDays }: any) => {
    const date = addDays(startDate, plusDays)
    const theme = useRecoilValue(appThemeState)
    const dayName = _.upperFirst(format(date, 'EEEE', { locale: sv }))
    const dayNumber = format(date, 'dd', { locale: sv })
    const monthName = _.upperFirst(format(date, 'LLLL', { locale: sv }))
    const [showDetails, setShowDetails] = useState(false)

    const Details = () => {
        if (!showDetails) {
            return null
        }
        return (<View style={{
            flex: 1
        }}>
            <SchemaDetailCard
                dayEvent={{ type: 'walk', time: '08:00', label: 'Morgonpromenad' }}
                style={{ marginTop: 10 }}
            />
            <SchemaDetailCard dayEvent={{ type: 'meal', time: '08:30', label: 'Frukost' }} />
            <SchemaDetailCard dayEvent={{ type: 'yoga', time: '10:30', label: 'Yoga' }} />
            <SchemaDetailCard dayEvent={{ type: 'meal', time: '12:30', label: 'Lunch' }} />
            <SchemaDetailCard dayEvent={{ type: 'exercise', time: '15:30', label: 'Smart träning med Mårten' }} />
            <SchemaDetailCard dayEvent={{ type: 'lecture', time: '17:30', label: 'Föreläsning med Mårten' }} />
            <SchemaDetailCard dayEvent={{ type: 'meal', time: '19:00', label: 'Gemensam middag' }} />
        </View>)
    }

    return (
        <View
            style={{
                width: '80%',
                marginBottom: 20,
            }}
        >

            <Pressable onPress={() => { setShowDetails(!showDetails) }}>
                <View
                    style={{
                        flexDirection: 'row',
                        borderRadius: 5,
                        overflow: 'hidden',
                    }}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 5,
                        paddingVertical: 20,
                        backgroundColor: theme.colors.primary
                    }}>
                        <TextCmn variant='titleLarge' style={{ color: 'white' }} >{dayNumber}</TextCmn>
                        <TextCmn variant='bodySmall' style={{ color: 'white' }}>{monthName}</TextCmn>

                    </View>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 10,
                        paddingVertical: 20,
                        backgroundColor: 'white'

                    }}>
                        <TextCmn variant='titleLarge' >{dayName}</TextCmn>
                        <TextCmn variant='titleMedium' >Dag {plusDays + 1}</TextCmn>
                    </View>
                </View>
            </Pressable>
            {Details()}

        </View>
    )
}
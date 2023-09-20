import { Pressable, View, StyleSheet } from 'react-native'
import { TextCmn } from '@rn-components/commonUi'
import { format, addDays } from 'date-fns'
import { sv } from 'date-fns/locale'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { SchemaDetailCard } from './schemaDetailCard'
import { MotiView, useDynamicAnimation } from 'moti'
import { useSchemaUiStoreBase } from '../schemaUiStore'
import { TouchableRipple, useTheme } from 'react-native-paper'
import { Event } from '@src/stores/types'
import { colors } from '../edit/components/colors'
import { useTravelStoreBase } from '@root/src/stores/travels/travelStore'

export type Props = {
    startDate: Date
    day: number
    events: { [eventId: string]: Event }
}

export const SchemaDayCard = (props: Props) => {
    const { startDate, day, events, ...restProps } = props
    //const showDetails = useSchemaUiStoreBase().selectedDay
    const uiStore = useSchemaUiStoreBase.getState()
    const schemeDay = useTravelStoreBase.getState().content.schema[day]
    const date = addDays(startDate, day)
    const theme = useTheme()
    const dayName = _.upperFirst(format(date, 'EEEE', { locale: sv }))
    const dayNumber = format(date, 'dd', { locale: sv })
    const monthName = _.upperFirst(format(date, 'LLLL', { locale: sv }))
    const [detailsHeight, setDetailsHeight] = useState<any>()
    const [animationState, setAnimationState] = useState<any>(() => {})

    const animation = useDynamicAnimation(() => ({
        height: 0,
        opacity: 0,
    }))
    const duration = 800
    //const animationType = { easing: Easing.inOut(Easing.quad) }
    const animationType = {}

    useEffect(() => {
        if (uiStore.selectedDay === day) {
            animation.animateTo((current) => ({
                height: detailsHeight,
                opacity: 1,
                transition: { type: 'timing', duration, ...animationType },
            }))
        } else {
            animation.animateTo((current) => ({
                height: 0,
                opacity: 0,
                transition: { type: 'timing', duration, ...animationType },
            }))
        }
    }, [uiStore.selectedDay])

    useEffect(() => {
        const height = (Object.keys(schemeDay).length + 0) * 80 + 10
        setDetailsHeight(height)
        if (uiStore.selectedDay !== day) {
            setAnimationState(animation)
        } else {
            animation.animateTo((current) => ({
                height: height,
                opacity: 1,
                transition: { type: 'timing', duration, ...animationType },
            }))
        }
    }, [schemeDay, uiStore.selectedDay])

    const onPress = () => {
        useSchemaUiStoreBase.setState({ selectedEvent: null })
        if (uiStore.selectedDay === day) {
            useSchemaUiStoreBase.setState({ selectedDay: null })
        } else {
            useSchemaUiStoreBase.setState({ selectedDay: day })
        }
    }

    /* just use this one for dev - to meassure height for animation of details */
    const onDetailsLayout = ({ nativeEvent }: any) => {
        return
        if (!detailsHeight) {
            //if (true) {
            const { height } = nativeEvent.layout
            console.log('------------ RESETTING onDetailsLayout ------------ height:', height)
            setDetailsHeight(height)
            setAnimationState(animation)
        }
    }

    const Details = () => {
        return (
            <MotiView
                state={animationState}
                style={[
                    {
                        overflow: 'hidden',
                        paddingTop: 10,
                    },
                ]}
                onLayout={(e) => onDetailsLayout(e)}
            >
                {Object.entries(events)
                    .sort((a, b) => {
                        const aa = Number(a[1].time.replace(':', ''))
                        const bb = Number(b[1].time.replace(':', ''))
                        return aa - bb
                    })
                    .map(([eventId, event]: [string, Event], i: number) => {
                        return (
                            <SchemaDetailCard
                                day={day}
                                event={event}
                                style={{ marginTop: 0 }}
                                key={`detailsCard-${i}`}
                            />
                        )
                    })}
            </MotiView>
        )
    }

    return (
        <View
            style={{
                width: '80%',
                marginBottom: 20,
            }}
            {...restProps}
        >
            <TouchableRipple
                borderless
                rippleColor="rgba(0, 0, 0, .1)"
                onPress={() => {
                    onPress()
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        borderRadius: 5,
                        overflow: 'hidden',
                        borderWidth: uiStore.isAdminMode && day === uiStore.selectedDay ? 2 : 0,
                        borderColor: theme.colors.tertiaryContainer,
                    }}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: 5,
                            paddingVertical: 20,
                            backgroundColor: theme.colors.primary,
                        }}
                    >
                        <TextCmn variant="titleLarge" style={{ color: 'white' }}>
                            {dayNumber}
                        </TextCmn>
                        <TextCmn variant="bodySmall" style={{ color: 'white' }}>
                            {monthName}
                        </TextCmn>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: 10,
                            paddingVertical: 20,
                            backgroundColor: 'white',
                        }}
                    >
                        <TextCmn variant="titleLarge">{dayName}</TextCmn>
                        <TextCmn variant="titleMedium">Dag {day + 1}</TextCmn>
                    </View>
                </View>
            </TouchableRipple>

            <Details />
        </View>
    )
}

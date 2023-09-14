import { Pressable, View, StyleSheet } from 'react-native'
import { TextCmn } from '@rn-components/commonUi'
import { format, addDays } from 'date-fns'
import { sv } from 'date-fns/locale'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { SchemaDetailCard } from './schemaDetailCard'
import { MotiView, useDynamicAnimation } from 'moti'
import { useShowDetailsStoreBase } from '../store'
import { useTheme } from 'react-native-paper'

export const SchemaDayCard = (props: any) => {
    const { startDate, plusDays, ...restProps } = props
    const showDetails = useShowDetailsStoreBase().selected
    const date = addDays(startDate, plusDays)
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
        console.log('showDetails:', showDetails)
        if (showDetails === plusDays) {
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
    }, [showDetails])

    const onPress = () => {
        if (showDetails === plusDays) {
            useShowDetailsStoreBase.setState({ selected: null })
        } else {
            useShowDetailsStoreBase.setState({ selected: plusDays })
        }
    }
    const onDetailsLayout = ({ nativeEvent }: any) => {
        if (!detailsHeight) {
            const { height } = nativeEvent.layout
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
                    },
                ]}
                onLayout={(e) => onDetailsLayout(e)}
            >
                <SchemaDetailCard
                    dayEvent={{ type: 'walk', time: '08:00', label: 'Morgonpromenad' }}
                    style={{ marginTop: 10 }}
                />
                <SchemaDetailCard dayEvent={{ type: 'meal', time: '08:30', label: 'Frukost' }} />
                <SchemaDetailCard dayEvent={{ type: 'yoga', time: '10:30', label: 'Yoga' }} />
                <SchemaDetailCard dayEvent={{ type: 'meal', time: '12:30', label: 'Lunch' }} />
                <SchemaDetailCard
                    dayEvent={{
                        type: 'exercise',
                        time: '15:30',
                        label: 'Smart träning med Mårten',
                    }}
                />
                <SchemaDetailCard
                    dayEvent={{ type: 'lecture', time: '17:30', label: 'Föreläsning med Mårten' }}
                />
                <SchemaDetailCard
                    dayEvent={{ type: 'meal', time: '19:00', label: 'Gemensam middag' }}
                />
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
            <Pressable
                onPress={() => {
                    onPress()
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        borderRadius: 5,
                        overflow: 'hidden',
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
                        <TextCmn variant="titleMedium">Dag {plusDays + 1}</TextCmn>
                    </View>
                </View>
            </Pressable>

            {Details()}
        </View>
    )
}

const styles = StyleSheet.create({
    shape: {
        justifyContent: 'center',
        height: 250,
        width: 250,
        borderRadius: 25,
        marginRight: 10,
        backgroundColor: 'black',
    },
    shape2: {
        backgroundColor: 'hotpink',
        marginTop: 16,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#111',
    },
})

import { ScreenCmn } from '@rn-components/commonUi'
import { Stack, usePathname } from 'expo-router'
import { useEffect, useRef } from 'react'
import { Pressable, View } from 'react-native'
import { SchemaDayCard } from './components/schemaDayCard'
import { MotiScrollView } from 'moti'
import { useSchemaUiStoreBase } from './schemaUiStore'
import {
    useTravelInfo,
    useTravelSchema,
    useTravelState,
} from '@root/src/stores/travels/travelStore'
import { HeaderRight, iconSizeAtHeader } from '../_layout'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useTheme } from 'react-native-paper'
import { DayFab } from './edit/components/dayFab'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import { addDays } from 'date-fns'
import { useAccountStore } from '@root/src/stores/user/accountStore'

export default function SchemaMain() {
    const uiStore = useSchemaUiStoreBase()
    const scrollViewRef = useRef<any>(null)
    const theme = useTheme()
    const path = usePathname()
    const travelState = useTravelState()
    const travelSchema = useTravelSchema()
    const travelInfo = useTravelInfo()
    const account = useAccountStore()

    const scrollTo_h = 122
    const scrollTo_addH = 25

    useEffect(() => {
        console.log('-- main: []')
        /** open "today's" active schema */
        const nowDate = addDays(new Date(), 0)
        Object.entries(travelSchema).map(([dayId, schemaDay]) => {
            const schemaDate = addDays(travelInfo.startDate, schemaDay.info.day)
            if (differenceInCalendarDays(nowDate, schemaDate) === 0) {
                useSchemaUiStoreBase.setState({ selectedDayId: dayId })
            }
        })
    }, [])

    useEffect(() => {
        useSchemaUiStoreBase.setState({ enableFabs: path === '/schema/schemaMain' })
        console.log('-- main: Path:', path)
    }, [path])

    useEffect(() => {
        if (uiStore.selectedDayId !== null) {
            const day = travelSchema[uiStore.selectedDayId].info.day
            const newY = (day + 0) * scrollTo_h + scrollTo_addH
            scrollViewRef.current?.scrollTo({
                x: 0,
                y: newY < 0 ? 0 : newY,
                animated: 0,
            })
        }
    }, [uiStore.selectedDayId])

    useEffect(() => {
        console.log('---------------- main - start ---------------------')
        console.log(JSON.stringify(uiStore, null, 4))
        console.log('---------------- main - end ---------------------')
    }, [uiStore])

    const AdminIcon = () => {
        if (account.content?.settings?.admin !== true) {
            return null
        }
        return (
            <Pressable
                onPress={() => {
                    uiStore.toggleAdminMode()
                }}
            >
                <MaterialCommunityIcons
                    name="pencil"
                    size={iconSizeAtHeader}
                    color={
                        uiStore.isAdminMode ? theme.colors.tertiaryContainer : theme.colors.primary
                    }
                />
            </Pressable>
        )
    }

    if (travelState.value !== 'hasValue') {
        return null
    }

    return (
        <ScreenCmn>
            <Stack.Screen
                options={{
                    title: 'Schema',
                    headerRight: () => <HeaderRight addIcon={<AdminIcon />} />,
                }}
            />
            <DayFab />

            <MotiScrollView
                onContentSizeChange={(w, h) => {
                    if (uiStore.selectedDayId !== null) {
                        const day = travelSchema[uiStore.selectedDayId].info.day
                        const target = (day + 0) * scrollTo_h + scrollTo_addH
                        const newH = h - scrollTo_addH
                        const newY = Math.min(target < 0 ? 0 : target, newH < 0 ? 0 : newH)
                        setTimeout(() => {
                            scrollViewRef.current.scrollTo({
                                x: 0,
                                y: newY < 0 ? 0 : newY,
                                //animated: 1000,
                            })
                        }, 0)
                    }
                }}
                style={{
                    width: '100%',
                    //marginTop: 30,
                    paddingTop: 30,
                }}
                contentContainerStyle={{
                    alignItems: 'center',
                }}
                ref={scrollViewRef}
            >
                {Object.keys(travelSchema)
                    .sort((a, b) => {
                        return travelSchema[a].info.day - travelSchema[b].info.day
                    })
                    .map((dayId) => {
                        const data = travelSchema[dayId]
                        return (
                            <SchemaDayCard
                                startDate={travelInfo.startDate}
                                dayId={dayId}
                                day={data.info.day}
                                events={data.events}
                                key={`dayCard-${dayId}`}
                            />
                        )
                    })}
                <View style={{ height: 40 }} />
            </MotiScrollView>
        </ScreenCmn>
    )
}

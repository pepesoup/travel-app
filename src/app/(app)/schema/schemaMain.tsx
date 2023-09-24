import { ScreenCmn } from '@rn-components/commonUi'
import { Stack, usePathname, useRouter } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { Pressable, View, Modal } from 'react-native'
import { SchemaDayCard } from './components/schemaDayCard'
import { MotiScrollView } from 'moti'
import { useSchemaUiStoreBase } from './schemaUiStore'
import {
    useTravelInfo,
    useTravelSchema,
    useTravelState,
} from '@root/src/stores/travels/travelStore'
import { DataProvider } from '@root/src/rne-firebase/src/components/data/dataProvider/dataProvider'
import { HeaderRight, iconSizeAtHeader } from '../_layout'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { FAB, Portal, useTheme } from 'react-native-paper'
import { DayFab } from './edit/components/dayFab'

export default function SchemaMain() {
    const uiStore = useSchemaUiStoreBase()
    const scrollViewRef = useRef<any>(null)
    const theme = useTheme()
    const path = usePathname()
    const travelState = useTravelState()
    const travelSchema = useTravelSchema()
    const travelInfo = useTravelInfo()

    useEffect(() => {
        useSchemaUiStoreBase.setState({ enableFabs: path === '/schema/schemaMain' })
    }, [path])

    useEffect(() => {
        if (uiStore.selectedDayId !== null) {
            const day = travelSchema[uiStore.selectedDayId].info.day
            scrollViewRef.current?.scrollTo({
                x: 0,
                y: (day + 0) * 112 + 30 || 0,
                animated: 0,
            })
        }
    }, [uiStore.selectedDayId])

    const AdminIcon = () => (
        <Pressable
            onPress={() => {
                uiStore.toggleAdminMode()
            }}
        >
            <MaterialCommunityIcons
                name="pencil"
                size={iconSizeAtHeader}
                color={uiStore.isAdminMode ? theme.colors.tertiaryContainer : theme.colors.primary}
            />
        </Pressable>
    )

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
                        const target = (day + 0) * 112 + 30
                        setTimeout(() => {
                            scrollViewRef.current.scrollTo({
                                x: 0,
                                y: Math.min(target, h - 30),
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

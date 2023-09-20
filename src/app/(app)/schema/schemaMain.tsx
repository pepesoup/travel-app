import { ScreenCmn } from '@rn-components/commonUi'
import { Stack, usePathname, useRouter } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { Pressable, View, Modal } from 'react-native'
import { SchemaDayCard } from './components/schemaDayCard'
import { MotiScrollView } from 'moti'
import { useSchemaUiStoreBase } from './schemaUiStore'
import { useTravelStoreBase } from '@root/src/stores/travels/travelStore'
import { DataProvider } from '@root/src/rne-firebase/src/components/data/dataProvider/dataProvider'
import { HeaderRight, iconSizeAtHeader } from '../_layout'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { FAB, Portal, useTheme } from 'react-native-paper'
import { DayFab } from './edit/components/dayFab'

export default function SchemaMain() {
    const uiStore = useSchemaUiStoreBase()
    const scrollViewRef = useRef<any>(null)
    const travel = useTravelStoreBase()
    const theme = useTheme()
    const path = usePathname()

    useEffect(() => {
        useSchemaUiStoreBase.setState({ enableFabs: path === '/schema/schemaMain' })
    }, [path])

    useEffect(() => {
        if (uiStore.selectedDay !== null) {
            scrollViewRef.current?.scrollTo({
                x: 0,
                y: (uiStore.selectedDay + 0) * 112 + 30 || 0,
                animated: 0,
            })
        }
    }, [uiStore.selectedDay])

    useEffect(() => {}, [])

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

    return (
        <ScreenCmn>
            <Stack.Screen
                options={{
                    title: 'Schema',
                    headerRight: () => <HeaderRight addIcon={<AdminIcon />} />,
                }}
            />
            <DataProvider storeStates={[useTravelStoreBase()]} fallbackOnNullValue>
                <DayFab />

                <MotiScrollView
                    onContentSizeChange={(w, h) => {
                        if (uiStore.selectedDay !== null) {
                            const target = (uiStore.selectedDay + 0) * 112 + 30
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
                    {Object.entries(travel.content?.schema || {}).map(
                        ([day, events]: [string, any]) => {
                            return (
                                <SchemaDayCard
                                    startDate={travel?.content.startDate}
                                    day={Number(day)}
                                    events={events}
                                    key={`dayCard-${day}`}
                                />
                            )
                        }
                    )}
                    <View style={{ height: 40 }} />
                </MotiScrollView>
            </DataProvider>
        </ScreenCmn>
    )
}

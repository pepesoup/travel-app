import { ScreenCmn } from '@rn-components/commonUi'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect, useRef } from 'react'
import { ScrollView, View } from 'react-native'
import { SchemaDayCard } from './components/schemaDayCard'
import { MotiScrollView } from 'moti'
import { useRecoilState } from 'recoil'
import { showDetailsState } from './state/detailsState'

export default function SchemaMain() {
    const [showDetails, setShowDetails] = useRecoilState(showDetailsState)
    const scrollViewRef = useRef<any>(null)

    useEffect(() => {
        if (showDetails !== null) {
            setTimeout(() => {
                scrollViewRef.current.scrollTo({
                    x: 0,
                    y: (showDetails + 0) * 112 + 30,
                    animated: 1000,
                })
            }, 0)
        }
    }, [showDetails])

    useEffect(() => {}, [])

    return (
        <ScreenCmn>
            <Stack.Screen
                options={{
                    title: 'Schema',
                }}
            />
            <MotiScrollView
                onLayout={(e) => {
                    console.log('sv layout:', e.nativeEvent.layout)
                }}
                onContentSizeChange={(w, h) => {
                    console.log(h)
                    if (showDetails !== null) {
                        const target = (showDetails + 0) * 112 + 30
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
                <SchemaDayCard startDate={new Date()} plusDays={0} />
                <SchemaDayCard startDate={new Date()} plusDays={1} />
                <SchemaDayCard startDate={new Date()} plusDays={2} />
                <SchemaDayCard startDate={new Date()} plusDays={3} />
                <SchemaDayCard startDate={new Date()} plusDays={4} />
                <SchemaDayCard startDate={new Date()} plusDays={5} />
                <SchemaDayCard startDate={new Date()} plusDays={6} />
                <View style={{ height: 40 }} />
            </MotiScrollView>
        </ScreenCmn>
    )
}

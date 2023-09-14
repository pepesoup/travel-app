import { ScreenCmn } from '@rn-components/commonUi'
import { Stack } from 'expo-router'
import { useEffect, useRef } from 'react'
import { View } from 'react-native'
import { SchemaDayCard } from './components/schemaDayCard'
import { MotiScrollView } from 'moti'
import { useShowDetailsStoreBase } from './store'

export default function SchemaMain() {
    //const [showDetails, setShowDetails] = useRecoilState(showDetailsState)
    const showDetails = useShowDetailsStoreBase().selected
    const scrollViewRef = useRef<any>(null)

    useEffect(() => {
        console.log('SchemaMain - showDetails:', showDetails)
        if (showDetails !== null) {
            scrollViewRef.current.scrollTo({
                x: 0,
                y: (showDetails + 0) * 112 + 30,
                animated: 0,
            })
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

import React, { Suspense, useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { RecoilRoot, useRecoilValue } from 'recoil'
import RecoilNexus from 'recoil-nexus'
import { PaperProvider, Text } from 'react-native-paper'
import { Slot, Stack } from 'expo-router'

export default function App() {
    useEffect(() => { }, [])
    return (
        <RecoilRoot>
            <RecoilNexus />
            <SafeAreaProvider>
                <SafeAreaView
                    style={{
                        flex: 1,
                        backgroundColor: 'black',
                    }}
                >
                    <Suspense>
                        <PaperProvider>
                            <Stack
                                screenOptions={{
                                    headerStyle: {
                                        backgroundColor: 'yellow',
                                    },
                                    headerTintColor: 'white',
                                    headerTitleStyle: {
                                        fontWeight: "bold",
                                    },
                                    headerBackTitleVisible: false
                                }}
                            />
                        </PaperProvider>
                    </Suspense>
                </SafeAreaView>
            </SafeAreaProvider>
        </RecoilRoot>
    )
}

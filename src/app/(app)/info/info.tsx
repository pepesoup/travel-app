import { GapCmn, SurfaceCmn, TextCmn } from '@rn-components/commonUi'
import { Stack } from 'expo-router'
import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native'
import { ScreenCmn } from '@rn-components/commonUi'

export default function Info() {
    const { height, width } = useWindowDimensions()
    const styles = StyleSheet.create({
        surface: {
            height: 80,
            width: width - 60,
            //width: 'auto',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
        },
        surfaceContainer: {
            alignItems: 'flex-start',
        },
    })
    return (
        <ScreenCmn>
            <Stack.Screen
                options={{
                    title: 'Info',
                }}
            />
            <ScrollView style={{ width: width }} contentContainerStyle={{ alignItems: 'center' }}>
                <GapCmn size={20} direction="vertical" />
                <SurfaceCmn style={styles.surface} containerStyle={styles.surfaceContainer}>
                    <TextCmn
                        style={
                            {
                                //backgroundColor: 'red',
                                //width: '100%',
                            }
                        }
                    >
                        Todo...
                    </TextCmn>
                </SurfaceCmn>
                <GapCmn size={25} direction="vertical" divider />
            </ScrollView>
        </ScreenCmn>
    )
}

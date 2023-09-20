import { View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { SchemaDetailCard } from '../../components/schemaDetailCard'
import { Event } from '@src/stores/types'

type Props = {
    eventToShow: Event | null
}

export const EventLook = ({ eventToShow }: Props) => {
    const theme = useTheme()
    return (
        <View
            style={{
                width: '100%',
                marginBottom: 10,
            }}
        >
            <View
                style={{
                    marginTop: 20,
                    marginBottom: 0,
                    height: 0,
                    backgroundColor: 'yellow',
                }}
            />
            <View
                style={{
                    width: '100%',
                    height: 80,
                    backgroundColor: theme.colors.background,
                    paddingHorizontal: 20,
                }}
            >
                <SchemaDetailCard day={-1} event={eventToShow} freeStanding />
            </View>
            <View
                style={{
                    marginBottom: 10,
                    height: 0,
                    backgroundColor: theme.colors.primary,
                    width: '100%',
                }}
            />
        </View>
    )
}

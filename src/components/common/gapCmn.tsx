import { View, ViewStyle } from 'react-native'
import { Divider } from 'react-native-paper'
export default function Gap({ size, direction = 'horizontal', divider }: any) {
    return (
        <View
            style={{
                [direction === 'horizontal' ? 'width' : 'height']: size,
                [direction === 'horizontal' ? 'height' : 'width']: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                //backgroundColor: 'red',
            }}
        >
            {divider ? (
                <Divider theme={{ colors: { primary: 'green' } }} style={{ width: '100%' }} />
            ) : null}
        </View>
    )
}

import { TextInputCmn } from '@rn-components/commonUi'
import { KeyboardAwareScrollViewCmn } from '@rn-components/commonUi/keyboardAwareScrollViewCmn'
import { View } from 'react-native'
import { WheelPicker } from '../components/wheelPicker'
import { useTheme } from 'react-native-paper'
import { useEditActions } from '../hooks/useEditActions'

type Props = {
    action: 'add' | 'update'
}

export default function AddAndUpdate({ action }: Props) {
    const theme = useTheme()
    const editData = useEditActions()

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <WheelPicker />
            <View
                style={{
                    borderBottomColor: theme.colors.primaryContainer,
                    borderBottomWidth: 6,
                    width: '100%',
                }}
            />
            <KeyboardAwareScrollViewCmn contentContainerStyle={{ padding: 20 }}>
                <TextInputCmn
                    label="Beskrivning"
                    numberOfLines={2}
                    multiline
                    value={editData.getEventData()?.description}
                    onChangeText={(text) => editData.updateEventData({ description: text })}
                    style={{ backgroundColor: 'white' }}
                />
            </KeyboardAwareScrollViewCmn>
        </View>
    )
}

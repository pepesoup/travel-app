import { TextInputCmn } from '@rn-components/commonUi'
import { KeyboardAwareScrollViewCmn } from '@rn-components/commonUi/keyboardAwareScrollViewCmn'
import { View } from 'react-native'
import { useEffect, useState } from 'react'
import { Checkbox, TextInput, useTheme } from 'react-native-paper'
import { Stack, useRouter } from 'expo-router'
import { useTravelStoreBase } from '@root/src/stores/travels/travelStore'
import { Note } from '@root/src/stores/types'

type Props = {
    onChange: (n: Note) => void
}

export default function NoteComposer({ onChange }: Props) {
    const theme = useTheme()
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [checked, setChecked] = useState(true)

    useEffect(() => {
        onChange({
            subject,
            message,
            timestamp: Date.now(),
            type: 'schema',
        })
    }, [subject, message])

    return (
        <View
            style={{
                borderColor: theme.colors.primary,
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                gap: 5,
                marginHorizontal: 20,
            }}
        >
            <Checkbox.Item
                color={checked ? theme.colors.tertiaryContainer : 'gray'}
                mode="ios"
                label="Skicka en notis"
                labelStyle={{ color: 'white' }}
                labelVariant="titleLarge"
                status={checked ? 'checked' : 'indeterminate'}
                onPress={() => {
                    setChecked(!checked)
                }}
            />
            <TextInputCmn
                label="Ämne"
                value={subject}
                onChangeText={(text) => setSubject(text)}
                style={{ backgroundColor: checked ? 'white' : 'transparent' }}
                disabled={!checked}
            />
            <TextInputCmn
                multiline
                numberOfLines={2}
                label="Meddelande"
                value={message}
                onChangeText={(text) => setMessage(text)}
                style={{ backgroundColor: checked ? 'white' : 'transparent', minHeight: 75 }}
                disabled={!checked}
            />
        </View>
    )
}

import { TextInputCmn } from '@rn-components/commonUi'
import { KeyboardAwareScrollViewCmn } from '@rn-components/commonUi/keyboardAwareScrollViewCmn'
import { View } from 'react-native'
import { useEffect, useState } from 'react'
import { Checkbox, TextInput, useTheme } from 'react-native-paper'
import { Stack, useRouter } from 'expo-router'
import { Note } from '@root/src/stores/travels/types.travel'

type Props = {
    onChange: (n: Partial<Note> & { checked?: boolean }) => void
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
            checked,
        })
    }, [subject, message, checked])

    return (
        <View
            style={{
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.primary,
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                gap: 5,
                marginHorizontal: 20,
            }}
        >
            <Checkbox.Item
                color={checked ? 'rgba(0, 200, 0, 1)' : 'rgba(111,111,111,0.5)'}
                mode="android"
                label="Skicka en notis för händelsen"
                //labelStyle={{ color: 'white' }}
                labelVariant="titleMedium"
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

import React, { useState, useEffect } from 'react'
import { Button, Image, View, Platform, LogBox } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { ImagePickerResult } from 'expo-image-picker'
import { uploadFile, uploadLocalFile } from '@root/src/rne-firebase/src/firebase/firebaseStorageApi'
import { auth } from '@root/src/rne-firebase/firebaseConfig'

LogBox.ignoreLogs([
    'Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead',
])

export default function ImagePickerExample() {
    const [image, setImage] = useState(null)

    const pickImage = async () => {
        Promise<ImagePicker.ImagePickerResult>

        // No permissions request is necessary for launching the image library
        let result: any = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        console.log(JSON.stringify(result, null, 4))
        const uri = result?.assets[0].uri as any
        if (uri) {
            setImage(uri)
            const url = await uploadLocalFile({
                path: `${auth.currentUser?.uid}/profile.jpg`,
                uri,
            })
            console.log('url:', JSON.stringify(url, null, 4))
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
    )
}

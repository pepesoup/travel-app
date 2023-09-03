import { FirebaseApp, initializeApp, getApps, getApp } from 'firebase/app'
import { getDatabase, enableLogging } from 'firebase/database'
import { Auth, getAuth, initializeAuth } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getReactNativePersistence } from 'firebase/auth/react-native'

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
import { getStorage } from 'firebase/storage'

import { APIKEY, AUTHDOMAIN, DATABASEURL, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID, APPID } from '@env'
const firebaseConfig = {
    apiKey: APIKEY,
    authDomain: AUTHDOMAIN,
    databaseURL: DATABASEURL,
    projectId: PROJECTID,
    storageBucket: STORAGEBUCKET,
    messagingSenderId: MESSAGINGSENDERID,
    appId: APPID,
    //measurementId: "G-measurement-id",
}

const initializeFirebase = () => {
    let app: FirebaseApp
    let auth: Auth

    if (!getApps().length) {
        /********** app ************/
        app = initializeApp(firebaseConfig)

        /********** auth ************/
        auth = initializeAuth(app, {
            persistence: getReactNativePersistence(AsyncStorage),
        })
        auth.languageCode = 'sv'
        auth.settings.appVerificationDisabledForTesting = true // not working

        /********** db ************/
        //enableLogging(true, false)
    } else {
        /********** already initialized ************/
        app = getApp()
        auth = getAuth(app)
    }
    //await auth.setSettings(appVerificationDisabledForTesting: true)
    //await auth.settings.appVerificationDisabledForTesting = true
    const db = getDatabase(app)
    const storage = getStorage(app)
    return { app, auth, db, storage }
}

export const { app, auth, db, storage } = initializeFirebase()

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

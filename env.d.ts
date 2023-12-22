//import type * as fb from '@src/rne-firebase/env.d.ts'
//console.log('fb', JSON.stringify(fb, null, 4))
// Todo: better to import -> export types from the env.d.ts in firebase project

declare module '@env' {
    export const FIREBASE_APIKEY: string
    export const FIREBASE_AUTHDOMAIN: string
    export const FIREBASE_DATABASEURL: string
    export const FIREBASE_PROJECTID: string
    export const FIREBASE_STORAGEBUCKET: string
    export const FIREBASE_MESSAGINGSENDERID: string
    export const FIREBASE_APPID: string

    export const DEV_AUTH_EMAIL: undefined | string
    export const DEV_AUTH_PASSWORD: undefined | string

    export const FROM_SUBMODULE: string

    export const GETSTREAM_APIKEY: string
    export const GETSTREAM_API_SECRET: string
}

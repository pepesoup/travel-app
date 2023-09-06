import { DarkTheme as NavigationDarkTheme, Theme as NavTheme } from '@react-navigation/native'
import { MD3Theme } from 'react-native-paper'
import { atom } from 'recoil'
import { darkTheme, darkNavTheme, lightTheme, retreafyTheme } from './themesDef'

export const appThemeState = atom<NavTheme & MD3Theme>({
    key: 'app/themes/appThemeState',
    effects: [
        ({ setSelf }) => {
            //setSelf(darkTheme)
            //setSelf(lightTheme)
            setSelf(retreafyTheme)
        },
    ],
})

export const navThemeState = atom<NavTheme & MD3Theme>({
    key: 'app/themes/navThemeState',
    effects: [
        ({ setSelf }) => {
            setSelf(darkNavTheme)
        },
    ],
})

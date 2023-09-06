import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
    Theme as NavTheme,
} from '@react-navigation/native'
import {
    MD3Theme,
    MD3DarkTheme as PaperDarkTheme,
    MD3LightTheme as PaperLightTheme,
} from 'react-native-paper'
import { ThemeRetreafy } from './themes/retreafyTheme'
import merge from "ts-deepmerge"

const navThemeMod = {
    colors: {
        //background: 'transparent',
        background: 'red',
    },
}
export const darkTheme = merge(NavigationDarkTheme, PaperDarkTheme)
export const lightTheme = merge(NavigationDefaultTheme, PaperLightTheme)
export const retreafyTheme: NavTheme & MD3Theme = merge(NavigationDefaultTheme, ThemeRetreafy)

console.log('dark theme background color:', darkTheme.colors.background)

//export const darkNavTheme = _.merge(navThemeMod, NavigationDefaultTheme)
//export const lightNavTheme = _.merge(navThemeMod, NavigationDefaultTheme)

export const darkNavTheme = {
    ...darkTheme,
    colors: {
        ...darkTheme.colors,
        background: 'transparent',
    },
}

export const lightNavTheme = {
    ...lightTheme,
    colors: {
        ...lightTheme.colors,
        background: 'transparent',
    },
}

export const retreafyNavTheme = {
    ...retreafyTheme,
    colors: {
        ...retreafyTheme.colors,
        background: retreafyTheme.colors.primary,
    },
}

import { getRecoil, setRecoil } from 'recoil-nexus'
import { appThemeState, navThemeState } from './themeStates'
import { darkNavTheme, darkTheme, lightNavTheme, lightTheme } from './themesDef'
import { RecoilState } from 'recoil'
import { Theme } from '@react-navigation/native'
import { MD3Theme } from 'react-native-paper'

export const themeService = {
    // TODO: is this way of getting state value updated in React if changed
    // I mean, is it necessary to fetch theme by useRecoilValue(themeState) instead ??

    get currentTheme(): Theme & MD3Theme {
        return getRecoil(appThemeState)
    },

    get currentThemeState(): RecoilState<Theme & MD3Theme> {
        return appThemeState
    },

    get navigationTheme(): RecoilState<Theme & MD3Theme> {
        return appThemeState
    },

    set setTheme(type: 'light' | 'dark') {
        if (type === 'dark') {
            setRecoil(appThemeState, darkTheme)
            setRecoil(navThemeState, darkNavTheme)
        } else if (type === 'light') {
            setRecoil(appThemeState, lightTheme)
            setRecoil(navThemeState, lightNavTheme)
        }
    },
}

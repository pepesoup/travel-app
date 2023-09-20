import { MD3Theme, MD3LightTheme } from 'react-native-paper'
import _ from 'lodash'
import merge from 'ts-deepmerge'

export const ThemeRetreafy: MD3Theme = merge(MD3LightTheme, {
    colors: {
        background: 'rgb(246, 242, 240)',
        primary: 'rgba(170, 155,159, 1)',
        //primaryContainer: 'rgba(227, 188, 211, 1)',
        primaryContainer: '#C32386',
        onPrimaryContainer: 'rgba(234, 221, 255, 1)',
        onBackground: 'rgba(22, 22, 22, 1)',
        onSurface: 'rgba(22, 22, 22, 1)',
        tertiaryContainer: 'rgba(55, 135, 255, 1)',
        onTertiaryContainer: 'rgba(255, 255, 255, 1)',
        elevation: {
            level0: 'transparent',
            level1: 'white',
            level2: 'white',
            level3: 'white',
            level4: 'white',
            level5: 'white',
        },
    },
})

/*
export const _ThemeRetreafy: MD3Theme = {
"colors": {
    "background": "rgb(246, 242, 240)",         // ok
    "primary": "rgb(170, 155,159)",             // ok
    "primaryContainer": "rgb(227, 188, 211)",   // ok
    "secondary": "rgba(255, 255, 255, 1)",
    "secondaryContainer": "rgba(74, 68, 88, 1)",
    "tertiary": "rgba(239, 184, 200, 1)",
    "tertiaryContainer": "rgba(99, 59, 72, 1)",
    "surface": "rgba(28, 27, 31, 1)",           // check
    "surfaceVariant": "rgba(73, 69, 79, 1)",
    "surfaceDisabled": "rgba(230, 225, 229, 0.12)",
    "error": "rgba(242, 184, 181, 1)",
    "errorContainer": "rgba(140, 29, 24, 1)",
    "onPrimary": "rgba(56, 30, 114, 1)",
    "onPrimaryContainer": "rgba(234, 221, 255, 1)",
    "onSecondary": "rgba(51, 45, 65, 1)",
    "onSecondaryContainer": "rgba(232, 222, 248, 1)",
    "onTertiary": "rgba(73, 37, 50, 1)",
    "onTertiaryContainer": "rgba(255, 216, 228, 1)",
    "onSurface": "rgba(22, 22, 22, 1)",
    "onSurfaceVariant": "rgba(202, 196, 208, 1)",
    "onSurfaceDisabled": "rgba(230, 225, 229, 0.38)",
    "onError": "rgba(96, 20, 16, 1)",
    "onErrorContainer": "rgba(242, 184, 181, 1)",
    "onBackground": "rgba(22, 22, 22, 1)",          // ok
    "outline": "rgba(147, 143, 153, 1)",
    "outlineVariant": "rgba(73, 69, 79, 1)",
    "inverseSurface": "rgba(230, 225, 229, 1)",
    "inverseOnSurface": "rgba(49, 48, 51, 1)",
    "inversePrimary": "rgba(103, 80, 164, 1)",
    "shadow": "rgba(0, 0, 0, 1)",
    "scrim": "rgba(0, 0, 0, 1)",
    "backdrop": "rgba(50, 47, 55, 0.4)",
    "elevation": {
        "level0": "transparent",
        "level1": "rgb(37, 35, 42)",
        "level2": "rgb(44, 40, 49)",
        "level3": "rgb(49, 44, 56)",
        "level4": "rgb(51, 46, 58)",
        "level5": "rgb(52, 49, 63)"
    },
    "card": "rgb(18, 18, 18)",
    "text": "rgb(22, 22, 22)",               // ok
    "border": "rgb(39, 39, 41)",
    "notification": "rgb(255, 69, 58)"
},
"dark": true,
"roundness": 4,
"version": 3,
"isV3": true,
"fonts": {
    "displayLarge": {
        "fontFamily": "sans-serif",
        "letterSpacing": 0,
        "fontWeight": "400",
        "lineHeight": 64,
        "fontSize": 57
    },
    "displayMedium": {
        "fontFamily": "sans-serif",
        "letterSpacing": 0,
        "fontWeight": "400",
        "lineHeight": 52,
        "fontSize": 45
    },
    "displaySmall": {
        "fontFamily": "sans-serif",
        "letterSpacing": 0,
        "fontWeight": "400",
        "lineHeight": 44,
        "fontSize": 36
    },
    "headlineLarge": {
        "fontFamily": "sans-serif",
        "letterSpacing": 0,
        "fontWeight": "400",
        "lineHeight": 40,
        "fontSize": 32
    },
    "headlineMedium": {
        "fontFamily": "sans-serif",
        "letterSpacing": 0,
        "fontWeight": "400",
        "lineHeight": 36,
        "fontSize": 28
    },
    "headlineSmall": {
        "fontFamily": "sans-serif",
        "letterSpacing": 0,
        "fontWeight": "400",
        "lineHeight": 32,
        "fontSize": 24
    },
    "titleLarge": {
        "fontFamily": "sans-serif",
        "letterSpacing": 0,
        "fontWeight": "400",
        "lineHeight": 28,
        "fontSize": 22
    },
    "titleMedium": {
        "fontFamily": "sans-serif-medium",
        "letterSpacing": 0.15,
        "fontWeight": "500",
        "lineHeight": 24,
        "fontSize": 16
    },
    "titleSmall": {
        "fontFamily": "sans-serif-medium",
        "letterSpacing": 0.1,
        "fontWeight": "500",
        "lineHeight": 20,
        "fontSize": 14
    },
    "labelLarge": {
        "fontFamily": "sans-serif-medium",
        "letterSpacing": 0.1,
        "fontWeight": "500",
        "lineHeight": 20,
        "fontSize": 14
    },
    "labelMedium": {
        "fontFamily": "sans-serif-medium",
        "letterSpacing": 0.5,
        "fontWeight": "500",
        "lineHeight": 16,
        "fontSize": 12
    },
    "labelSmall": {
        "fontFamily": "sans-serif-medium",
        "letterSpacing": 0.5,
        "fontWeight": "500",
        "lineHeight": 16,
        "fontSize": 11
    },
    "bodyLarge": {
        "fontFamily": "sans-serif",
        "letterSpacing": 0.15,
        "fontWeight": "400",
        "lineHeight": 24,
        "fontSize": 16
    },
    "bodyMedium": {
        "fontFamily": "sans-serif",
        "letterSpacing": 0.25,
        "fontWeight": "400",
        "lineHeight": 20,
        "fontSize": 14
    },
    "bodySmall": {
        "fontFamily": "sans-serif",
        "letterSpacing": 0.4,
        "fontWeight": "400",
        "lineHeight": 16,
        "fontSize": 12
    },
    "default": {
        "fontFamily": "sans-serif",
        "letterSpacing": 0,
        "fontWeight": "400"
    }
},
"animation": {
    "scale": 1
},
"mode": "adaptive"
}
//*/

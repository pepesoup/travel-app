module.exports = function (api) {
    api.cache(true)
    return {
        presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
        plugins: [
            [
                'module-resolver',
                {
                    extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
                    root: ['.'],
                    alias: {
                        '@root': './',
                        '@src': './src',
                        '@components': './src/components',
                        '@rn-components': './src/rn-components/src/components',
                        '@rne-firebase': ['./src/rne-firebase/src'],
                    },
                },
            ],
            'react-native-reanimated/plugin',
            'expo-router/babel',
            [
                'module:react-native-dotenv',
                {
                    envName: 'APP_ENV',
                    moduleName: '@env',
                    path: '.env',
                    blocklist: null,
                    allowlist: null,
                    blacklist: null, // DEPRECATED
                    whitelist: null, // DEPRECATED
                    safe: false,
                    allowUndefined: false,
                    verbose: false,
                },
            ],
        ],
    }
}

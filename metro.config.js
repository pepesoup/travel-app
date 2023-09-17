const { getDefaultConfig } = require('expo/metro-config')
const defaultConfig = getDefaultConfig(__dirname)
defaultConfig.resolver.sourceExts.push('cjs') /* for Firebase bundling */
defaultConfig.resolver.sourceExts.push('mjs') // immer ?
module.exports = defaultConfig

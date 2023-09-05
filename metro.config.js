// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

config.resolver.assetExts.push('cjs')

module.exports = config

const { createMetroConfiguration } = require('expo-yarn-workspaces')
console.log('createMetroConfiguration', createMetroConfiguration(__dirname))
module.exports = createMetroConfiguration(__dirname)

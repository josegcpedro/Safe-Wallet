
const { getDefaultConfig } = require('expo/metro-config');
const defaultConfig = getDefaultConfig(__dirname);
DEFAULT_LOGGER_CONFIG.resolver.assetExts.push('cjs')

module.exports = defaultConfig;

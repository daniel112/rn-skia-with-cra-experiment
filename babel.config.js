module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-export-namespace-from",
    // NOTE: Make sure to list react-native-reanimated/plugin last.
    // ref: https://docs.swmansion.com/react-native-reanimated/docs/guides/web-support/#webpack-support
    "react-native-reanimated/plugin",
  ],
};

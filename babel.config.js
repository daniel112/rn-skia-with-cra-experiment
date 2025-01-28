module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    "@babel/plugin-proposal-export-namespace-from",
    "react-native-reanimated/plugin",
    "@babel/plugin-proposal-class-properties",
  ],
};

Documentation on web support is limited on react-native-skia and react-native-reanimated. This is an experiment to see if it is possible to integrate react-native-skia and react-native-reanimated on a vanilla React App (not using react-native-web) with webpack.

# Summary

Configuring the `babel` and `webpack` configs are not as straight forward as it seems.
Following the documentation doesn't work as expected. The `react-native-skia` and `react-native-reanimated` packages are not being transpiled correctly unless we utilize react-native-web or expo

- https://docs.swmansion.com/react-native-reanimated/docs/guides/web-support/#webpack-support
- https://shopify.github.io/react-native-skia/docs/getting-started/web/

## What Works

Importing and rendering skia components seems to work ok. I am able to load basic Circle component. Any functionality that doesn't use `react-native-reanimated` works fine so far.

## Blocker

- `react-native-skia` has external use/dependency on `react-native-reanimated`. After all the set up recommended by the docs above, there is an issue where the webApp is unable to load any hooks from `react-native-reanimated`.

## Approach

1. Get the `react-native-skia` and `react-native-reanimated` packages to build on a vanilla React App :white_check_mark:
2. Get several working (simple to complex) examples to work on the vanilla React App :x:
3. Look into [Rollup](https://rollupjs.org/) to create a external package that can be imported into the vanilla React App :small_orange_diamond:

# Running

- npm install
- npm start

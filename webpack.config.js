// Install necessary packages before starting:
// npm install react react-dom typescript @types/react @types/react-dom webpack webpack-cli webpack-dev-server ts-loader html-webpack-plugin --save-dev

const fs = require("fs");
const path = require("path");
const { sources, DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const configuration = {
  mode: "development",
  entry: "./src/index.tsx", // Entry point of your app
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "bundle.js", // Output bundle file
    clean: true, // Clean the output directory before build
  },
  resolve: {
    extensions: [".web.js", ".web.ts", ".web.tsx", ".js", ".ts", ".tsx", "..."],
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Handle TypeScript files
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // Handle CSS files
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // HTML template
      favicon: "./public/favicon.ico", // Favicon (optional)
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"), // Serve static files
    },
    port: 3000, // Dev server port
    open: true, // Automatically open the browser
    hot: true, // Enable hot module replacement
  },
};

const newConfiguration = {
  ...configuration,
  plugins: [
    ...configuration.plugins,
    // 1. Make the wasm file available to the build system
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: "node_modules/canvaskit-wasm/bin/full/canvaskit.wasm",
    //     },
    //   ],
    // }),
    // 1. Ensure wasm file availability
    new (class CopySkiaPlugin {
      apply(compiler) {
        compiler.hooks.thisCompilation.tap("AddSkiaPlugin", (compilation) => {
          compilation.hooks.processAssets.tapPromise(
            {
              name: "copy-skia",
              stage:
                compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
            },
            async () => {
              const src = require.resolve(
                "canvaskit-wasm/bin/full/canvaskit.wasm"
              );
              if (!compilation.getAsset(src)) {
                compilation.emitAsset(
                  "/canvaskit.wasm",
                  new sources.RawSource(await fs.promises.readFile(src))
                );
              }
            }
          );
        });
      }
    })(),
    // 2. Polyfill fs and path module from node
    new NodePolyfillPlugin(),
    // new DefinePlugin({
    //   "react-native$": "react-native-web",
    // }),
  ],
  resolve: {
    ...configuration.resolve,
    alias: {
      ...configuration.alias,
      // "react-native": "react-native-web",
      // 3. Suppress reanimated module warning
      // This assumes Reanimated is installed, if not you can use false.
      "react-native-reanimated/package.json": require.resolve(
        "react-native-reanimated/package.json"
      ),
      "react-native-reanimated": require.resolve("react-native-reanimated"),
      // below is from the react native skia doc, it doesn't work
      // we just resolve it to an empty module
      // "react-native/Libraries/Image/AssetRegistry": false,
      "react-native/Libraries/Image/AssetRegistry": path.resolve(
        __dirname,
        "src/emptyModule.js"
      ), // Alias for AssetRegistry
    },
  },
};

module.exports = newConfiguration;

const fs = require("fs");
const path = require("path");
const { sources, DefinePlugin, ProvidePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const configuration = {
  mode: "development",
  entry: ["babel-polyfill", "./src/index.tsx"],
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "bundle.js", // Output bundle file
    clean: true, // Clean the output directory before build
  },
  resolve: {
    extensions: [".web.js", ".js", ".ts", ".tsx"],
    alias: {
      // below is from the react native skia doc, it doesn't work
      // we just resolve it to an empty module
      // "react-native/Libraries/Image/AssetRegistry": false,
      "react-native/Libraries/Image/AssetRegistry": path.resolve(
        __dirname,
        "src/emptyModule.js"
      ), // Alias for AssetRegistry
      "react-native": "react-native-web", // Alias react-native to react-native-web
    },
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/, // Handle TypeScript files
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/, // Handle JavaScript files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
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
    new HtmlWebpackPlugin({
      template: "./public/index.html", // HTML template
      favicon: "./public/favicon.ico", // Favicon (optional)
    }),
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    new NodePolyfillPlugin(),
    new ProvidePlugin({
      React: "react", // Automatically load React when it is used
    }),
    new DefinePlugin({
      "react-native$": "react-native-web",
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

module.exports = configuration;

// Install necessary packages before starting:
// npm install react react-dom typescript @types/react @types/react-dom webpack webpack-cli webpack-dev-server ts-loader html-webpack-plugin --save-dev

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx", // Entry point of your app
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "bundle.js", // Output bundle file
    clean: true, // Clean the output directory before build
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"], // Resolve these extensions
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

// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";

// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { LoadSkiaWeb } from "@shopify/react-native-skia/lib/module/web";
import "./index.css";

console.log("Initializing Skia for Web...");

// Load Skia environment for web
// the wasm loading is handled in webpack.config.js
LoadSkiaWeb()
  .then(async () => {
    console.log("Skia initialized successfully.");

    // Dynamically import your App component
    const App = (await import("./App")).default;

    // Bootstrap the ReactJS app
    const root = ReactDOM.createRoot(
      document.getElementById("root") as HTMLElement
    );
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  })
  .catch((err) => {
    console.error("CUSTOM: Failed to initialize Skia for Web:", err);
  });

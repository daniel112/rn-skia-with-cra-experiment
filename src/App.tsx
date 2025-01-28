import React from "react";
import "./App.css";

import { Canvas, Circle } from "@shopify/react-native-skia";
import Breathe from "./Breathe";
import { useSharedValue } from "react-native-reanimated";

const CircleDemo = () => {
  const r = 128;
  // const colorsIndex = useSharedValue(0);

  return (
    <Canvas style={{ flex: 1 }}>
      <Circle cx={r} cy={r} r={r} color="lightblue" />
    </Canvas>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reloasd.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <CircleDemo />
        {/* <Breathe /> */}
      </header>
    </div>
  );
}

export default App;

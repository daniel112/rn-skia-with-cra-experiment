import React from "react";
import "./App.css";

// DYO: ERROR RUNTIME HERE DUE TO ALIASING(?)
import { Canvas, Circle } from "@shopify/react-native-skia";

const CircleDemo = () => {
  const r = 128;
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
      </header>
    </div>
  );
}

export default App;

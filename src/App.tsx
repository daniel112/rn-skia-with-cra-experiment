import React from "react";
import "./App.css";
import "raf/polyfill";
// import Breathe from "./experiments/Breathe";
import { CircleDemo } from "./experiments/BasicCircle";
import { AnimatedImages } from "./experiments/AnimatedImages";

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
        {/* <AnimatedImages /> */}
        {/* <Breathe /> */}
      </header>
    </div>
  );
}

export default App;

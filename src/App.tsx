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
        <p>Load skia examples below:</p>
        <CircleDemo />
        {/* <AnimatedImages /> */}
        {/* <Breathe /> */}
      </header>
    </div>
  );
}

export default App;

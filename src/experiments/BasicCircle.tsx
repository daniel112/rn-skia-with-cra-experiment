import { Canvas, Circle } from "@shopify/react-native-skia";
import React from "react";

export const CircleDemo = () => {
  const r = 128;
  // const colorsIndex = useSharedValue(0);

  return (
    <Canvas style={{ flex: 1 }}>
      <Circle cx={r} cy={r} r={r} color="lightblue" />
    </Canvas>
  );
};

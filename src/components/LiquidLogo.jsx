import { LiquidMetal } from "@paper-design/shaders-react";

// The real shader behind github.com/paper-design/liquid-logo (its npm-published
// engine, @paper-design/shaders-react), used here as an animated liquid-metal
// mark instead of a static logo box.
export default function LiquidLogo({ size = 30 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        flex: "none",
        borderRadius: 6,
        overflow: "hidden",
        border: "1px solid #333E4D",
      }}
    >
      <LiquidMetal
        style={{ width: "100%", height: "100%", display: "block" }}
        shape="metaballs"
        colorBack="#12161d"
        colorTint="#5EEAD4"
        repetition={3}
        softness={0.6}
        shiftRed={0.1}
        shiftBlue={0.16}
        distortion={0.15}
        contour={0.65}
        speed={0.55}
      />
    </div>
  );
}

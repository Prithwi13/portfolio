import { ShaderGradient, ShaderGradientCanvas } from "shadergradient";

// Real "shadergradient" (github.com/ruucm/shadergradient) mesh gradient,
// used as a soft, slow ambient backdrop behind the whole page.
export default function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        opacity: 0.5,
        pointerEvents: "none",
        filter: "saturate(1.05)",
      }}
    >
      <ShaderGradientCanvas style={{ position: "absolute", inset: 0 }} pixelDensity={1} fov={45}>
        <ShaderGradient
          type="waterPlane"
          animate="on"
          uSpeed={0.12}
          uStrength={2.2}
          uDensity={1.1}
          uFrequency={5.2}
          uAmplitude={1}
          positionY={0}
          color1="#5EEAD4"
          color2="#7C6CF0"
          color3="#0B0E13"
          reflection={0.05}
          cAzimuthAngle={180}
          cPolarAngle={85}
          cDistance={3.8}
          cameraZoom={1}
          lightType="env"
          brightness={0.85}
          envPreset="city"
          grain="off"
          toggleAxis={false}
          zoomOut={false}
        />
      </ShaderGradientCanvas>
    </div>
  );
}

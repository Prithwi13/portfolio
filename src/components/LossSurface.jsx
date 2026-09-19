import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Real react-three-fiber scene, used as the site's full-bleed ambient
// background rather than a boxed chart: an undulating terrain whose height
// and color are driven by a hand-written value-noise fbm, evaluated
// per-vertex on the CPU each frame (kept to a modest grid so this stays
// cheap) rather than in a custom GLSL shader, for robust cross-device
// rendering. The camera drifts slowly and autonomously so it reads as
// ambient motion behind the page, not an interactive plot.

function hash2(x, y) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}
function lerp2(a, b, t) {
  return a + (b - a) * t;
}
function noise2(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  return lerp2(
    lerp2(hash2(xi, yi), hash2(xi + 1, yi), u),
    lerp2(hash2(xi, yi + 1), hash2(xi + 1, yi + 1), u),
    v
  );
}
function fbm2(x, y, octaves = 4) {
  let v = 0, a = 0.5;
  for (let i = 0; i < octaves; i++) {
    v += a * (noise2(x, y) * 2 - 1);
    x *= 2; y *= 2; a *= 0.5;
  }
  return v;
}

const SEG = 72;
const SIZE = 30;
const AMP = 2.2;

function Terrain() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG);
    geo.rotateX(-Math.PI / 2);
    const count = geo.attributes.position.count;
    geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    return geo;
  }, []);

  const palette = useMemo(
    () => ({
      dark: new THREE.Color("#0b0e13"),
      a: new THREE.Color("#5EEAD4"),
      b: new THREE.Color("#8B7CF6"),
      tmp: new THREE.Color(),
    }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.045;
    const pos = geometry.attributes.position;
    const col = geometry.attributes.color;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const wx = x * 0.1 + t;
      const wz = z * 0.1 - t * 0.7;
      const warpX = fbm2(wx, wz, 3);
      const warpZ = fbm2(wx + 4.2, wz - 4.2, 3);
      const h = fbm2(wx + warpX * 0.7, wz + warpZ * 0.7, 4);
      pos.setY(i, h * AMP);

      const n = h * 0.5 + 0.5;
      palette.tmp.copy(palette.dark).lerp(palette.a, THREE.MathUtils.smoothstep(n, 0.2, 0.6));
      palette.tmp.lerp(palette.b, THREE.MathUtils.smoothstep(n, 0.55, 0.95));
      col.setXYZ(i, palette.tmp.r, palette.tmp.g, palette.tmp.b);
    }
    pos.needsUpdate = true;
    col.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <mesh geometry={geometry} position={[0, -2.2, 0]}>
      <meshBasicMaterial vertexColors />
    </mesh>
  );
}

function Rig() {
  useFrame(({ camera, clock }) => {
    const t = clock.elapsedTime * 0.045;
    camera.position.x = Math.sin(t) * 2.2;
    camera.position.z = 8.6 + Math.cos(t * 0.6) * 1.1;
    camera.lookAt(0, -2.6, 0);
  });
  return null;
}

export default function LossSurface({ reduceMotion = false }) {
  return (
    <Canvas
      camera={{ position: [0, 7.6, 8.6], fov: 68 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power", toneMapping: THREE.NoToneMapping }}
      dpr={[1, 1.6]}
      frameloop={reduceMotion ? "demand" : "always"}
      style={{ position: "absolute", inset: 0 }}
    >
      <Terrain />
      <Rig />
    </Canvas>
  );
}

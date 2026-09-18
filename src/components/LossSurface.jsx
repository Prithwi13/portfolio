import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Real react-three-fiber scene: a "loss landscape" rendered as an actual
// displaced 3D surface (not a flat shader trick), with a small marker that
// wanders across it like an optimizer descending toward a minimum. Height and
// color are driven by a hand-written value-noise fbm, evaluated per-vertex on
// the CPU each frame (kept to a modest grid size so this stays cheap) rather
// than in a custom GLSL shader, for robust cross-device rendering.

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

const SEG = 56;
const SIZE = 4.6;
const AMP = 0.6;

function Terrain({ mouseRef }) {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG);
    geo.rotateX(-Math.PI / 2);
    const count = geo.attributes.position.count;
    geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    return geo;
  }, []);

  const palette = useMemo(
    () => ({
      a: new THREE.Color("#5EEAD4"),
      b: new THREE.Color("#FB7185"),
      c: new THREE.Color("#7C6CF0"),
      tmp: new THREE.Color(),
    }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.14;
    const pos = geometry.attributes.position;
    const col = geometry.attributes.color;
    const mx = mouseRef.current.x * 0.4;
    const mz = mouseRef.current.y * 0.4;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const wx = x * 0.5 + mx + t;
      const wz = z * 0.5 + mz - t * 0.6;
      const warpX = fbm2(wx, wz, 3);
      const warpZ = fbm2(wx + 4.2, wz - 4.2, 3);
      const h = fbm2(wx + warpX * 0.8, wz + warpZ * 0.8, 4);
      pos.setY(i, h * AMP);

      const n = h * 0.5 + 0.5;
      palette.tmp.copy(palette.a).lerp(palette.b, THREE.MathUtils.smoothstep(n, 0.1, 0.85));
      palette.tmp.lerp(palette.c, THREE.MathUtils.smoothstep(n, 0.6, 1.0) * 0.5);
      col.setXYZ(i, palette.tmp.r, palette.tmp.g, palette.tmp.b);
    }
    pos.needsUpdate = true;
    col.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial vertexColors side={THREE.DoubleSide} />
    </mesh>
  );
}

function Marker({ mouseRef }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const mx = Math.sin(t * 0.17) * 1.5;
    const mz = Math.cos(t * 0.13) * 1.5;
    const mh = fbm2(mx * 0.5 + mouseRef.current.x * 0.4 + t * 0.126, mz * 0.5 + t * 0.045) * AMP;
    if (ref.current) ref.current.position.set(mx, mh + 0.06, mz);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshBasicMaterial color="#EDEAE2" />
    </mesh>
  );
}

function Rig({ mouseRef, targetRef }) {
  useFrame(({ camera }) => {
    mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.05;
    camera.position.x = Math.sin(mouseRef.current.x * 0.15) * 0.3;
    camera.lookAt(0, 0.15, 0);
  });
  return null;
}

export default function LossSurface({ reduceMotion = false }) {
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  return (
    <Canvas
      camera={{ position: [0, 2.05, 3.5], fov: 40 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power", toneMapping: THREE.NoToneMapping }}
      dpr={[1, 2]}
      frameloop={reduceMotion ? "demand" : "always"}
      style={{ position: "absolute", inset: 0 }}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        targetRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        targetRef.current.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
      }}
    >
      <Terrain mouseRef={mouseRef} />
      <Marker mouseRef={mouseRef} />
      <Rig mouseRef={mouseRef} targetRef={targetRef} />
    </Canvas>
  );
}

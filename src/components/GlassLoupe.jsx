import { useEffect, useRef } from "react";
import LiquidGlass from "liquid-glass-js";

// Real liquid-glass-js (github.com/dashersw/liquid-glass-js) draggable lens —
// a genuine refractive "inspector's loupe" you can drag across the loss
// surface / blueprint background, on-theme for an engineering-drawing site.
export default function GlassLoupe({ targetRef, size = 148 }) {
  const hostRef = useRef(null);
  const glassRef = useRef(null);

  useEffect(() => {
    if (!targetRef.current || !hostRef.current) return undefined;

    // liquid-glass-js positions the lens with `position: fixed`, so x/y are
    // viewport (screen) coordinates -- compute them from the target panel's
    // own on-screen position so the loupe starts centered over it.
    const rect = targetRef.current.getBoundingClientRect();
    const x = rect.left + rect.width * 0.42 - size / 2;
    const y = rect.top + 70;

    const glass = new LiquidGlass({
      background: targetRef.current,
      width: size,
      height: size,
      radius: size / 2,
      scale: 52,
      depth: 46,
      curvature: 2.3,
      convexity: 1,
      chroma: 0.16,
      blur: 0,
      glow: 0.24,
      edge: 0.78,
      specAngle: 135,
      draggable: true,
      x,
      y,
      zIndex: 30,
    });
    glassRef.current = glass;

    // The background (a live WebGL/shader canvas) animates, but liquid-glass-js
    // clones it as a static snapshot by default -- refresh periodically so the
    // lens shows a semi-live refraction instead of a frozen frame.
    const iv = setInterval(() => {
      try {
        glass.refresh();
      } catch {
        // ignore transient refresh errors if the background briefly resizes
      }
    }, 140);

    return () => {
      clearInterval(iv);
      glass.destroy();
    };
  }, [targetRef, size]);

  return <div ref={hostRef} aria-hidden="true" />;
}

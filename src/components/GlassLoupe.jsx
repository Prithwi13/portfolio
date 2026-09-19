import { useEffect, useRef } from "react";
import LiquidGlass from "liquid-glass-js";

// Real liquid-glass-js (github.com/dashersw/liquid-glass-js) draggable lens.
// It clones its `background` target's DOM/CSS content and renders a warped
// copy inside the lens, positioned independently via x/y -- so this sits
// beside the hero copy, over open background, rather than on top of the
// live heading, keeping the actual text perfectly readable while still
// showing a real optical refraction of it.
export default function GlassLoupe({ targetRef, size = 118 }) {
  const hostRef = useRef(null);
  const glassRef = useRef(null);

  useEffect(() => {
    if (!targetRef.current || !hostRef.current) return undefined;
    // Keep small screens free of any overlay competing with the text.
    if (window.innerWidth < 900) return undefined;

    const rect = targetRef.current.getBoundingClientRect();
    const x = Math.min(rect.right + 64, window.innerWidth - size - 32);
    const y = rect.top + 12;

    const glass = new LiquidGlass({
      background: targetRef.current,
      width: size,
      height: size,
      radius: size / 2,
      scale: 20,
      depth: 16,
      curvature: 1.3,
      convexity: 0.85,
      chroma: 0.05,
      blur: 0,
      glow: 0.16,
      edge: 0.5,
      specAngle: 135,
      draggable: true,
      x,
      y,
      zIndex: 30,
    });
    glassRef.current = glass;

    // The target is live text, not animated pixels, so a slow refresh is
    // plenty to keep the clone in sync without extra work.
    const iv = setInterval(() => {
      try {
        glass.refresh();
      } catch {
        // ignore transient refresh errors if the background briefly resizes
      }
    }, 400);

    return () => {
      clearInterval(iv);
      glass.destroy();
    };
  }, [targetRef, size]);

  return <div ref={hostRef} aria-hidden="true" />;
}

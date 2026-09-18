# Prithwiraj Chatterjee — Portfolio

Personal portfolio site: a React + Vite build styled as an "engineering drawing at
night" — technical-drawing conventions (sheet numbers, dimension lines, a
title-block contact section) fused with a real-time 3D "loss landscape" as the
recurring visual metaphor for a mechanical-engineer-turned-data-scientist career.

## Real libraries used for the effects

- [`@react-three/fiber`](https://github.com/pmndrs/react-three-fiber) + `three` —
  the hero's animated 3D loss-landscape surface.
- [`shadergradient`](https://github.com/ruucm/shadergradient) — the ambient
  full-page mesh-gradient backdrop.
- [`liquid-glass-js`](https://github.com/dashersw/liquid-glass-js) — the
  draggable refractive lens in the hero (real optical displacement, not a CSS
  blur fake).
- [`@paper-design/shaders-react`](https://www.npmjs.com/package/@paper-design/shaders-react)
  (`LiquidMetal`) — the animated liquid-metal logo mark in the nav, the same
  shader engine behind [paper-design/liquid-logo](https://github.com/paper-design/liquid-logo).

## Stack

React 19 · Vite · plain CSS (no framework).

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Outputs a static site to `dist/` — no server-side code, deployable as-is
(this repo is set up to deploy on Vercel with zero configuration).

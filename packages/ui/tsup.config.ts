import { defineConfig } from 'tsup';

// Builds dist/ (ESM + types) for design-sync and non-Next consumers.
// The Next site consumes src/ directly via transpilePackages, which preserves
// 'use client' boundaries natively — so directive stripping in dist is fine
// (Claude Design renders components in a plain-React runtime, no RSC).
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  clean: true,
  treeshake: true,
  target: 'es2020',
});

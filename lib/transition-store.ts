/**
 * Tiny shared signal for the Services→Projects "big bang": the Services scroll
 * handler writes `collapse` (0..1) and the V13 3D canvas reads it in its frame
 * loop, so the logo collapses by scaling the 3D group (clean, centred) instead of
 * a CSS transform on the canvas (which jitters the WebGL output while scrolling).
 */
export const transition = { collapse: 0 }

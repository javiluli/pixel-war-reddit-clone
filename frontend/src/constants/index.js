export { default as COLORS } from './colors'

// Número máximo de píxeles en una fila o columna del canvas
export const PIXELS_PER_SIDE = 16

// Tamaño máximo del canvas (en píxeles)
export const MAX_CANVAS_SIZE = 800

// Tamaño de cada píxel en el canvas (en píxeles)
export const PIXEL_SIZE = MAX_CANVAS_SIZE / PIXELS_PER_SIDE

// Número máximo total de píxeles en el canvas
export const MAX_TOTAL_PIXELS = PIXELS_PER_SIDE * PIXELS_PER_SIDE

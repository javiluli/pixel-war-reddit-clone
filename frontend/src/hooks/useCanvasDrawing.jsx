import { useCallback, useEffect } from 'react'

/**
 * Hook para manejar el dibujo de los píxeles en el canvas.
 *
 * @param {React.RefObject<HTMLCanvasElement>} canvasRef - Referencia del canvas donde se dibujarán los píxeles.
 * @param {string[]} pixels - Array de colores que representan los píxeles en el canvas.
 * @param {number} PIXEL_SIZE - Tamaño de cada píxel en el canvas.
 * @param {number} PIXELS_PER_SIDE - Número de píxeles por lado del canvas.
 *
 * @example
 * useCanvasDrawing(canvasRef, pixels, PIXEL_SIZE, PIXELS_PER_SIDE);
 */

const useCanvasDrawing = (canvasRef, pixels, PIXEL_SIZE, PIXELS_PER_SIDE) => {
  const drawPixels = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const canvasWidth = canvas.width
    const canvasHeight = canvas.height

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    pixels.forEach((color, index) => {
      const x = index % PIXELS_PER_SIDE
      const y = Math.floor(index / PIXELS_PER_SIDE)

      ctx.fillStyle = color
      ctx.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE)
    })
  }, [canvasRef, pixels, PIXEL_SIZE, PIXELS_PER_SIDE])

  useEffect(() => {
    drawPixels()
  }, [drawPixels])
}

export default useCanvasDrawing

import { useCallback, useState } from 'react'

/**
 * Hook para calcular y almacenar la posición en el canvas donde el usuario hizo clic.
 *
 * @param {number} PIXEL_SIZE - Tamaño de cada píxel en el canvas.
 * @returns {{ position: { x: number, y: number }, calculateCanvasPosition: (event: MouseEvent, canvas: HTMLCanvasElement) => void }} -
 *          Retorna la posición actual del clic y la función para calcularla.
 *
 * @example
 * const { position, calculateCanvasPosition } = useCanvasPosition(PIXEL_SIZE);
 * const handleClick = (event) => {
 *   calculateCanvasPosition(event, canvas);
 * };
 */
const useCanvasPosition = (PIXEL_SIZE) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const calculateCanvasPosition = useCallback(
    (event, canvas) => {
      const rect = canvas.getBoundingClientRect()
      const x = Math.floor((event.clientX - rect.left) / PIXEL_SIZE)
      const y = Math.floor((event.clientY - rect.top) / PIXEL_SIZE)
      setPosition({ x, y })
    },
    [PIXEL_SIZE],
  )

  return { position, calculateCanvasPosition }
}
export default useCanvasPosition

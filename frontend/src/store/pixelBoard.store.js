import { createJSONStorage, persist } from 'zustand/middleware'

import { MAX_TOTAL_PIXELS } from '@@constants'
import { create } from 'zustand'

const INIT_COLOR_CANVAS = 'hsl(0, 100%, 100%)'

export const usePixelBoardStore = create(
  persist(
    (set) => {
      const setCanvasPixelList = async (pixeles) => {
        set({ canvasPixelList: pixeles })
      }

      const setClickPositionOnCanvas = async (position) => {
        set({ clickPositionOnCanvas: position })
      }

      const setSelectedColor = async (color) => {
        set({ selectedColor: color })
      }

      return {
        /* Generar los pixeles del canvas, todos en blanco  */
        canvasPixelList: Array(MAX_TOTAL_PIXELS).fill(INIT_COLOR_CANVAS),
        setCanvasPixelList: (pixeles) => setCanvasPixelList(pixeles),

        /*   */
        clickPositionOnCanvas: { x: 0, y: 0 },
        setClickPositionOnCanvas: (position) => setClickPositionOnCanvas(position),

        /*   */
        selectedColor: INIT_COLOR_CANVAS,
        setSelectedColor: (color) => setSelectedColor(color),
      }
    },
    {
      name: 'zstore.pixelBoard',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

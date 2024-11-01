import '../../styles/pixel-box-selected.css'

import { Box } from '@mui/material'
import { MAX_CANVAS_SIZE, PIXELS_PER_SIDE, PIXEL_SIZE } from '../../constants'
import { useCallback, useEffect, useRef } from 'react'

import { SelectedPixelMarker } from './SelectedPixelMarker'
import { getAllPixelFromWar } from '../../services/firebasePixels'
import useCanvasDrawing from '@@hooks/useCanvasDrawing'
import useCanvasPosition from '@@hooks/useCanvasPosition'
import { usePixelBoardStore, useSocketStore } from '@@zstores'

function InteractivePixelBoard() {
  const canvasRef = useRef(null)

  const canvasPixelList = usePixelBoardStore((state) => state.canvasPixelList)
  const setCanvasPixelList = usePixelBoardStore((state) => state.setCanvasPixelList)
  const setClickPositionOnCanvas = usePixelBoardStore((state) => state.setClickPositionOnCanvas)

  const onEvent = useSocketStore((state) => state.onEvent)
  const offEvent = useSocketStore((state) => state.offEvent)

  // Hook para manejar la posición de clic en el canvas
  const { position, calculateCanvasPosition } = useCanvasPosition(PIXEL_SIZE)

  // Hook para dibujar píxeles en el canvas
  useCanvasDrawing(canvasRef, canvasPixelList, PIXEL_SIZE, PIXELS_PER_SIDE)

  // Efecto para inicializar el canvas con los datos del servidor
  useEffect(() => {
    const initializeCanvas = async () => {
      const data = await getAllPixelFromWar('war_001')

      if (data) {
        const updatedCanvasPixelList = canvasPixelList.map((pixel, index) => {
          return data.has(index) ? data.get(index).colorHEX : pixel
        })
        setCanvasPixelList(updatedCanvasPixelList)
      }
    }
    initializeCanvas()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // Suscribirse a un evento específico
    const handleData = (data) => {
      const { canvasPositionIndex, colorHEX } = data.message

      const newPixels = [...canvasPixelList]
      newPixels[canvasPositionIndex] = colorHEX

      setCanvasPixelList(newPixels)
    }

    onEvent(handleData)

    // Cancelar suscripción cuando el componente se desmonte
    return () => {
      offEvent(handleData)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Efecto para actualizar la posición del clic en el store global
  useEffect(() => {
    setClickPositionOnCanvas(position)
  }, [position, setClickPositionOnCanvas])

  // Manejar el clic en el canvas
  const handleCanvasClick = useCallback(
    (event) => {
      const canvas = canvasRef.current
      calculateCanvasPosition(event, canvas)
    },
    [calculateCanvasPosition, canvasRef],
  )

  return (
    <Box sx={{ position: 'relative', width: MAX_CANVAS_SIZE, height: MAX_CANVAS_SIZE }}>
      <canvas ref={canvasRef} width={MAX_CANVAS_SIZE} height={MAX_CANVAS_SIZE} onClick={handleCanvasClick} />

      <SelectedPixelMarker position={position} />
    </Box>
  )
}

export default InteractivePixelBoard

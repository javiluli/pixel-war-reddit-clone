import { Box, IconButton, Stack, Tab, Tabs } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { usePixelBoardStore, useUsersStore, useSocketStore } from '@@zstores'

import { COLORS } from '@@constants'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import { PIXELS_PER_SIDE } from '@@constants'
import PropTypes from 'prop-types'
import { saveColoredPixel as savePixel } from '../../services/firebasePixels'

function ColorSelectionPanel() {
  const authUser = useUsersStore((state) => state.authUser)
  const isAuthenticated = useUsersStore((state) => state.isAuthenticated)

  const canvasPixelList = usePixelBoardStore((state) => state.canvasPixelList)
  const setCanvasPixelList = usePixelBoardStore((state) => state.setCanvasPixelList)
  const clickPositionOnCanvas = usePixelBoardStore((state) => state.clickPositionOnCanvas)

  const emitEvent = useSocketStore((state) => state.emitEvent)

  const [selectedColor, setSelectedColor] = useState(null)

  const handleChange = useCallback(
    (_, newValue) => {
      setSelectedColor(newValue)
    },
    [setSelectedColor],
  )

  const handleClick = useCallback(() => {
    if (clickPositionOnCanvas) {
      const { x, y } = clickPositionOnCanvas

      const index = y * PIXELS_PER_SIDE + x

      const newPixels = [...canvasPixelList]
      newPixels[index] = selectedColor

      setCanvasPixelList(newPixels)

      const pixelData = {
        canvasPositionIndex: index,
        canvasPositionX: x,
        canvasPositionY: y,
        colorHEX: selectedColor,
      }

      savePixel(pixelData, authUser)
      setSelectedColor(null)

      // Emitir un evento como ejemplo
      emitEvent({ message: pixelData })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const initializeColor = async () => {
      setSelectedColor(selectedColor)
    }

    initializeColor()
  }, [selectedColor])

  if (!isAuthenticated) {
    return null
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 120,
        bgcolor: 'white',
        boxShadow:
          'rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px -1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px -3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px -6px 6px -3px, rgba(14, 63, 126, 0.04) 0px -12px 12px -6px, rgba(14, 63, 126, 0.04) 0px -24px 24px -12px;',
        // zIndex: 100,
      }}
    >
      {selectedColor && (
        <Stack sx={{ position: 'absolute', top: -20, left: 0, width: '100%' }}>
          <Stack alignItems="center">
            <IconButton
              aria-label="check"
              onClick={handleClick}
              sx={{ bgcolor: 'white', borderRadius: 2, boxShadow: '0 0 5px 0 hsla(0 ,0% ,30%, 0.4)' }}
            >
              <CheckRoundedIcon />
            </IconButton>
          </Stack>
        </Stack>
      )}

      <Stack justifyContent="center" sx={{ height: '100%' }}>
        <Box sx={{ bgcolor: 'background.paper' }}>
          <Tabs
            value={selectedColor}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            sx={{ '& .MuiTabs-indicator': { display: 'none' } }}
          >
            {Object.entries(COLORS).map(([key, value]) => (
              <Tab
                key={key}
                value={value}
                sx={{
                  mx: 1,
                  my: 1,
                  height: 50,
                  bgcolor: value,
                  border: '1px solid hsla(0 ,0% ,0%, 0.3)',
                  borderRadius: 1.5,
                  transform: value === selectedColor ? 'scale(1.15)' : '',
                  transition: 'all 100ms ease',
                  '.MuiTouchRipple-child': {
                    backgroundColor: 'hsla(0, 100%, 100%, 0.8)',
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>
      </Stack>
    </Box>
  )
}

export default ColorSelectionPanel

// Setting default values for the props of CCCheckboxRoot
// ColorSelectionPanel.defaultProps = {
//   pixelid: '',
//   width: PIXEL_SIZE,
//   height: PIXEL_SIZE,
//   color: 'hsl(0, 0%, 100%)',
//   positionX: 0,
//   positionY: 0,
// }

// Typechecking props for the CCCheckboxRoot
ColorSelectionPanel.propTypes = {
  selectedPixel: PropTypes.node,
}

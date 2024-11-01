import { Box } from '@mui/material'
import { PIXEL_SIZE } from '@@constants'
import PropTypes from 'prop-types'

const PIXEL_BORDER_SIZE = 4
const PIXEL_BORDER_LENGTH = '40%'
const ANIMATION_DURATION = '1s'

const styles = {
  display: 'block',
  position: 'absolute',
  width: PIXEL_SIZE,
  height: PIXEL_SIZE,
  backgroundColor: 'transparent',
  transition: 'top 200ms ease, left 250ms ease',
  zIndex: 1000,
}

const borderStyles = {
  position: 'absolute',
  backgroundColor: 'hsl(0, 0%, 20%)',
}

const borders = [
  { top: -2, left: -2, width: PIXEL_BORDER_SIZE, height: PIXEL_BORDER_LENGTH, borderRadius: '0 0 2px 2px' }, // Borde vertical superior izquierdo
  { top: -2, right: -2, width: PIXEL_BORDER_SIZE, height: PIXEL_BORDER_LENGTH, borderRadius: '0 0 2px 2px' }, // Borde vertical superior derecho

  { bottom: -2, right: -2, width: PIXEL_BORDER_SIZE, height: PIXEL_BORDER_LENGTH, borderRadius: '2px 2px 0 0' }, // Borde vertical inferior derecho
  { bottom: -2, left: -2, width: PIXEL_BORDER_SIZE, height: PIXEL_BORDER_LENGTH, borderRadius: '2px 2px 0 0' }, // Borde vertical inferior izquierdo

  { top: -2, left: -2, width: PIXEL_BORDER_LENGTH, height: PIXEL_BORDER_SIZE, borderRadius: '0 2px 2px 0' }, // Borde horizontal superior izquierdo
  { top: -2, right: -2, width: PIXEL_BORDER_LENGTH, height: PIXEL_BORDER_SIZE, borderRadius: '2px 0 0 2px' }, // Borde horizontal superior derecho

  { bottom: -2, right: -2, width: PIXEL_BORDER_LENGTH, height: PIXEL_BORDER_SIZE, borderRadius: '2px 0 0 2px' }, // Borde horizontal inferior derecho
  { bottom: -2, left: -2, width: PIXEL_BORDER_LENGTH, height: PIXEL_BORDER_SIZE, borderRadius: '0 2px 2px 0' }, // Borde horizontal inferior izquierdo
]

const borderAnimation = {
  '0%, 100%': {
    transform: 'scale(1.1)',
  },
  '50%': {
    transform: 'scale(0.95)',
  },
}

function SelectedPixelMarker({ position }) {
  const { x = 0, y = 0 } = position ?? {}

  return (
    <Box sx={{ ...styles, top: `${PIXEL_SIZE * y + 1}px`, left: `${PIXEL_SIZE * x + 1}px` }}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          animation: `${ANIMATION_DURATION} ease-in-out infinite borderAnimation`,
          '@keyframes borderAnimation': borderAnimation,
        }}
      >
        {borders.map((borderStyle, index) => (
          <Box component="span" key={index} sx={{ ...borderStyles, ...borderStyle }} />
        ))}
      </Box>
    </Box>
  )
}

SelectedPixelMarker.defaultProps = {
  position: { x: 0, y: 0 },
}

SelectedPixelMarker.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
}

export default SelectedPixelMarker

import { Box, Stack } from '@mui/material'

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const gridPixels = [
  { row: 1, column: 1 },
  { row: 2, column: 1 },
  { row: 3, column: 1 },
  { row: 4, column: 1 },
  { row: 1, column: 2 },
  { row: 2, column: 2 },
  { row: 3, column: 2 },
  { row: 4, column: 2 },

  { row: 4, column: 3 },

  { row: 1, column: 4 },
  { row: 2, column: 4 },
  { row: 3, column: 4 },
  { row: 4, column: 4 },
  { row: 1, column: 5 },
  { row: 2, column: 5 },
  { row: 3, column: 5 },
  { row: 4, column: 5 },

  { row: 5, column: 4 },
  { row: 6, column: 4 },

  { row: 5, column: 5 },
  { row: 6, column: 5 },

  ///////////////
  { row: 1, column: 8 },
  { row: 1, column: 9 },
  { row: 1, column: 10 },

  { row: 2, column: 7 },
  { row: 2, column: 8 },
  { row: 2, column: 9 },
  { row: 2, column: 10 },
  { row: 2, column: 11 },

  { row: 3, column: 7 },
  { row: 3, column: 8 },
  { row: 4, column: 7 },
  { row: 4, column: 8 },

  { row: 3, column: 10 },
  { row: 3, column: 11 },
  { row: 4, column: 10 },
  { row: 4, column: 11 },

  { row: 6, column: 8 },
  { row: 6, column: 9 },
  { row: 6, column: 10 },

  { row: 5, column: 7 },
  { row: 5, column: 8 },
  { row: 5, column: 9 },
  { row: 5, column: 10 },
  { row: 5, column: 11 },

  ///////////////
  { row: 1, column: 13 },
  { row: 2, column: 13 },
  { row: 3, column: 13 },
  { row: 4, column: 13 },
  { row: 1, column: 14 },
  { row: 2, column: 14 },
  { row: 3, column: 14 },
  { row: 4, column: 14 },

  { row: 4, column: 15 },

  { row: 1, column: 16 },
  { row: 2, column: 16 },
  { row: 3, column: 16 },
  { row: 4, column: 16 },
  { row: 1, column: 17 },
  { row: 2, column: 17 },
  { row: 3, column: 17 },
  { row: 4, column: 17 },

  { row: 5, column: 16 },
  { row: 6, column: 16 },

  { row: 5, column: 17 },
  { row: 6, column: 17 },
]

const Error404Page = () => {
  return (
    <Stack justifyContent="center" sx={{ minHeight: '100vh' }}>
      <Box sx={{ width: '100%', px: 8, py: 12 }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 408 144"
          preserveAspectRatio="xMidYMid meet"
          style={{ width: '100%', height: 'auto', backgroundColor: 'white', display: 'block', margin: '0 auto' }}
        >
          {gridPixels.map((item, index) => (
            <rect
              key={index}
              x={(item.column - 1) * 24}
              y={(item.row - 1) * 24}
              width={24}
              height={24}
              stroke="none"
              style={{
                fill: `hsl(0, 0%, 96%)`,
              }}
              onMouseEnter={(e) => {
                e.target.style.fill = `hsl(${getRandomNumber(0, 360)}, 100%, 65%)`
                e.target.style.transition = 'fill 0ms ease'
              }}
              onMouseLeave={(e) => {
                e.target.style.fill = 'hsl(0, 0%, 96%)'
                e.target.style.transition = 'fill 8000ms ease'
              }}
            />
          ))}
        </svg>
      </Box>
    </Stack>
  )
}

export default Error404Page

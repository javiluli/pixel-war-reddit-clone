export const convertMapToArray = (mapObj) => Array.from(mapObj, ([key, value]) => ({ key, ...value }))

function createPixel(row, col, sizePixel) {
  return {
    _id: `${row}:${col}`,
    positionX: sizePixel * row,
    positionY: sizePixel * col,
    color: 'hsl(0, 0%, 100%)',
  }
}

export function createPixelBoardMain(sizeBoard, sizePixel) {
  const board = new Map()

  for (let row = 0; row < sizeBoard; row++) {
    const rowMap = new Map()
    for (let col = 0; col < sizeBoard; col++) {
      rowMap.set(`__${row}__${col}`, createPixel(row, col, sizePixel))
    }
    board.set(row, rowMap)
  }

  return board
}

export const generateUniqueId = (input) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let hash = 0

  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash)
  }

  let uniqueId = ''
  for (let i = 0; i < 6; i++) {
    uniqueId += characters.charAt(Math.abs((hash >> (i * 5)) % characters.length))
  }

  return uniqueId
}

// Codificar la cadena a base64
export const encodeToHex = (input) => {
  return Array.from(new TextEncoder().encode(input))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

// Decodificar la cadena base64 a su representación original
export const decodeFromHex = (hexString) => {
  const bytes = new Uint8Array(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)))
  return new TextDecoder().decode(bytes)
}

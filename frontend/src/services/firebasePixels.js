import { addDoc, collection, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore'

import { db } from '../firebase/firebaseConfig'

// Guardar píxeles coloreados
export const saveColoredPixel = async (pixelData, authUser) => {
  try {
    await addDoc(collection(db, 'war_001'), {
      ...pixelData,
      timestamp: serverTimestamp(),
      userId: authUser.user.uid,
    })
  } catch (error) {
    console.error('Error al guardar el píxel:', error)
    throw error
  }
}

// Obtener todos los píxeles de una guerra
export const getAllPixelFromWar = async (warId) => {
  const map = new Map()
  try {
    const q = query(collection(db, warId), orderBy('timestamp', 'desc'))
    const result = await getDocs(q)

    result.forEach((doc) => {
      const data = doc.data()
      if (!map.has(data.canvasPositionIndex)) {
        map.set(data.canvasPositionIndex, { ...data })
      }
    })

    return map
  } catch (error) {
    console.error('Error al obtener los píxeles:', error)
    throw error
  }
}

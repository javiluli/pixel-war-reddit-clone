import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const useSocketConnection = (url) => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const socketInstance = io(url)
    setSocket(socketInstance)

    socketInstance.on('connect', () => {
      console.log('Conectado al servidor')
    })

    return () => {
      socketInstance.disconnect()
      console.log('Desconectado del servidor')
    }
  }, [url])

  return socket
}

export default useSocketConnection

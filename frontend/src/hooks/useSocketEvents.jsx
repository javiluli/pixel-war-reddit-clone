import { useEffect } from 'react'

const useSocketEvents = (socket, eventName, callback) => {
  useEffect(() => {
    if (!socket) return

    socket.on(eventName, callback)

    return () => {
      socket.off(eventName, callback)
    }
  }, [socket, eventName, callback])
}

export default useSocketEvents

import create from 'zustand'
import { io } from 'socket.io-client'

export const useSocketStore = create((set, get) => {
  let socket = null

  // Función auxiliar para conectar el socket
  const initializeSocket = (url) => {
    if (!url) {
      console.error('URL de conexión no proporcionada')
      return
    }

    socket = io(url, {
      reconnectionAttempts: 5, // Intentos de reconexión automáticos
      reconnectionDelay: 2000, // Intervalo de reconexión
    })

    // Configuración de eventos de conexión y reconexión
    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)
    socket.on('connect_error', handleError)

    set({ socket })
  }

  // Función auxiliar para manejar la conexión
  const handleConnect = () => {
    console.log('Conectado al servidor')
    set({ isConnected: true })
  }

  // Función auxiliar para manejar la desconexión
  const handleDisconnect = () => {
    console.log('Desconectado del servidor')
    set({ isConnected: false })
  }

  // Función auxiliar para manejar errores de conexión
  const handleError = (error) => {
    console.error('Error de conexión:', error.message)
  }

  return {
    socket: null,
    isConnected: false,

    // Conectar al servidor
    connectToServer: (url) => {
      if (get().socket) {
        console.warn('Socket ya conectado')
        return
      }
      initializeSocket(url)
    },

    // Desconectar manualmente
    disconnectFromServer: () => {
      const { socket } = get()
      if (socket) {
        socket.disconnect()
        socket.off('connect', handleConnect)
        socket.off('disconnect', handleDisconnect)
        socket.off('connect_error', handleError)
        set({ socket: null, isConnected: false })
        console.log('Socket desconectado manualmente')
      }
    },

    // Emitir eventos al servidor
    emitEvent: (data) => {
      const { socket } = get()

      if (!socket) {
        console.error('No hay conexión de socket disponible para emitir')
        return
      }
      socket.emit('hub', data)
    },

    // Suscribirse a eventos
    onEvent: (callback) => {
      const { socket } = get()

      if (!socket) {
        console.error('No hay conexión de socket para suscribirse a eventos')
        return
      }
      socket.on('hub', callback)
    },

    // Cancelar la suscripción de eventos
    offEvent: (callback) => {
      const { socket } = get()
      if (!socket) {
        console.error('No hay conexión de socket para cancelar suscripción')
        return
      }
      socket.off('hub', callback)
    },
  }
})

import '../../styles/pixel-box-selected.css'

import { ColorSelectionPanel, Header, InteractivePixelBoard } from '@@components'
import { Box, Stack } from '@mui/material'

import { useUsersStore, useSocketStore } from '@@zstores'
import { AlertDialog } from './components'
import { useEffect } from 'react'

const HomePage = () => {
  const isAuthenticated = useUsersStore((state) => state.isAuthenticated)
  const logInAnonymous = useUsersStore((state) => state.logInAnonymous)

  const socket = useSocketStore((state) => state.socket)
  const connectToServer = useSocketStore((state) => state.connectToServer)
  const disconnectFromServer = useSocketStore((state) => state.disconnectFromServer)

  useEffect(() => {
    connectToServer('/')

    return () => {
      // disconnectFromServer()
    }
  }, [connectToServer])

  useEffect(() => {
    if (socket) {
      // Unirse a la sala después de conectar
      socket.emit('joinRoom', 'hub') // Cambia el nombre de la sala si es necesario
    }
  }, [socket])

  return (
    <Box sx={{ position: 'relative' }}>
      <Stack justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', bgcolor: 'hsl(0, 0%, 97%)' }}>
        <Box>
          <Header />
        </Box>

        <Box>
          <Stack>
            <InteractivePixelBoard />
            <ColorSelectionPanel />
          </Stack>
        </Box>

        {!isAuthenticated && <AlertDialog />}
      </Stack>
    </Box>
  )
}

export default HomePage

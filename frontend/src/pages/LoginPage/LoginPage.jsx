import { Box, Button, Container, Divider, Stack, TextField, Typography } from '@mui/material'

import { AnimatedGridPattern } from '../../components/AnimatedGridPattern'
import GitHubIcon from '@mui/icons-material/GitHub'
import GoogleIcon from '@mui/icons-material/Google'
import MicrosoftIcon from '@mui/icons-material/Microsoft'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUsersStore } from '@@zstores'

const LoginPage = () => {
  const isAuthenticated = useUsersStore((state) => state.isAuthenticated)
  const logInAnonymous = useUsersStore((state) => state.logInAnonymous)

  const navigate = useNavigate()

  const handleAnonymousLogin = async () => {
    try {
      await logInAnonymous()
      console.log('User logged in:', isAuthenticated)
    } catch (error) {
      console.error('Error during anonymous login:', error)
    }
  }

  useEffect(() => {
    if (isAuthenticated) navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <AnimatedGridPattern />

      <Container sx={{ position: 'relative', zIndex: 1000 }}>
        <Stack direction="row" justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
          <Box
            sx={{
              p: 3,
              maxWidth: 360,
              width: '100%',
              bgcolor: 'rgb(255, 255, 255)',
              borderRadius: 2,
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.15)',
            }}
          >
            <Typography component="h1" variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
              Log-in
            </Typography>
            <Stack alignItems="center" spacing={2}>
              <Box component="form" noValidate autoComplete="off" sx={{ minWidth: '100%' }}>
                <Stack spacing={2}>
                  <TextField id="outlined-basic" label="Email" variant="outlined" size="small" fullWidth />
                  <TextField id="outlined-basic" label="Password" variant="outlined" size="small" fullWidth />
                  <Button variant="contained" fullWidth>
                    Continuar
                  </Button>
                </Stack>
              </Box>

              <Divider sx={{ minWidth: '100%' }}>OR</Divider>

              <Stack spacing={2} sx={{ minWidth: '100%' }}>
                <Button
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  sx={{ bgcolor: '#fff', color: '#000', justifyContent: 'start' }}
                  disableElevation
                  fullWidth
                >
                  Continuar con Google
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<GitHubIcon />}
                  sx={{ bgcolor: '#fff', color: '#000', justifyContent: 'start' }}
                  disableElevation
                  fullWidth
                >
                  Continuar con GitHub
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<MicrosoftIcon />}
                  sx={{ bgcolor: '#fff', color: '#000', justifyContent: 'start' }}
                  disableElevation
                  ullWidth
                >
                  Continuar con Microsoft
                </Button>

                <Divider sx={{ minWidth: '100%' }}>OR</Divider>

                <Button variant="contained" onClick={handleAnonymousLogin} fullWidth>
                  Iniciar como usuario anonimo
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default LoginPage

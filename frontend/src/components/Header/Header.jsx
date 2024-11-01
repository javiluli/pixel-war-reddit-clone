import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useUsersStore } from '@@zstores'

function Header(props) {
  const isAuthenticated = useUsersStore((state) => state.isAuthenticated)
  const logOut = useUsersStore((state) => state.logOut)

  // eslint-disable-next-line react/prop-types
  const { window } = props
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const handleSignOut = () => {
    logOut()
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        PixelWar
      </Typography>

      <Divider />
      <List>
        {!isAuthenticated && (
          <ListItem key="sign-in" disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Link href="/login">Sign in</Link>
            </ListItemButton>
          </ListItem>
        )}

        {isAuthenticated && (
          <ListItem key="sign-out" disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Link onClick={handleSignOut}>Sign out</Link>
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            PixelWar
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {!isAuthenticated && (
              <Button key="sign-in" sx={{ color: '#fff' }}>
                <Link href="/login" variant="body2" sx={{ color: '#fff' }}>
                  Sign in
                </Link>
              </Button>
            )}

            {isAuthenticated && (
              <Button key="sign-out" variant="body2" onClick={handleSignOut} sx={{ color: '#fff' }}>
                Sign out
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  )
}

// return (
//   <AppBar position="static" elevation={0}>
//     <Container maxWidth="xl">
//       <Toolbar disableGutters>
//         <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
//         <Typography
//           variant="h6"
//           noWrap
//           component="a"
//           href="#app-bar-with-responsive-menu"
//           sx={{
//             mr: 2,
//             display: { xs: 'none', md: 'flex' },
//             fontFamily: 'monospace',
//             fontWeight: 700,
//             letterSpacing: '.3rem',
//             color: 'inherit',
//             textDecoration: 'none',
//           }}
//         >
//           LOGO
//         </Typography>

//         <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
//         <Typography
//           variant="h5"
//           noWrap
//           component="a"
//           href="#app-bar-with-responsive-menu"
//           sx={{
//             mr: 2,
//             display: { xs: 'flex', md: 'none' },
//             flexGrow: 1,
//             fontFamily: 'monospace',
//             fontWeight: 700,
//             letterSpacing: '.3rem',
//             color: 'inherit',
//             textDecoration: 'none',
//           }}
//         >
//           LOGO
//         </Typography>

//         <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
//         <Box sx={{ flexGrow: 0 }}>
//           {!isAuthenticated ? (
//             <Button>
//               <Link href="/login" variant="body2" sx={{ my: 2, color: 'white', display: 'block' }}>
//                 Sign in
//               </Link>
//             </Button>
//           ) : (
//             <Button onClick={handleSignOut} sx={{ my: 2, color: 'white', display: 'block' }}>
//               Sign out
//             </Button>
//           )}
//         </Box>
//       </Toolbar>
//     </Container>
//   </AppBar>
// )

export default Header

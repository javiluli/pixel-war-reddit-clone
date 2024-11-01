import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Error404Page, HomePage, LoginPage } from '@@pages'

// import { ROUTES } from '@@constants'
// import { CreateGamePage, EnterGamePage, Error404Page, HomePage, IngameMapPage, SelectTeamPage } from '@@pages'
// import { theme } from '@@themes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Default route in a switch */}
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

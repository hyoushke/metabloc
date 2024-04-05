import '@shared/styles/global.scss'

import { ThemeProvider } from '@mui/material'
import { RouterProvider } from 'react-router-dom'

import { router } from './config/router'
import { theme } from './config/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App

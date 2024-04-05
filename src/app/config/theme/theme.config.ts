import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#BA85FB',
      contrastText: '#222D35',
    },
    secondary: {
      main: '#fff',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        elevation8: {
          background: '#221F2C',
        },
      },
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
    fontFamily: 'inherit',
    body1: {
      color: '#E5E5E5 !important',
      fontSize: '14px',
    },
  },
})

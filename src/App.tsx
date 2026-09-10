import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Metronome } from './components/Metronome.tsx';

const baseTheme = createTheme({
  typography: {
    fontFamily: [
      'Quicksand',
      'sans-serif',
    ].join(','),
  }
});

function App() {
  return (
    <ThemeProvider theme={baseTheme}>
      <CssBaseline />
      <Metronome />
    </ThemeProvider>
  )
}

export default App

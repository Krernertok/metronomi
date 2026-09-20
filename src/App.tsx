import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Metronome } from './components/Metronome.tsx';
import { MetronomeTheme, } from './context/MetronomeContext.tsx';

const baseTheme = createTheme({
  typography: {
    fontFamily: [
      'Quicksand Variable',
      'sans-serif',
    ].join(','),
  }
});

function App() {
  return (
    <ThemeProvider theme={baseTheme}>
      <CssBaseline />
      <MetronomeTheme>
        <Metronome />
      </MetronomeTheme>
    </ThemeProvider>
  )
}

export default App

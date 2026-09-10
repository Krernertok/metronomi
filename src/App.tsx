import { Metronome } from './components/Metronome.tsx';

function App() {

  const initialBpm = 80;

  return (
    <Metronome initialBpm={ initialBpm } />
  )
}

export default App

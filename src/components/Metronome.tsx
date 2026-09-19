import { Box, Button, Slider, Stack, } from '@mui/material';
import { useMetronome, } from '../hooks/useMetronome.tsx';
import { VolumeSlider, } from './VolumeSlider.tsx';
import { MetronomeDisplay, } from './MetronomeDisplay.tsx';

const DEFAULT_BPM = 80;
const MAX_BPM = 240;
const MIN_BPM = 30;

export function Metronome() {
  const { bpm, setBpm, gain, setGain, isPlaying, setIsPlaying } = useMetronome(DEFAULT_BPM);

  function handleTempoSliderChange(e: Event) {
    if (e.target !== null) {
      const eventTarget = e.target as HTMLInputElement;
      setBpm(Number(eventTarget.value));
    }
  }

  function incrementBpm() {
    if (bpm < MAX_BPM) setBpm(bpm + 1);
  }

  function decrementBpm() {
    if (bpm > MIN_BPM) setBpm(bpm - 1);
  }

  function toggleIsPlaying() {
    setIsPlaying(!isPlaying);
  }

  // TODO: Switch to using reducer to handle synchronization between changes in BPM and different components
  // TODO: Add error message that bpm should be between min and max
  // TODO: Pulse the outline of the number inbut element with the metronome beat

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      <Stack
        spacing={2}
        sx={{
          alignItems: 'center',
          maxWidth: 600,
          width: '100%',
        }} >
        <VolumeSlider volume={gain} setVolume={setGain} />
        <MetronomeDisplay
          bpm={bpm}
          setBpm={setBpm}
          min_value={MIN_BPM}
          max_value={MAX_BPM}
        />
        <Stack
          direction='row'
          spacing={2}
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }} >
          <Button
            onClick={decrementBpm}
            sx={{
              p: 1,
              fontSize: 20
            }}
            variant='contained'
          >-</Button>
          <Slider
            min={MIN_BPM}
            max={MAX_BPM}
            onChange={handleTempoSliderChange}
            sx={{
              '& .MuiSlider-thumb': {
                height: 30,
                width: 30,
              }
            }}
            value={bpm}
          />
          <Button
            onClick={incrementBpm}
            sx={{
              p: 1,
              fontSize: 20,
            }}
            variant='contained'
          >+</Button>
        </Stack>
        <Button
          fullWidth
          variant={isPlaying ? 'outlined' : 'contained'}
          sx={{
            fontSize: 50,
          }}
          onClick={toggleIsPlaying}
        >{isPlaying ? 'Stop' : 'Play'}</Button>
      </Stack>
    </Box>
  );
}

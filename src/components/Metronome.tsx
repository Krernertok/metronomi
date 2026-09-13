import { Box, Button, Slider, Stack, TextField } from '@mui/material';
import { useMetronome } from '../hooks/useMetronome.tsx';


const DEFAULT_BPM = 80;
const MAX_BPM = 240;
const MIN_BPM = 1;

export function Metronome() {
  const { bpm, setBpm, isPlaying, setIsPlaying } = useMetronome(DEFAULT_BPM);

  function handleTextFieldChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const nextBpm = Number(e.target.value);
    const bpmIsNumber = !Number.isNaN(nextBpm);

    if (bpmIsNumber && nextBpm >= MIN_BPM && nextBpm <= MAX_BPM) {
      setBpm(Number(e.target.value))
    }
  }

  function handleSliderChange(e: Event) {
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

  // TODO: Fix issues with setting MIN_BPM to a sensible value like 40 (i.e. set value when unfocus triggers)
  // TODO: Pulse the outline of the number inbut element with the metronome beat
  // TODO: Volume (i.e. gain) control for metronome

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
        }}
      >
        <TextField
          variant='outlined'
          value={bpm}
          sx={{
            width: 400,

            '& .MuiOutlinedInput-root': {
              width: 400,
              height: 400,
              borderRadius: '50%',
            },

            '& input': {
              fontSize: 150,
              padding: 0,
              textAlign: 'center',
            },
          }}
          onChange={handleTextFieldChange}
          onFocus={e => e.target.select()}
        />
        <Stack direction='row' spacing={2} sx={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
        >
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
            onChange={handleSliderChange}
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

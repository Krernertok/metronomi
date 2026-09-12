import { Box, Button, Stack, TextField } from '@mui/material';
import { useMetronome } from '../hooks/useMetronome.tsx';


const DEFAULT_BPM = 80;
const MAX_BPM = 320;


export function Metronome() {
  const { bpm, setBpm, isPlaying, setIsPlaying } = useMetronome(DEFAULT_BPM);

  function onTextFieldChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const nextBpm = Number(e.target.value);
    const bpmIsNumber = !Number.isNaN(nextBpm);

    if (bpmIsNumber && nextBpm > 0 && nextBpm <= MAX_BPM) {
      setBpm(Number(e.target.value))
    }
  }

  function incrementBpm() {
    if (bpm < 320) setBpm(bpm + 1);
  }

  function decrementBpm() {
    if (bpm > 1) setBpm(bpm - 1);
  }

  function toggleIsPlaying() {
    setIsPlaying(!isPlaying);
  }

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
          onChange={onTextFieldChange}
        />
        <Stack direction='row' spacing={2} sx={{
          justifyContent: 'center',
          width: '100%',
        }}
        >
          <Button
            variant='contained'
            fullWidth
            sx={{
              p: 1,
              fontSize: 60
            }}
            onClick={decrementBpm}
          >-</Button>
          <Button
            variant='contained'
            fullWidth
            sx={{
              p: 1,
              fontSize: 60
            }}
            onClick={incrementBpm}
          >+</Button>
        </Stack>
        <Button
          fullWidth
          variant='outlined'
          sx={{ 
            fontSize: 80,
          }}
          onClick={toggleIsPlaying}
        >{isPlaying ? 'Stop' : 'Play'}</Button>
      </Stack>
    </Box>
  );
}

import { Box, Button, Grid, Stack, TextField } from '@mui/material';
import { useMetronome } from '../hooks/useMetronome.tsx';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';


const DEFAULT_BPM = 80;


export function Metronome() {
  const { bpm, setBpm, isPlaying, setIsPlaying } = useMetronome(DEFAULT_BPM);

  function onTextFieldChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const nextBpm = Number(e.target.value);
    const bpmIsNumber = !Number.isNaN(nextBpm);

    if (bpmIsNumber && nextBpm > 0 && nextBpm <= 320) {
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

    <Grid container sx={{ alignItems: 'center' }}>
      <Grid size={12}>
        <TextField
          fullWidth={true}
          sx={{
            input: {
              textAlign: 'center',
            }
          }}
          value={bpm}
          onChange={onTextFieldChange}
          />
      </Grid>
      <Grid size={6}>
        <Button fullWidth onClick={decrementBpm}>
          <RemoveCircleIcon />
        </Button>
      </Grid>
      <Grid size={6}>
        <Button fullWidth onClick={incrementBpm}>
          <AddCircleIcon />         
        </Button>
      </Grid>
      <Grid size={12}>
        <Button fullWidth variant='contained' onClick={toggleIsPlaying} >{isPlaying ? 'Stop' : 'Play'}</Button>
      </Grid>
    </Grid>
  );
}

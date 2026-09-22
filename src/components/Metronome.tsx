import { Box, Stack, } from '@mui/material';

import { MetronomeDisplay, } from './MetronomeDisplay.tsx';
import { useMetronome, } from '../hooks/useMetronome.tsx';
import { VolumeSlider, } from './VolumeSlider.tsx';
import { TempoSlider, } from './TempoSlider.tsx';
import { useMetronomeContext, } from '../context/MetronomeContext.tsx';
import { PlayButton } from './PlayButton.tsx';

export function Metronome() {
  // TODO: Add error message that bpm should be between min and max
  // TODO: Pulse the outline of the number input element with the metronome beat
  // TODO: Light and dark modes
  // TODO: Practice journal
  // TODO: Long press on buttons -> Increment/decrement continuously
  // TODO: blur on Enter
  
  useMetronome(useMetronomeContext());

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
          <VolumeSlider />
          <MetronomeDisplay />
          <Stack
            direction='row'
            spacing={2}
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }} >
            <TempoSlider />
          </Stack>
          <PlayButton />
        </Stack>
      </Box>
  );
}

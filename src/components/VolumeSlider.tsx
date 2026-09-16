import { useState } from 'react';
import { IconButton, Slider, Stack } from '@mui/material';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';

export function VolumeSlider({ volume, setVolume }: { volume: number, setVolume: (a: number) => void }) {
  const [showSlider, setShowSlider] = useState(false);

  // TODO: Changing the volume resets the metronome
  // TODO: clean it up
  function handleVolumeSliderChange(e: Event) {
    if (e.target !== null) {
      const eventTarget = e.target as HTMLInputElement;
      setVolume(Number(eventTarget.value) / 100.0);
    }
  }

  return (
    <Stack
      direction='row-reverse'
      sx={{
        width: '100%',
      }}
    >
      <Stack sx={{
        alignItems: 'center',
        position: 'relative',
      }}>
        <IconButton color='primary' onClick={() => setShowSlider(!showSlider)}>
          <VolumeUpIcon />
        </IconButton>
        <Slider
          min={0}
          max={100}
          onChange={handleVolumeSliderChange}
          orientation='vertical'
          value={volume * 100}
          size='small'
          sx={{
            display: showSlider ? 'block' : 'none',
            height: '10vw',
            position: 'absolute',
            top: '45px',
          }}
        />
      </Stack>
    </Stack>
  )
}

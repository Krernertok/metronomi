import { IconButton, Slider, Stack, } from '@mui/material';
import { bindHover, bindPopover, usePopupState, } from 'material-ui-popup-state/hooks';
import HoverPopover from 'material-ui-popup-state/HoverPopover';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

import { useMetronomeContext, useMetronomeDispatchContext, } from '../context/MetronomeContext.tsx';

export function VolumeSlider() {
  const state = useMetronomeContext();
  const dispatch = useMetronomeDispatchContext();

  const popupState = usePopupState({
    variant: 'popover',
  });

  function handleVolumeSliderChange(e: Event) {
    if (e.target !== null) {
      const eventTarget = e.target as HTMLInputElement;
      dispatch({
        type: 'SET_VOLUME',
        value: eventTarget.value,
      });
    }
  }

  return (
    <Stack
      direction='row-reverse'
      sx={{
        width: '100%',
      }}
    >
      <IconButton
        color='primary'
        {...bindHover(popupState)}
      >
        <VolumeUpIcon />
      </IconButton>
      <HoverPopover
        {...bindPopover(popupState)}
        anchorOrigin={{ vertical: 35, horizontal: 6, }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              boxShadow: 'none',
              overflow: 'visible',
              paddingTop: 2,
            },
          },
        }}
      >
        <Slider
          min={0}
          max={100}
          onChange={handleVolumeSliderChange}
          orientation='vertical'
          value={state.volume}
          size='small'
          sx={{
            height: '10vw',
          }}
        />
      </HoverPopover>
    </Stack>
  )
}

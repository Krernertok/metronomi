import { Button, Slider, } from '@mui/material';

import { useMetronomeContext, useMetronomeDispatchContext } from '../context/MetronomeContext.tsx';
import { MIN_BPM, MAX_BPM } from '../configs/config.ts';

export function TempoSlider() {
  const state = useMetronomeContext();
  const dispatch = useMetronomeDispatchContext();

  function handleTempoSliderChange(e: Event) {
    if (e.target !== null) {
      const eventTarget = e.target as HTMLInputElement;
      dispatch({
        type: 'SET_BPM',
        value: eventTarget.value,
      })
    }
  }

  return (
    <>
      <Button
        onClick={() => dispatch({ type: 'DECREMENT_BPM' })}
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
        value={state.bpm}
      />
      <Button
        onClick={() => dispatch({ type: 'INCREMENT_BPM' })}
        sx={{
          p: 1,
          fontSize: 20,
        }}
        variant='contained'
      >+</Button>
    </>
  );
}

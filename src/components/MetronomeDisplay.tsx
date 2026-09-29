import { useEffect, useEffectEvent, useRef, useState } from 'react';
import { TextField } from '@mui/material';

import { useMetronomeContext, useMetronomeDispatchContext, } from '../context/MetronomeContext.tsx';
import { subscribeToEvents } from './MetronomeEvents.tsx';
import type { BeatEvent } from './MetronomeEvents.tsx';


export function MetronomeDisplay() {
  const state = useMetronomeContext();
  const dispatch = useMetronomeDispatchContext();

  const beatEventsRef = useRef(new Array<BeatEvent>());
  const addBeat = useEffectEvent((b: BeatEvent) => beatEventsRef.current.push(b));

  useEffect(() => {
    return subscribeToEvents(addBeat);
  }, []);


  const [pulse, setPulse] = useState(false);
  const setPulseEffect = useEffectEvent((nextPulse: boolean) => setPulse(nextPulse));

  useEffect(() => {
    const audioCtx = new AudioContext();

    async function closeContext() {
      await audioCtx.close();
    }

    async function animatePulse() {
      if (!state.isPlaying) {
        return;
      }

      if (beatEventsRef.current.length === 0) {
        setPulseEffect(false);
      }

      const now = audioCtx.currentTime;
      while (
        beatEventsRef.current.length &&
        beatEventsRef.current[0] <= now
      ) {
        console.log('in while loop');
        setPulseEffect(true);
        beatEventsRef.current.shift();
      }

      requestAnimationFrame(animatePulse);
    }

    animatePulse();
    return () => {closeContext()};
  }, [state.isPlaying]);

  function handleTextFieldBlur(e: React.FocusEvent<HTMLInputElement>) {
    dispatch({
      type: 'SET_BPM',
      value: e.target.value,
    })
  }

  return (
    <TextField
      variant='outlined'
      value={state.displayValue}
      error={state.errorMsg !== ''}
      helperText={state.errorMsg}
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

        '&.MuiFormControl-root.MuiTextField-root': {
          position: 'relative',
          marginBottom: '24px',
        },

        '& .MuiFormHelperText-root': {
          position: 'absolute',
          bottom: '-35px',
          left: 0,
          right: 0,
          marginInline: 'auto',
          width: 'fit-content',
          fontSize: '14pt',
        },

        '& .MuiOutlinedInput-notchedOutline': {
          transition: (theme) =>
            theme.transitions.create(['border-color', 'border-width'], {
              duration: '0.05s',
            }),
          borderColor: pulse ? 'primary.main' : 'rgba(0, 0, 0, 0.23)',
          borderWidth: pulse ? '5px' : '1px',
        },

      }}
      onChange={e => dispatch({ type: 'SET_DISPLAY_VALUE', value: e.target.value })}
      onFocus={e => e.target.select()}
      onBlur={handleTextFieldBlur}
    />
  );
}

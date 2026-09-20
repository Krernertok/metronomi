import { Button, } from '@mui/material';
import { useMetronomeContext, useMetronomeDispatchContext } from '../context/MetronomeContext.tsx';

export function PlayButton() {
  const state = useMetronomeContext();
  const dispatch = useMetronomeDispatchContext();

  return (
    <Button
      fullWidth
      variant={state.isPlaying ? 'outlined' : 'contained'}
      sx={{
        fontSize: 50,
      }}
      onClick={() => dispatch({ type: 'TOGGLE_PLAYING' })}
    >{state.isPlaying ? 'Stop' : 'Play'}</Button>
  );
}

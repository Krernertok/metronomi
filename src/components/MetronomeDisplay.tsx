import { TextField } from '@mui/material';

import { useMetronomeContext, useMetronomeDispatchContext, } from '../context/MetronomeContext.tsx';


export function MetronomeDisplay() {
  const state = useMetronomeContext();
  const dispatch = useMetronomeDispatchContext();

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
      onChange={e => dispatch({ type: 'SET_DISPLAY_VALUE', value: e.target.value})}
      onFocus={e => e.target.select()}
      onBlur={handleTextFieldBlur}
    />
  );
}

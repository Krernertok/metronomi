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
      }}
      onChange={e => dispatch({ type: 'SET_DISPLAY_VALUE', value: e.target.value})}
      onFocus={e => e.target.select()}
      onBlur={handleTextFieldBlur}
    />
  );
}

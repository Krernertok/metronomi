import { useState } from 'react';
import { TextField } from '@mui/material';


export function MetronomeDisplay({ bpm, setBpm, min_value, max_value }:
  { bpm: number, setBpm: (n: number) => void, min_value: number, max_value: number }) {
  const [editableBpm, setEditableBpm] = useState(0);
  if (editableBpm !== bpm) {
    setEditableBpm(bpm);
  }

  function handleTextFieldBlur() {
    const nextBpm = Number(editableBpm);
    const bpmIsNumber = !Number.isNaN(nextBpm);

    if (bpmIsNumber && nextBpm >= min_value && nextBpm <= max_value) {
      setBpm(nextBpm);
    } else {
      setEditableBpm(bpm);
    }
  }

  return (
    <TextField
      variant='outlined'
      value={editableBpm}
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
      onChange={e => setEditableBpm(Number(e.target.value))}
      onFocus={e => {
        setEditableBpm(bpm);
        e.target.select();
      }}
      onBlur={handleTextFieldBlur}
    />
  );
}

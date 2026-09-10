import { Button, TextField } from '@mui/material';
import { useMetronome } from '../hooks/useMetronome.tsx';


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
    <>
      <div>
        <TextField value={bpm} onChange={onTextFieldChange} />
        <Button onClick={decrementBpm}> - </Button>
        <Button onClick={incrementBpm}> + </Button>
      </div>
      <div>
        <Button onClick={toggleIsPlaying}>{isPlaying ? 'Stop' : 'Play'}</Button>
      </div>
    </>
  );
}

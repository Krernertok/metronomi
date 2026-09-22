import { DEFAULT_BPM, MAX_BPM, MIN_BPM, } from '../configs/config.ts';

export interface MetronomeState {
  bpm: number,
  displayValue: string,
  errorMsg: string,
  isPlaying: boolean,
  volume: number,
}

export type MetronomeAction =
  | { type: 'DECREMENT_BPM' }
  | { type: 'INCREMENT_BPM' }
  | { type: 'SET_BPM', value: string }
  | { type: 'SET_DISPLAY_VALUE', value: string }
  | { type: 'SET_VOLUME', value: string }
  | { type: 'TOGGLE_PLAYING' };

export const safeInitialState = {
  bpm: DEFAULT_BPM,
  displayValue: `${DEFAULT_BPM}`,
  errorMsg: '',
  isPlaying: false,
  volume: 100,
}

export function metronomeReducer(state: MetronomeState, action: MetronomeAction) {
  switch (action.type) {
    case 'SET_BPM': {
      const isNumeric = action.value !== '' && !isNaN(Number(action.value));
      const newBpm = isNumeric ? Number(action.value) : 0;
      const isNotValidValue = newBpm < MIN_BPM || newBpm > MAX_BPM;
      if (!isNumeric || isNotValidValue) {
        return {
          ...state,
          bpm: state.bpm,
          displayValue: state.bpm,
          errorMsg: `Please input a number between ${MIN_BPM} and ${MAX_BPM}.`
        };
      }
      return { ...state, bpm: newBpm, displayValue: newBpm, errorMsg: ''};
    }
    case 'INCREMENT_BPM': {
      const newBpm = state.bpm + 1;
      if (newBpm <= MAX_BPM) {
        return { ...state, bpm: newBpm, displayValue: newBpm, errorMsg: ''};
      }
      return { ...state };
    }
    case 'DECREMENT_BPM': {
      const newBpm = state.bpm - 1;
      if (newBpm >= MIN_BPM) {
        return { ...state, bpm: newBpm, displayValue: newBpm, errorMsg: '' };
      }
      return { ...state };
    }
    case 'SET_DISPLAY_VALUE':
      return { ...state, displayValue: action.value };
    case 'TOGGLE_PLAYING':
      return { ...state, isPlaying: !state.isPlaying };
    case 'SET_VOLUME': {
      const isNotNumber = Number.isNaN(action.value);
      const newVolume = Number(action.value);
      if (isNotNumber) {
        return { ...state, errorMsg: 'Volume must be a number.' };
      }
      return { ...state, volume: newVolume };
    }
    default:
      return state;
  }
}

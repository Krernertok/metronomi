import { useEffect, useEffectEvent, } from 'react';
import type { MetronomeState } from '../components/MetronomeReducer.tsx';

export function useMetronome(state: MetronomeState) {
  const getBpm = useEffectEvent(() => {
    return state.bpm;
  });

  const getGain= useEffectEvent(() => {
    return state.volume / 100.0;
  });

  useEffect(() => {
    if (state.isPlaying) {
      const ctx = new AudioContext();
      let nextClickTiming = ctx.currentTime;
      let timeoutId: ReturnType<typeof setTimeout>;

      function scheduleClick() {
        const period = 60.0 / getBpm();
        while (nextClickTiming < (ctx.currentTime + 0.1)) {
          click(nextClickTiming);
          nextClickTiming += period;
        }

        timeoutId = setTimeout(scheduleClick, 25);
      }

      function click(nextClick: number) {
        if (ctx === null) return;

        const oscillator = ctx.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.value = 420;

        const gainNode = ctx.createGain();
        gainNode.gain.value = getGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.start(nextClick);
        oscillator.stop(nextClick + 0.05);
      }

      async function resumeAudioContext() {
        await ctx.resume();
      }

      async function closeAudioContext() {
        await ctx.close();
      }

      // audio context is suspended by default and must be resumed manually
      void resumeAudioContext().catch(err => {
        console.log(`Error when resuming audio context: ${err}`)
      })

      scheduleClick();

      return () => {
        void closeAudioContext();
        clearTimeout(timeoutId);
      };
    }
  }, [state.isPlaying]);
}

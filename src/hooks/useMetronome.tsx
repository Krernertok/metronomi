import { useEffect, useState } from 'react';

export function useMetronome(initialBpm: number) {
  const [bpm, setBpm] = useState(initialBpm ?? 80);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      const ctx = new AudioContext();
      const frequency = 60.0 / bpm;
      let nextClickTiming = ctx.currentTime;
      let timeoutId: ReturnType<typeof setTimeout>;

      function scheduleClick() {
        while (nextClickTiming < (ctx.currentTime + 0.1)) {
          click(nextClickTiming);
          nextClickTiming += frequency;
        }

        timeoutId = setTimeout(scheduleClick, 25);
      }

      function click(nextClick: number) {
        if (ctx === null) return;

        const oscillator = ctx.createOscillator();
        oscillator.connect(ctx.destination);

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
  }, [isPlaying, bpm]);

  return {bpm, setBpm, isPlaying, setIsPlaying};
}

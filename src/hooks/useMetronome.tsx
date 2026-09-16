import { useEffect, useEffectEvent, useState } from 'react';

export function useMetronome(initialBpm: number) {
  const [bpm, setBpm] = useState(initialBpm ?? 80);
  const [gain, setGain] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const getGain = useEffectEvent(() => gain);

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
  }, [bpm, isPlaying]);

  return {bpm, setBpm, gain, setGain, isPlaying, setIsPlaying};
}

export type BeatEvent = number;
type Listener = (b: BeatEvent) => void;

const listeners = new Set<Listener>();

export function subscribeToEvents(listener: Listener) {
  listeners.add(listener);
  return () => { listeners.delete(listener) };
}

export function publishEvent(b: BeatEvent) {
  for (const listener of listeners) {
    listener(b);
  }
}

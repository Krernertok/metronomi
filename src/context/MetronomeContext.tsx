import type { ReactNode, } from 'react';
import React, { createContext, use, useReducer, } from 'react';
import type { MetronomeState, MetronomeAction, } from '../components/MetronomeReducer.tsx';
import { metronomeReducer, safeInitialState, } from '../components/MetronomeReducer.tsx';


const MetronomeContext = createContext<MetronomeState | null>(null);
const MetronomeDispatchContext = createContext<React.Dispatch<MetronomeAction> | null>(null);

export function MetronomeTheme({ children }: { children: ReactNode }) {
  const [metronomeState, dispatch] = useReducer(metronomeReducer, safeInitialState);

  return (
    <MetronomeContext value={metronomeState}>
    <MetronomeDispatchContext value={dispatch}>
      {children}
      </MetronomeDispatchContext>
    </MetronomeContext>
  )
}
export function useMetronomeContext(): MetronomeState {
  const context = use(MetronomeContext);

  if (context === null) {
    throw new Error('You have to use a context inside a context provider!');
  }

  return context;
}

export function useMetronomeDispatchContext(): React.Dispatch<MetronomeAction> {
  const context = use(MetronomeDispatchContext);

  if (context === null) {
    throw new Error('You have to use a context inside a context provider!');
  }

  return context;
}

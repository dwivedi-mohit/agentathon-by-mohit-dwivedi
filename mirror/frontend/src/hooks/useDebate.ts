import { useState, useRef, useCallback } from 'react';
import type { Phase, PersonaInfo, SynthesisBrief, AppError } from '../types';
import { createDebate } from '../lib/api';

interface PersonaStatement {
  persona_id: string;
  text: string;
  round: number;
  done: boolean;
}

export interface DebateState {
  phase: Phase;
  sessionId: string | null;
  question: string;
  personas: PersonaInfo[];
  currentRound: number;
  activePersonaId: string | null;
  statements: Record<string, PersonaStatement>;
  brief: SynthesisBrief | null;
  synthesisText: string;
  error: AppError | null;
  durationMs: number | null;
}

export function useDebate() {
  const [state, setState] = useState<DebateState>({
    phase: 'idle',
    sessionId: null,
    question: '',
    personas: [],
    currentRound: 1,
    activePersonaId: null,
    statements: {},
    brief: null,
    synthesisText: '',
    error: null,
    durationMs: null,
  });

  const eventSourceRef = useRef<EventSource | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  const update = useCallback((partial: Partial<DebateState>) => {
    setState(prev => ({ ...prev, ...partial }));
  }, []);

  const startDebate = useCallback(async (question: string, numRounds: number = 3) => {
    try {
      update({ phase: 'connecting', question, error: null });
      const session = await createDebate(question, numRounds);
      
      update({
        sessionId: session.session_id,
        personas: session.personas,
        phase: 'intro',
      });

      // Auto-advance to debate after 2.5s
      setTimeout(() => {
        if (stateRef.current.phase === 'intro') {
          update({ phase: 'debating' });
          connectSSE(session.session_id);
        }
      }, 2500);

    } catch (err: any) {
      update({
        phase: 'error',
        error: { message: err.message || 'Failed to start debate' },
      });
    }
  }, [update]);

  const connectSSE = useCallback((sessionId: string) => {
    const url = `${import.meta.env.VITE_API_URL || ''}/api/debate/${sessionId}/stream`;
    const source = new EventSource(url);
    eventSourceRef.current = source;

    source.addEventListener('persona:start', (e: MessageEvent) => {
      const data = JSON.parse(e.data);
      update({ activePersonaId: data.persona_id });
    });

    source.addEventListener('persona:chunk', (e: MessageEvent) => {
      const data = JSON.parse(e.data);
      setState(prev => {
        const existing = prev.statements[data.persona_id] || {
          persona_id: data.persona_id,
          text: '',
          round: data.round,
          done: false,
        };
        return {
          ...prev,
          statements: {
            ...prev.statements,
            [data.persona_id]: { ...existing, text: existing.text + data.text, round: data.round },
          },
        };
      });
    });

    source.addEventListener('persona:done', (e: MessageEvent) => {
      const data = JSON.parse(e.data);
      setState(prev => {
        const existing = prev.statements[data.persona_id] || {
          persona_id: data.persona_id,
          text: '',
          round: data.round,
          done: false,
        };
        return {
          ...prev,
          statements: {
            ...prev.statements,
            [data.persona_id]: { ...existing, text: data.full_text, round: data.round, done: true },
          },
          activePersonaId: null,
        };
      });
    });

    source.addEventListener('round:complete', (e: MessageEvent) => {
      const data = JSON.parse(e.data);
      update({ currentRound: data.next_round || data.round });
    });

    source.addEventListener('synthesis:start', () => {
      update({ phase: 'synthesizing', synthesisText: '' });
    });

    source.addEventListener('synthesis:chunk', (e: MessageEvent) => {
      const data = JSON.parse(e.data);
      setState(prev => ({
        ...prev,
        synthesisText: prev.synthesisText + (data.text_chunk || data || ''),
      }));
    });

    source.addEventListener('synthesis:done', (e: MessageEvent) => {
      const data = JSON.parse(e.data);
      update({ brief: data.brief, phase: 'complete' });
    });

    source.addEventListener('debate:complete', (e: MessageEvent) => {
      const data = JSON.parse(e.data);
      update({ durationMs: data.duration_ms });
      source.close();
    });

    source.addEventListener('error', (e: MessageEvent) => {
      const data = JSON.parse(e.data);
      update({
        phase: 'error',
        error: { message: data.message || 'An error occurred' },
      });
      source.close();
    });

    source.onerror = () => {
      update({
        phase: 'error',
        error: { message: 'Connection lost. Please start a new debate.' },
      });
      source.close();
    };
  }, [update]);

  const skipIntro = useCallback(() => {
    if (state.sessionId) {
      update({ phase: 'debating' });
      connectSSE(state.sessionId);
    }
  }, [state.sessionId, update, connectSSE]);

  const reset = useCallback(() => {
    eventSourceRef.current?.close();
    setState({
      phase: 'idle',
      sessionId: null,
      question: '',
      personas: [],
      currentRound: 1,
      activePersonaId: null,
      statements: {},
      brief: null,
      synthesisText: '',
      error: null,
      durationMs: null,
    });
  }, []);

  return { state, startDebate, skipIntro, reset };
}

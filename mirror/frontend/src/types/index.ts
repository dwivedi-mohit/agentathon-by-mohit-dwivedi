export interface Persona {
  id: string;
  name: string;
  role: string;
  color: string;
  description: string;
}

export interface PersonaInfo {
  id: string;
  name: string;
  role: string;
  color: string;
  description: string;
}

export interface OptionBrief {
  option: string;
  summary: string;
  upside: string[];
  downside: string[];
  confidence: string;
  action_steps: string[];
  championed_by: string[];
}

export interface SynthesisBrief {
  options: OptionBrief[];
  raw_summary: string;
}

export interface DebateSession {
  session_id: string;
  status: string;
  question: string;
  personas: PersonaInfo[];
  stream_url: string;
}

export type Phase = 'idle' | 'intro' | 'connecting' | 'debating' | 'synthesizing' | 'complete' | 'error';

export interface AppError {
  message: string;
  code?: string;
}

export type SSEEvent = 
  | { type: 'persona:start'; data: { persona_id: string; round: number } }
  | { type: 'persona:chunk'; data: { persona_id: string; text: string; round: number } }
  | { type: 'persona:done'; data: { persona_id: string; full_text: string; round: number } }
  | { type: 'round:complete'; data: { round: number; next_round: number | null } }
  | { type: 'synthesis:start'; data: {} }
  | { type: 'synthesis:chunk'; data: { text_chunk: string } }
  | { type: 'synthesis:done'; data: { brief: SynthesisBrief } }
  | { type: 'debate:complete'; data: { session_id: string; duration_ms: number } }
  | { type: 'error'; data: { message: string } };

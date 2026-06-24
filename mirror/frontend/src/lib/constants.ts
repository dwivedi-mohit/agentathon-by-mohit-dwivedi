import type { Persona } from '../types';

export const PERSONAS: Persona[] = [
  {
    id: 'uday',
    name: 'Uday',
    role: 'The Optimist',
    color: '#10B981',
    description: 'Sees potential everywhere. Every constraint is an opportunity.',
  },
  {
    id: 'kiran',
    name: 'Kiran', 
    role: 'The Skeptic',
    color: '#EF4444',
    description: 'Finds what breaks. Has seen 100 startups fail.',
  },
  {
    id: 'mohan',
    name: 'Mohan',
    role: 'The Operator',
    color: '#3B82F6',
    description: 'Run businesses for 20 years. Cares about logistics.',
  },
  {
    id: 'priya',
    name: 'Priya',
    role: 'The Customer',
    color: '#F59E0B',
    description: 'The end-user. Cares about value, not vision.',
  },
];

export const PERSONA_ICONS: Record<string, string> = {
  uday: '●',
  kiran: '■',
  mohan: '▲',
  priya: '◆',
};

export const EXAMPLE_QUESTIONS = [
  'Should I hire a second developer or outsource to an agency?',
  'Is it the right time to raise a seed round?',
  'Should I open a second store in a different city?',
  'Should I pivot from B2C to B2B?',
];

import { motion } from 'framer-motion';
import { PersonaCard } from './PersonaCard';
import type { PersonaInfo } from '../../types';

interface PersonaGridProps {
  personas: PersonaInfo[];
  statements: Record<string, { text: string; done: boolean }>;
  activePersonaId: string | null;
  currentRound: number;
}

const container: any = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item: any = {
  hidden: { opacity: 0, y: 25, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 180, damping: 18 } },
};

export function PersonaGrid({ personas, statements, activePersonaId, currentRound }: PersonaGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full h-full mx-auto px-4"
      variants={container}
      initial="hidden"
      animate="show"
      key={currentRound}
    >
      {personas.map((persona) => {
        const stmt = statements[persona.id];
        return (
          <motion.div key={persona.id} variants={item} className="h-full">
            <PersonaCard
              persona={persona}
              isSpeaking={activePersonaId === persona.id}
              text={stmt?.text}
              done={stmt?.done}
              round={currentRound}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

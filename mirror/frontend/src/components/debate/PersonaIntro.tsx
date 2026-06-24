import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { PERSONA_ICONS } from '../../lib/constants';
import type { PersonaInfo } from '../../types';

interface PersonaIntroProps {
  personas: PersonaInfo[];
  onStart: () => void;
}

export function PersonaIntro({ personas, onStart }: PersonaIntroProps) {
  return (
    <motion.div
      className="w-full max-w-[720px] mx-auto px-4 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.h2
        className="text-2xl font-bold mb-1 bg-gradient-to-r from-[#818CF8] to-[#7C3AED] bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Your debate team
      </motion.h2>
      <motion.p
        className="text-xs text-[#64748B] mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        4 agents with opposing views will analyze your question
      </motion.p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {personas.map((p, i) => (
          <motion.div
            key={p.id}
            className="glass rounded-2xl p-5"
            initial={{ opacity: 0, y: 25, rotateY: -10 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 180, damping: 18 }}
            whileHover={{ y: -5, scale: 1.03 }}
          >
            <motion.div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold mx-auto mb-2"
              style={{ backgroundColor: `${p.color}15`, color: p.color }}
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: i * 0.3, ease: 'easeInOut' }}
            >
              {PERSONA_ICONS[p.id]}
            </motion.div>
            <h3 className="font-semibold text-sm text-white mb-0.5">{p.name}</h3>
            <p className="text-[10px] text-[#64748B] mb-1">{p.role}</p>
            <p className="text-[9px] text-[#4A4A6A] leading-relaxed">{p.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Button onClick={onStart} variant="glow" size="lg">
          Start Debate
        </Button>
        <motion.p
          className="text-[10px] text-[#4A4A6A] mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Auto-starting in 2 seconds...
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

import { motion } from 'framer-motion';

interface RoundIndicatorProps {
  currentRound: number;
  totalRounds: number;
}

export function RoundIndicator({ currentRound, totalRounds }: RoundIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-3 mb-6">
      {Array.from({ length: totalRounds }, (_, i) => {
        const r = i + 1;
        const active = r === currentRound;
        const complete = r < currentRound;
        return (
          <div key={i} className="flex items-center gap-3">
            <motion.div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              animate={{
                background: active ? 'rgba(129,140,248,0.08)' : 'transparent',
                borderColor: active ? 'rgba(129,140,248,0.2)' : 'transparent',
              }}
              style={{ border: active ? '1px solid rgba(129,140,248,0.2)' : '1px solid transparent' }}
            >
              <motion.div
                className="w-2 h-2 rounded-full"
                animate={{
                  scale: active ? [1, 1.3, 1] : 1,
                  backgroundColor: complete ? '#10B981' : active ? '#818CF8' : '#3A3A5A',
                  boxShadow: active ? ['0 0 4px rgba(129,140,248,0.3)', '0 0 12px rgba(129,140,248,0.6)', '0 0 4px rgba(129,140,248,0.3)'] : 'none',
                }}
                transition={{ repeat: active ? Infinity : 0, duration: 2 }}
              />
              <motion.span
                className="text-xs font-medium"
                animate={{ color: complete ? '#10B981' : active ? '#818CF8' : '#3A3A5A' }}
              >
                Round {r}
              </motion.span>
              {complete && (
                <motion.svg className="w-3 h-3 text-[#10B981]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}>
                  <polyline points="20 6 9 17 4 12" />
                </motion.svg>
              )}
            </motion.div>
            {i < totalRounds - 1 && (
              <motion.div
                className="w-6 h-px rounded-full"
                animate={{ backgroundColor: complete ? '#10B981' : '#1E1E35' }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

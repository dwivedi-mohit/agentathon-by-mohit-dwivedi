import { motion } from 'framer-motion';

interface DebateMindmapProps {
  activePersonaId: string | null;
  currentRound: number;
}

export function DebateMindmap({ activePersonaId, currentRound }: DebateMindmapProps) {
  const personas = [
    { id: 'uday', name: 'Uday', color: '#10B981', x: 80, y: 80, role: 'Optimist' },
    { id: 'kiran', name: 'Kiran', color: '#EF4444', x: 320, y: 80, role: 'Skeptic' },
    { id: 'mohan', name: 'Mohan', color: '#3B82F6', x: 80, y: 220, role: 'Operator' },
    { id: 'priya', name: 'Priya', color: '#F59E0B', x: 320, y: 220, role: 'Customer' },
  ];

  return (
    <div className="glass rounded-2xl p-4 border border-white/[0.06] flex flex-col items-center h-full min-h-0 w-full justify-between">
      <div className="w-full flex justify-between items-center mb-2 shrink-0">
        <span className="text-[10px] text-[#4A4A6A] font-bold uppercase tracking-wider">Argument Mindmap</span>
        <span className="text-[9px] bg-white/[0.03] border border-white/[0.06] text-[#818CF8] px-2 py-0.5 rounded">
          Active Round: {currentRound}
        </span>
      </div>

      <div className="relative w-full flex-1 bg-[#07070D]/40 rounded-xl overflow-hidden border border-white/[0.03] min-h-0 flex items-center justify-center">
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-[220px]">
          {/* Central Question Node */}
          <rect x="140" y="130" width="120" height="40" rx="6" fill="#1A1A2E" stroke="#1E1E35" strokeWidth="1" />
          <text x="200" y="153" textAnchor="middle" fill="#94A3B8" fontSize="10" fontWeight="bold">
            Decision Core
          </text>

          {/* Connection Lines */}
          {personas.map((p) => {
            const isSpeaking = activePersonaId === p.id;
            return (
              <g key={p.id}>
                {/* Core line */}
                <motion.line
                  x1="200"
                  y1="150"
                  x2={p.x}
                  y2={p.y}
                  stroke={isSpeaking ? p.color : '#1E1E35'}
                  strokeWidth={isSpeaking ? 2 : 1}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1 }}
                />
                {/* Secondary cross links for rebuttals */}
                <line
                  x1={p.x}
                  y1={p.y}
                  x2={p.id === 'uday' || p.id === 'mohan' ? 320 : 80}
                  y2={p.y === 80 ? 220 : 80}
                  stroke="#1E1E35"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                />
              </g>
            );
          })}

          {/* Persona Nodes */}
          {personas.map((p) => {
            const isSpeaking = activePersonaId === p.id;
            return (
              <g key={p.id} className="cursor-pointer">
                {/* Animated Ring */}
                {isSpeaking && (
                  <motion.circle
                    cx={p.x}
                    cy={p.y}
                    r="26"
                    fill="none"
                    stroke={p.color}
                    strokeWidth="1.5"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                  />
                )}
                <circle cx={p.x} cy={p.y} r="20" fill="#12121E" stroke={isSpeaking ? p.color : '#1E1E35'} strokeWidth="1.5" />
                
                {/* Inner symbol */}
                <text x={p.x} y={p.y + 4} textAnchor="middle" fill={isSpeaking ? p.color : '#E2E8F0'} fontSize="11" fontWeight="bold">
                  {p.name[0]}
                </text>

                {/* Sub Labels */}
                <rect x={p.x - 30} y={p.y + 24} width="60" height="13" rx="3" fill="#07070D" stroke="white" strokeOpacity="0.04" />
                <text x={p.x} y={p.y + 33} textAnchor="middle" fill="#64748B" fontSize="8">
                  {p.role}
                </text>
              </g>
            );
          })}
        </svg>

        {activePersonaId && (
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-center bg-black/40 border border-white/[0.04] py-1 rounded text-[9px] text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse mr-1.5" />
            Live Argument: <span className="font-bold uppercase ml-1" style={{ color: personas.find(p => p.id === activePersonaId)?.color }}>{activePersonaId}</span>
          </div>
        )}
      </div>
    </div>
  );
}

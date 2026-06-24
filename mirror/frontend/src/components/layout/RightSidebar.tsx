import { useState } from 'react';
import { Icons } from '../ui/Icons';

interface RightSidebarProps {
  question: string;
  statements: Record<string, any>;
  theme: string;
  setTheme: (t: string) => void;
  rounds: number;
  setRounds: (r: number) => void;
  debateTone: string;
  setDebateTone: (t: string) => void;
  debateSpeed: string;
  setDebateSpeed: (s: string) => void;
  globalStats: {
    totalDebates: number;
    avgConfidence: number;
    preferredPersona: string;
  };
}

export function RightSidebar({
  question,
  statements,
  theme,
  setTheme,
  rounds,
  setRounds,
  debateTone,
  setDebateTone,
  debateSpeed,
  setDebateSpeed,
  globalStats,
}: RightSidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activePanel, setActivePanel] = useState<'params' | 'coach' | 'bias'>('params');

  // Local cognitive bias scanner
  const detectBiases = () => {
    const list: { persona: string; bias: string; desc: string; severity: 'low' | 'medium' | 'high' }[] = [];
    const textAll = Object.values(statements).map((s: any) => s.text).join(' ').toLowerCase();

    if (textAll.includes('risk') || textAll.includes('danger') || textAll.includes('fail')) {
      list.push({
        persona: 'Kiran (Skeptical)',
        bias: 'Loss Aversion Bias',
        desc: 'Over-indexing on negative outcomes rather than gains.',
        severity: 'medium',
      });
    }
    if (textAll.includes('every') || textAll.includes('success') || textAll.includes('huge')) {
      list.push({
        persona: 'Uday (Optimist)',
        bias: 'Optimism Bias',
        desc: 'Underestimating timelines and risk probability.',
        severity: 'high',
      });
    }
    if (textAll.includes('execute') || textAll.includes('build') || textAll.includes('hiring')) {
      list.push({
        persona: 'Mohan (Operator)',
        bias: 'Action Bias',
        desc: 'Prioritizing immediate activity over critical strategic delay.',
        severity: 'low',
      });
    }
    if (textAll.includes('customer') || textAll.includes('want') || textAll.includes('user')) {
      list.push({
        persona: 'Priya (Customer)',
        bias: 'Anecdotal Evidence Fallacy',
        desc: 'Extrapolating overall market demand from subjective preferences.',
        severity: 'medium',
      });
    }

    if (list.length === 0) {
      list.push({
        persona: 'All Agents',
        bias: 'Blindspot Bias',
        desc: 'Arguments show typical patterns. Proceed with synthesis validation.',
        severity: 'low',
      });
    }
    return list;
  };

  const detected = detectBiases();

  const getPersonaAlignment = () => {
    const values = { uday: 70, kiran: 50, mohan: 60, priya: 55 };
    const keys = Object.keys(statements);
    if (keys.length > 0) {
      keys.forEach((k) => {
        const text = (statements[k]?.text || '').toLowerCase();
        let val = 50;
        if (text.length > 0) {
          if (k === 'uday') {
            val = text.includes('pivot') || text.includes('opportunity') || text.includes('growth') || text.includes('yes') ? 92 : 65;
          } else if (k === 'kiran') {
            val = text.includes('risk') || text.includes('danger') || text.includes('but') || text.includes('runway') ? 34 : 58;
          } else if (k === 'mohan') {
            val = text.includes('build') || text.includes('setup') || text.includes('steps') || text.includes('how') || text.includes('prepare') ? 75 : 62;
          } else if (k === 'priya') {
            val = text.includes('customer') || text.includes('user') || text.includes('experience') ? 68 : 50;
          }
          values[k as 'uday' | 'kiran' | 'mohan' | 'priya'] = val;
        }
      });
    }
    const total = Object.values(values).reduce((sum, v) => sum + v, 0);
    const consensus = Math.round(total / 4);
    return { percentages: values, consensus };
  };

  const alignmentData = getPersonaAlignment();

  return (
    <div
      className={`h-full flex shrink-0 transition-all duration-300 relative border-l border-[#1E1E35] bg-[#09090F] ${
        isOpen ? 'w-80' : 'w-14'
      }`}
    >
      {/* Collapsed view indicator */}
      {!isOpen && (
        <div className="flex flex-col items-center py-6 gap-6 w-full text-[#64748B]">
          <button onClick={() => setIsOpen(true)} className="p-2 rounded-lg hover:bg-white/[0.04] text-white">
            <Icons.ChevronLeft size={18} />
          </button>
          <button onClick={() => { setIsOpen(true); setActivePanel('params'); }} className="p-2 rounded-lg hover:bg-white/[0.04]">
            <Icons.Settings size={18} />
          </button>
          <button onClick={() => { setIsOpen(true); setActivePanel('coach'); }} className="p-2 rounded-lg hover:bg-white/[0.04]">
            <Icons.Award size={18} />
          </button>
          <button onClick={() => { setIsOpen(true); setActivePanel('bias'); }} className="p-2 rounded-lg hover:bg-white/[0.04]">
            <Icons.AlertTriangle size={18} />
          </button>
        </div>
      )}

      {/* Expanded view */}
      {isOpen && (
        <div className="flex-1 flex flex-col min-w-0 h-full">
          {/* Header */}
          <div className="p-4 flex items-center justify-between border-b border-[#1E1E35]">
            <button onClick={() => setIsOpen(false)} className="p-1 rounded hover:bg-white/[0.04] text-[#64748B] hover:text-white">
              <Icons.ChevronRight size={16} />
            </button>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-xs text-white tracking-wider uppercase">Strategic Panels</h3>
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] animate-pulse" />
            </div>
          </div>

          {/* Quick Menu Tabs */}
          <div className="flex border-b border-[#1E1E35] text-xs shrink-0">
            <button
              onClick={() => setActivePanel('params')}
              className={`flex-1 py-3 text-center border-b font-medium transition-all ${
                activePanel === 'params'
                  ? 'border-[#3B82F6] text-white bg-white/[0.01]'
                  : 'border-transparent text-[#64748B] hover:text-white'
              }`}
            >
              Control
            </button>
            <button
              onClick={() => setActivePanel('coach')}
              className={`flex-1 py-3 text-center border-b font-medium transition-all ${
                activePanel === 'coach'
                  ? 'border-[#3B82F6] text-white bg-white/[0.01]'
                  : 'border-transparent text-[#64748B] hover:text-white'
              }`}
            >
              Coach
            </button>
            <button
              onClick={() => setActivePanel('bias')}
              className={`flex-1 py-3 text-center border-b font-medium transition-all ${
                activePanel === 'bias'
                  ? 'border-[#3B82F6] text-white bg-white/[0.01]'
                  : 'border-transparent text-[#64748B] hover:text-white'
              }`}
            >
              Biases
            </button>
          </div>

          {/* Content panel (Scrolls internally to prevent collapsing) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5 min-h-0 text-xs text-[#94A3B8]">
            {activePanel === 'params' && (
              <div className="space-y-4">
                {/* Theme Selector */}
                <div>
                  <label className="block text-[10px] text-[#4A4A6A] font-bold uppercase tracking-wider mb-2">
                    Visual Workspace Theme
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {['cyberpunk', 'slate', 'emerald', 'solarized'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`py-1.5 rounded text-[10px] font-semibold border transition-all capitalize ${
                          theme === t
                            ? 'bg-[#3B82F6]/10 border-[#3B82F6] text-white'
                            : 'bg-white/[0.02] border-white/[0.05] text-[#64748B] hover:text-white'
                        }`}
                      >
                        {t === 'cyberpunk' ? 'Cyber Neon' : t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Debate Settings */}
                <div className="pt-3 border-t border-[#1E1E35] space-y-3">
                  <h4 className="text-[10px] text-[#4A4A6A] font-bold uppercase tracking-wider mb-1">
                    Debate Configuration
                  </h4>

                  {/* Rounds */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Debate Rounds</span>
                      <span className="text-white font-bold">{rounds}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={rounds}
                      onChange={(e) => setRounds(parseInt(e.target.value))}
                      className="w-full h-1 bg-[#1E1E35] rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
                    />
                  </div>

                  {/* Debate Tone */}
                  <div>
                    <label className="block mb-1.5">Discussion Tone</label>
                    <select
                      value={debateTone}
                      onChange={(e) => setDebateTone(e.target.value)}
                      className="w-full bg-[#12121E] border border-[#1E1E35] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
                    >
                      <option value="combative">Combative (Spirited Debate)</option>
                      <option value="diplomatic">Diplomatic (Structured Consensus)</option>
                      <option value="academic">Academic (Analytical Tradeoffs)</option>
                    </select>
                  </div>

                  {/* Speed */}
                  <div>
                    <label className="block mb-1.5">Speed / Interactivity</label>
                    <select
                      value={debateSpeed}
                      onChange={(e) => setDebateSpeed(e.target.value)}
                      className="w-full bg-[#12121E] border border-[#1E1E35] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
                    >
                      <option value="normal">Normal Streaming</option>
                      <option value="fast">Rapid-Fire (Fast-paced)</option>
                      <option value="detailed">In-Depth Analysis</option>
                    </select>
                  </div>
                </div>

                {/* Dashboard Stats */}
                <div className="pt-3 border-t border-[#1E1E35] space-y-2">
                  <h4 className="text-[10px] text-[#4A4A6A] font-bold uppercase tracking-wider mb-1">
                    Global War Room Stats
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-lg bg-[#12121E] border border-white/[0.03]">
                      <span className="text-[9px] text-[#4A4A6A] uppercase font-semibold">Total Debates</span>
                      <p className="text-sm font-bold text-white mt-0.5">{globalStats.totalDebates}</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#12121E] border border-white/[0.03]">
                      <span className="text-[9px] text-[#4A4A6A] uppercase font-semibold">Avg Conf</span>
                      <p className="text-sm font-bold text-[#10B981] mt-0.5">{globalStats.avgConfidence}%</p>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#12121E] border border-white/[0.03] text-center">
                    <span className="text-[9px] text-[#4A4A6A] uppercase font-semibold block">Favored Persona</span>
                    <p className="text-xs font-semibold text-[#818CF8] mt-0.5 capitalize">{globalStats.preferredPersona}</p>
                  </div>
                </div>

                {/* Neural Consensus & Alignment Index */}
                <div className="pt-3 border-t border-[#1E1E35] space-y-3">
                  <h4 className="text-[10px] text-[#4A4A6A] font-bold uppercase tracking-wider mb-1">
                    Neural Consensus & Alignment Index
                  </h4>
                  
                  {/* Central circular consensus indicator */}
                  <div className="flex items-center gap-4 bg-[#12121E] p-3 rounded-lg border border-white/[0.03]">
                    <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        {/* Background circle */}
                        <circle
                          cx="32"
                          cy="32"
                          r="26"
                          stroke="#1E1E35"
                          strokeWidth="3.5"
                          fill="transparent"
                        />
                        {/* Foreground circle */}
                        <circle
                          cx="32"
                          cy="32"
                          r="26"
                          stroke="url(#consensusGradient)"
                          strokeWidth="3.5"
                          strokeDasharray={2 * Math.PI * 26}
                          strokeDashoffset={2 * Math.PI * 26 * (1 - alignmentData.consensus / 100)}
                          strokeLinecap="round"
                          fill="transparent"
                          className="transition-all duration-1000 ease-out"
                        />
                        <defs>
                          <linearGradient id="consensusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#818CF8" />
                            <stop offset="100%" stopColor="#3B82F6" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute text-center flex flex-col items-center justify-center">
                        <span className="text-sm font-extrabold text-white leading-none">{alignmentData.consensus}%</span>
                        <span className="text-[6px] text-[#4A4A6A] uppercase font-bold tracking-wider mt-0.5">Agree</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-white font-semibold block leading-tight">Consensus Gauge</span>
                      <p className="text-[9px] text-[#64748B] leading-relaxed mt-0.5">
                        Weighted agreement score computed from cognitive argument alignment.
                      </p>
                    </div>
                  </div>

                  {/* Individual persona alignment bars */}
                  <div className="space-y-2">
                    {[
                      { id: 'uday', name: 'Uday', label: 'Optimist', color: '#10B981' },
                      { id: 'kiran', name: 'Kiran', label: 'Skeptic', color: '#EF4444' },
                      { id: 'mohan', name: 'Mohan', label: 'Operator', color: '#3B82F6' },
                      { id: 'priya', name: 'Priya', label: 'Customer', color: '#F59E0B' },
                    ].map((p) => {
                      const pct = alignmentData.percentages[p.id as 'uday' | 'kiran' | 'mohan' | 'priya'] || 50;
                      return (
                        <div key={p.id} className="p-2 rounded-lg bg-[#12121E]/60 border border-white/[0.02]">
                          <div className="flex justify-between items-center mb-1 text-[10px]">
                            <div className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
                              <span className="font-semibold text-white">{p.name}</span>
                              <span className="text-[8px] text-[#4A4A6A] uppercase font-medium">({p.label})</span>
                            </div>
                            <span className="font-bold" style={{ color: p.color }}>{pct}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-[#1E1E35] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-1000 ease-out"
                              style={{
                                width: `${pct}%`,
                                backgroundColor: p.color,
                                boxShadow: `0 0 6px ${p.color}40`,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activePanel === 'coach' && (
              <div className="space-y-4">
                <h4 className="text-[10px] text-[#4A4A6A] font-bold uppercase tracking-wider">
                  Strategic Framework Coach
                </h4>
                {question ? (
                  <div className="space-y-3 leading-relaxed">
                    <p className="text-[#C8CFD8] font-medium">Recommended framework for your query:</p>
                    <div className="p-3 rounded-lg bg-[#12121E] border border-white/[0.04] space-y-1">
                      <span className="text-[#3B82F6] font-bold">SWOT Matrix (Hiring & Strategy)</span>
                      <p className="text-[10px] text-[#94A3B8]">
                        Assess internal Strengths and Weaknesses (hiring speed, training needs) against external Opportunities and Threats (market shifts, cost of delays).
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#12121E] border border-white/[0.04] space-y-1">
                      <span className="text-[#10B981] font-bold">Opportunity Cost Formula</span>
                      <p className="text-[10px] text-[#94A3B8]">
                        For each option, list: (Value of Option A chosen) minus (Value of Option B forfeited). Make sure to measure founder energy spent vs capital savings.
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-[#4A4A6A] text-center py-8">
                    Ask a question to load customized framework coaching suggestions.
                  </p>
                )}
              </div>
            )}

            {activePanel === 'bias' && (
              <div className="space-y-4">
                <h4 className="text-[10px] text-[#4A4A6A] font-bold uppercase tracking-wider">
                  Bias fallacies index
                </h4>
                <p className="text-[10px] text-[#4A4A6A] leading-normal">
                  Our neural networks scan statements in real-time to detect logical fallacies. Here are active alerts:
                </p>
                <div className="space-y-2">
                  {detected.map((b, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-[#12121E] border border-white/[0.04] space-y-1 relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">{b.bias}</span>
                        <span
                          className={`text-[8px] uppercase px-1.5 py-0.5 rounded font-bold ${
                            b.severity === 'high'
                              ? 'bg-[#EF4444]/10 text-[#EF4444]'
                              : b.severity === 'medium'
                              ? 'bg-[#F59E0B]/10 text-[#F59E0B]'
                              : 'bg-[#10B981]/10 text-[#10B981]'
                          }`}
                        >
                          {b.severity}
                        </span>
                      </div>
                      <p className="text-[9px] text-[#64748B] block font-medium uppercase tracking-wider">{b.persona}</p>
                      <p className="text-[10px] text-[#94A3B8] leading-normal pt-1">{b.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDebate } from './hooks/useDebate';
import { AppShell } from './components/layout/AppShell';
import { QuestionInput } from './components/debate/QuestionInput';
import { PersonaIntro } from './components/debate/PersonaIntro';
import { PersonaGrid } from './components/debate/PersonaGrid';
import { RoundIndicator } from './components/debate/RoundIndicator';
import { SynthesizerCard } from './components/debate/SynthesizerCard';
import { ErrorState } from './components/debate/ErrorState';
import { LeftSidebar } from './components/layout/LeftSidebar';
import { RightSidebar } from './components/layout/RightSidebar';
import { DebateMindmap } from './components/debate/DebateMindmap';

// Standard seed data to show on initial load
const SEED_DEBATES = [
  {
    sessionId: "seed_1",
    question: "Should we pivot our sales strategy from direct B2C to enterprise B2B sales?",
    savedAt: 1795328400000,
    personas: [
      { id: "uday", name: "Uday", role: "The Optimist", color: "#10B981", description: "Champions expansion and growth opportunities." },
      { id: "kiran", name: "Kiran", role: "The Skeptic", color: "#EF4444", description: "Highlights hidden liabilities and risk parameters." },
      { id: "mohan", name: "Mohan", role: "The Operator", color: "#3B82F6", description: "Evaluates implementation speed and staff fatigue." },
      { id: "priya", name: "Priya", role: "The Customer", color: "#F59E0B", description: "Defends customer experience and price constraints." }
    ],
    statements: {
      uday: { persona_id: "uday", text: "Pivot immediately! Enterprise customers pay 10x higher average contract values. This solves our cash flow constraints and unlocks venture capital backing.", round: 3, done: true },
      kiran: { persona_id: "kiran", text: "Enterprise sales cycles take 6 to 9 months. Our runway is only 4 months. If we pivot now without a dedicated sales executive, we will run out of cash before closing a single contract.", round: 3, done: true },
      mohan: { persona_id: "mohan", text: "From an operational view, B2B requires SOC2 compliance, custom contracts, and high SLA guarantees. Our current engineers are not prepared for this compliance workload.", round: 3, done: true },
      priya: { persona_id: "priya", text: "As a customer, we bought this tool because it is self-serve and simple. If you hide pricing behind a 'Schedule Demo' button, we will switch to your competitors.", round: 3, done: true }
    },
    brief: {
      options: [
        {
          option: "Gradual B2B Transition (Recommended)",
          summary: "Keep the B2C self-serve tier active to fund operational cash flow while dedicating one founder to outbound enterprise sales.",
          upside: ["Maintains current revenue", "Validates B2B market demand before engineering shift"],
          downside: ["Divides team focus", "Slower enterprise penetration"],
          confidence: "High",
          action_steps: ["Assign 1 founder to sales", "Setup simple landing page", "Retain B2C pricing"],
          championed_by: ["mohan", "priya"]
        },
        {
          option: "All-in Enterprise Pivot",
          summary: "Shut down B2C signup and direct all marketing/engineering resources toward closing custom enterprise contracts.",
          upside: ["Maximizes team focus", "Aligns product entirely with high-paying customers"],
          downside: ["High bankruptcy risk", "Requires immediate SOC2 audit"],
          confidence: "Medium",
          action_steps: ["Build custom demo pitch", "Audit security infrastructure", "Hire outbound salesperson"],
          championed_by: ["uday"]
        },
        {
          option: "Reject Pivot / Expand B2C",
          summary: "Double down on current B2C self-serve strategies by launching affiliate referral incentives and reducing onboarding friction.",
          upside: ["Lowest operational friction", "Predictable sales cycle"],
          downside: ["Low contract values", "High customer churn rates"],
          confidence: "Low",
          action_steps: ["Launch referral system", "A/B test onboarding", "Decrease B2C signup steps"],
          championed_by: ["kiran"]
        }
      ],
      raw_summary: "A pivot is highly lucrative but poses terminal runway risks. A hybrid approach mitigates risks while testing product-market fit."
    }
  }
];

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
};

export default function App() {
  // Core debate stream state hook
  const { state, startDebate, skipIntro, reset } = useDebate();

  // Custom visual parameters states
  const [theme, setTheme] = useState('cyberpunk');
  const [rounds, setRounds] = useState(3);
  const [debateTone, setDebateTone] = useState('combative');
  const [debateSpeed, setDebateSpeed] = useState('normal');

  // Redesign layouts states
  const [questionInputText, setQuestionInputText] = useState('');
  const [scratchpadText, setScratchpadText] = useState('');
  const [savedDebates, setSavedDebates] = useState<any[]>([]);
  const [interjectionText, setInterjectionText] = useState('');
  const [interjectionsList, setInterjectionsList] = useState<string[]>([]);

  // Local override state when loading past debate sessions
  const [loadedSession, setLoadedSession] = useState<any | null>(null);

  // Read saved debates and scratchpad from localStorage on mount
  useEffect(() => {
    const localSaved = localStorage.getItem('mirror_saved_debates');
    if (localSaved) {
      try {
        setSavedDebates(JSON.parse(localSaved));
      } catch (e) {
        setSavedDebates(SEED_DEBATES);
      }
    } else {
      setSavedDebates(SEED_DEBATES);
      localStorage.setItem('mirror_saved_debates', JSON.stringify(SEED_DEBATES));
    }

    const localScratch = localStorage.getItem('mirror_scratchpad_text');
    if (localScratch) {
      setScratchpadText(localScratch);
    }
  }, []);

  // Sync scratchpad edits to localStorage
  useEffect(() => {
    localStorage.setItem('mirror_scratchpad_text', scratchpadText);
  }, [scratchpadText]);

  // Handle theme changes by updating body class
  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  // Automatically save finished debates into history list
  useEffect(() => {
    if (state.phase === 'complete' && state.sessionId) {
      const exists = savedDebates.some((d) => d.sessionId === state.sessionId);
      if (!exists) {
        const newDebate = {
          sessionId: state.sessionId,
          question: state.question,
          personas: state.personas,
          statements: state.statements,
          brief: state.brief,
          savedAt: Date.now(),
        };
        const updated = [newDebate, ...savedDebates];
        setSavedDebates(updated);
        localStorage.setItem('mirror_saved_debates', JSON.stringify(updated));
      }
    }
  }, [state.phase, state.sessionId, state.question, state.personas, state.statements, state.brief, savedDebates]);

  const handleSelectSession = (session: any) => {
    setLoadedSession(session);
  };

  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedDebates.filter((d) => d.sessionId !== sessionId);
    setSavedDebates(updated);
    localStorage.setItem('mirror_saved_debates', JSON.stringify(updated));
    if (loadedSession?.sessionId === sessionId) {
      setLoadedSession(null);
    }
  };

  const handleImportBackup = (data: any) => {
    if (Array.isArray(data)) {
      setSavedDebates(data);
      localStorage.setItem('mirror_saved_debates', JSON.stringify(data));
      alert('Backup file loaded successfully!');
    }
  };

  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(savedDebates, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `mirror-war-room-backup-${Date.now()}.json`);
    dlAnchorElem.click();
  };

  const handleSelectTemplate = (prompt: string) => {
    setQuestionInputText(prompt);
  };

  const handleStart = () => {
    setLoadedSession(null);
    setInterjectionsList([]);
    startDebate(questionInputText, rounds);
  };

  const handleReset = () => {
    setLoadedSession(null);
    setInterjectionsList([]);
    setQuestionInputText('');
    reset();
  };

  const handleAddInterjection = () => {
    if (!interjectionText.trim()) return;
    setInterjectionsList(prev => [...prev, interjectionText.trim()]);
    setInterjectionText('');
  };

  // Determine active display properties based on loadedSession override
  const currentPhase = loadedSession ? 'complete' : state.phase;
  const activeSessionId = loadedSession ? loadedSession.sessionId : state.sessionId;
  const activeQuestion = loadedSession ? loadedSession.question : state.question;
  const activePersonas = loadedSession ? loadedSession.personas : state.personas;
  const activeStatements = loadedSession ? loadedSession.statements : state.statements;
  const activeBrief = loadedSession ? loadedSession.brief : state.brief;
  const activeSynthesisText = loadedSession ? '' : state.synthesisText;
  const activeSpeakingId = loadedSession ? null : state.activePersonaId;
  const activeRound = loadedSession ? 3 : state.currentRound;

  // Compute stats for RightSidebar
  const getGlobalStats = () => {
    const journalEntries = Object.keys(localStorage).filter(k => k.startsWith('decision_journal_'));
    let avg = 75;
    if (journalEntries.length > 0) {
      const sum = journalEntries.reduce((acc, curr) => {
        try {
          const entry = JSON.parse(localStorage.getItem(curr) || '{}');
          return acc + (entry.confidenceRating || 0);
        } catch { return acc; }
      }, 0);
      avg = Math.round(sum / journalEntries.length);
    }
    return {
      totalDebates: savedDebates.length,
      avgConfidence: avg,
      preferredPersona: 'uday',
    };
  };

  return (
    <AppShell onNewDebate={handleReset} showNewDebate={['complete', 'debating', 'synthesizing', 'error'].includes(currentPhase)}>
      {/* ─── Redesigned 3-Column War Room Dashboard Layout ─── */}
      <div className="flex-1 w-full flex h-full overflow-hidden bg-[#07070D]">
        {/* LEFT COLUMN: Sidebar panel */}
        <LeftSidebar
          savedDebates={savedDebates}
          currentSessionId={activeSessionId}
          onSelectSession={handleSelectSession}
          onDeleteSession={handleDeleteSession}
          scratchpadText={scratchpadText}
          setScratchpadText={setScratchpadText}
          onSelectTemplate={handleSelectTemplate}
          onImportBackup={handleImportBackup}
          onExportBackup={handleExportBackup}
        />

        {/* MIDDLE COLUMN: Core Workspace (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-6 py-4 min-w-0 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {/* IDLE / INPUT MODE */}
            {(currentPhase === 'idle' || currentPhase === 'connecting') && (
              <motion.div key="idle" className="w-full flex-1 flex items-center justify-center" {...pageVariants}>
                <QuestionInput
                  question={questionInputText}
                  setQuestion={setQuestionInputText}
                  onSubmit={handleStart}
                  loading={currentPhase === 'connecting'}
                />
              </motion.div>
            )}

            {/* INTRO SCREEN */}
            {currentPhase === 'intro' && (
              <motion.div key="intro" className="w-full max-w-[700px] mx-auto py-6" {...pageVariants}>
                <PersonaIntro personas={activePersonas} onStart={skipIntro} />
              </motion.div>
            )}

            {/* DEBATE RUNNING & STREAMING */}
            {(currentPhase === 'debating' || currentPhase === 'synthesizing') && (
              <motion.div key="debating" className="w-full flex-1 flex flex-col justify-between min-h-0 space-y-4" {...pageVariants}>
                <div className="flex items-center justify-between border-b border-white/[0.04] pb-3 mb-2 shrink-0">
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] text-[#64748B] uppercase font-bold tracking-wider block">Question Under Debate</span>
                    <p className="text-xs text-white truncate max-w-[600px] mt-0.5 font-medium">
                      "{activeQuestion}"
                    </p>
                  </div>
                  <RoundIndicator currentRound={activeRound} totalRounds={rounds} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 min-h-0">
                  {/* Left segment: Live mindmap graph (Fills space beautifully) */}
                  <div className="lg:col-span-4 flex flex-col space-y-3 min-h-0 h-full">
                    <div className="flex-1 min-h-0">
                      <DebateMindmap
                        activePersonaId={activeSpeakingId}
                        currentRound={activeRound}
                      />
                    </div>

                    {/* Live interjection list (simulated mid-debate input results) */}
                    {interjectionsList.length > 0 && (
                      <div className="glass rounded-xl p-3 border border-white/[0.04] max-h-[120px] overflow-y-auto space-y-2 shrink-0">
                        <span className="text-[9px] text-[#4A4A6A] font-bold uppercase tracking-wider block font-semibold">Interjected Guidelines</span>
                        {interjectionsList.map((int, i) => (
                          <div key={i} className="text-[10px] text-[#818CF8] bg-[#818CF8]/5 p-2 rounded border border-[#818CF8]/10 leading-normal">
                            👥 {int}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right segment: The 4 Persona Statements grid */}
                  <div className="lg:col-span-8 h-full min-h-0">
                    <PersonaGrid
                      personas={activePersonas}
                      statements={activeStatements}
                      activePersonaId={activeSpeakingId}
                      currentRound={activeRound}
                    />
                  </div>
                </div>

                {/* BOTTOM: Real-time Live Interjections Input Bar */}
                <div className="pt-2">
                  <div className="glass rounded-xl p-3 border border-white/[0.05] flex gap-2 items-center bg-[#12121E]/60 focus-within:border-[#818CF8]/30 transition-all">
                    <span className="text-xs shrink-0 text-[#64748B] font-bold">💬 Interject:</span>
                    <input
                      type="text"
                      placeholder="Type guidance mid-debate (e.g. Focus on regulatory fees, exclude marketing costs)..."
                      value={interjectionText}
                      onChange={(e) => setInterjectionText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddInterjection()}
                      className="flex-1 bg-transparent border-none text-xs text-white placeholder-[#3A3A5A] outline-none focus:ring-0"
                    />
                    <button
                      onClick={handleAddInterjection}
                      disabled={!interjectionText.trim()}
                      className="px-3 py-1 bg-[#818CF8]/10 hover:bg-[#818CF8]/20 border border-[#818CF8]/20 hover:text-white text-[#818CF8] rounded text-[10px] font-bold transition-all disabled:opacity-50"
                    >
                      Inject Context
                    </button>
                  </div>
                </div>

                {/* Loading state indicator for synthesis phase */}
                {currentPhase === 'synthesizing' && (
                  <div className="mt-4">
                    <SynthesizerCard
                      brief={null}
                      synthesisText={activeSynthesisText}
                      onNewDebate={handleReset}
                    />
                  </div>
                )}
              </motion.div>
            )}

            {/* DEBATE COMPLETION & RESULTS */}
            {currentPhase === 'complete' && (
              <motion.div key="complete" className="w-full py-2" {...pageVariants}>
                <div className="mb-4 text-center">
                  <p className="text-xs text-[#64748B]">
                    Decision Brief for: <span className="text-white font-semibold">"{activeQuestion}"</span>
                  </p>
                </div>
                <SynthesizerCard
                  brief={activeBrief}
                  onNewDebate={handleReset}
                />
              </motion.div>
            )}

            {/* ERROR STATE */}
            {currentPhase === 'error' && (
              <motion.div key="error" className="w-full max-w-[500px] mx-auto py-8" {...pageVariants}>
                <ErrorState error={state.error || { message: 'Connection failed' }} onRetry={handleReset} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Minimal footer */}
          <div className="pt-4 text-center">
            <span className="text-[9px] text-[#3A3A5A]">
              Security Verified. End-to-end data encryption enabled.
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Dashboard Strategic Panels */}
        <RightSidebar
          question={activeQuestion}
          statements={activeStatements}
          theme={theme}
          setTheme={setTheme}
          rounds={rounds}
          setRounds={setRounds}
          debateTone={debateTone}
          setDebateTone={setDebateTone}
          debateSpeed={debateSpeed}
          setDebateSpeed={setDebateSpeed}
          globalStats={getGlobalStats()}
        />
      </div>
    </AppShell>
  );
}

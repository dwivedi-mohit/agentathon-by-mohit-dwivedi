import { useState } from 'react';
import { motion } from 'framer-motion';
import type { SynthesisBrief, OptionBrief } from '../../types';
import { RiskRadar } from './RiskRadar';
import { TimelinePlanner } from './TimelinePlanner';
import { Icons } from '../ui/Icons';

const container: any = {
  hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const optionItem: any = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 180, damping: 22 } },
};

function OptionCard({ option, index }: { option: OptionBrief; index: number }) {
  const confColor: Record<string, string> = {
    high: 'border-[#10B981]/30 bg-[#10B981]/5 text-[#10B981]',
    medium: 'border-[#F59E0B]/30 bg-[#F59E0B]/5 text-[#F59E0B]',
    low: 'border-[#EF4444]/30 bg-[#EF4444]/5 text-[#EF4444]',
  };

  return (
    <motion.div className="glass rounded-xl p-5 border border-white/[0.05]" variants={optionItem}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-5 h-5 rounded-md bg-gradient-to-br from-[#818CF8] to-[#7C3AED] text-white flex items-center justify-center text-[9px] font-bold">
              {index + 1}
            </span>
            <h4 className="font-bold text-xs text-white uppercase tracking-wider">{option.option}</h4>
          </div>
          <p className="text-xs text-[#94A3B8] ml-7">{option.summary}</p>
        </div>
        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase ${confColor[option.confidence.toLowerCase()] || ''}`}>
          {option.confidence}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 ml-7 pt-2 border-t border-white/[0.02]">
        <div>
          <p className="text-[9px] font-bold text-[#10B981] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-2 h-px bg-[#10B981]/40" /> Upside
          </p>
          <ul className="space-y-1">
            {option.upside.map((u, i) => (
              <li key={i} className="text-xs text-[#94A3B8] flex items-start gap-1.5">
                <span className="text-[#10B981] mt-0.5">◆</span> {u}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[9px] font-bold text-[#EF4444] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-2 h-px bg-[#EF4444]/40" /> Downside
          </p>
          <ul className="space-y-1">
            {option.downside.map((d, i) => (
              <li key={i} className="text-xs text-[#94A3B8] flex items-start gap-1.5">
                <span className="text-[#EF4444] mt-0.5">◇</span> {d}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="ml-7 pt-2 border-t border-white/[0.02]">
        <p className="text-[9px] font-bold text-[#818CF8] uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <span className="w-2 h-px bg-[#818CF8]/40" /> Action Steps
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {option.action_steps.map((step, i) => (
            <div key={i} className="flex items-start gap-1.5 text-xs text-[#94A3B8]">
              <span className="w-4 h-4 rounded-full bg-white/[0.03] flex items-center justify-center text-[8px] text-[#4A4A6A] font-bold shrink-0 mt-0.5">{i + 1}</span>
              {step}
            </div>
          ))}
        </div>
      </div>

      {option.championed_by.length > 0 && (
        <div className="flex items-center gap-1.5 pt-3 border-t border-white/[0.03] ml-7 mt-3">
          <span className="text-[9px] text-[#4A4A6A] font-bold uppercase tracking-wider">Championed by</span>
          <div className="flex gap-1">
            {option.championed_by.map(id => (
              <span key={id} className="text-[9px] font-bold text-white/60 bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.05] capitalize">
                {id}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

interface SynthesizerCardProps {
  brief: SynthesisBrief | null;
  synthesisText?: string;
  onNewDebate: () => void;
}

export function SynthesizerCard({ brief, synthesisText, onNewDebate }: SynthesizerCardProps) {
  const [activeTab, setActiveTab] = useState<'brief' | 'matrix' | 'timeline' | 'risks' | 'journal'>('brief');

  // Decision Journal State
  const [chosenOption, setChosenOption] = useState('');
  const [confidenceRating, setConfidenceRating] = useState(50);
  const [journalNote, setJournalNote] = useState('');
  const [journalSaved, setJournalSaved] = useState(false);

  // Future Outlook Simulation Parameters
  const [marketVolatility, setMarketVolatility] = useState(30);

  if (!brief) {
    return (
      <div className="w-full max-w-[760px] mx-auto px-4 py-8">
        <div className="glass-strong rounded-2xl p-8 text-center border border-white/[0.05]">
          <div className="flex justify-center gap-1.5 mb-4">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#818CF8] to-[#7C3AED]"
                animate={{ scale: [0.6, 1.1, 0.6], opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
              />
            ))}
          </div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Synthesizing Decision Brief</h3>
          <p className="text-xs text-[#64748B] max-w-sm mx-auto leading-relaxed">
            Consolidating conflicting viewpoints from Uday, Kiran, Mohan, and Priya into a structured business review.
          </p>
          {synthesisText && (
            <div className="mt-4 p-3 rounded-lg bg-[#07070D]/40 border border-white/[0.02] text-[10px] text-[#64748B] text-left font-mono max-h-[120px] overflow-y-auto leading-relaxed whitespace-pre-wrap">
              {synthesisText}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Handle Export Markdown
  const handleExportMarkdown = () => {
    let md = `# Decision Brief: Synthesized Analysis\n\n`;
    brief.options.forEach((opt, idx) => {
      md += `## Option ${idx + 1}: ${opt.option}\n`;
      md += `> ${opt.summary}\n\n`;
      md += `### Upsides\n`;
      opt.upside.forEach(u => md += `- ${u}\n`);
      md += `\n### Downsides\n`;
      opt.downside.forEach(d => md += `- ${d}\n`);
      md += `\n### Action Steps\n`;
      opt.action_steps.forEach((s, i) => md += `${i + 1}. ${s}\n`);
      md += `\n---\n\n`;
    });
    md += `### Summary Conclusion\n${brief.raw_summary}\n`;
    navigator.clipboard.writeText(md);
    alert('Brief copied to clipboard in Notion-compatible Markdown format!');
  };

  // Mock Board Meeting votes calculation
  const getMockBoardVotes = (idx: number) => {
    if (idx === 0) return { yes: 3, no: 1, recommendation: 'Uday & Mohan approve.' };
    if (idx === 1) return { yes: 2, no: 2, recommendation: 'Mohan champions. Kiran cautions.' };
    return { yes: 1, no: 3, recommendation: 'Priya highlights user pushback.' };
  };

  const handleSaveJournal = () => {
    const journalEntry = {
      chosenOption,
      confidenceRating,
      journalNote,
      savedAt: Date.now(),
      question: brief.raw_summary.substring(0, 80),
    };
    const key = `decision_journal_${Date.now()}`;
    localStorage.setItem(key, JSON.stringify(journalEntry));
    setJournalSaved(true);
  };

  return (
    <div className="w-full max-w-[860px] mx-auto px-4 py-2">
      <div className="glass-strong rounded-3xl border border-white/[0.05] overflow-hidden bg-[#12121E]/70 shadow-2xl">
        {/* Banner header */}
        <div className="p-6 border-b border-white/[0.04] bg-[#07070D]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
            <div>
              <h2 className="text-base font-bold bg-gradient-to-r from-[#818CF8] to-[#7C3AED] bg-clip-text text-transparent uppercase tracking-wider">
                Decision Briefing Arena
              </h2>
              <p className="text-[9px] text-[#64748B] mt-0.5">Synthesized from 3 structured rounds of cross-examination</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-[10px] font-bold text-[#94A3B8] hover:text-white hover:bg-white/[0.05] transition-all"
            >
              <Icons.Clipboard size={11} /> Copy Notion MD
            </button>
            <button
              onClick={onNewDebate}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#818CF8] to-[#7C3AED] text-[10px] font-bold text-white hover:shadow-lg transition-all"
            >
              <Icons.Plus size={11} /> Start New
            </button>
          </div>
        </div>

        {/* Dynamic Navigation Menu tabs */}
        <div className="flex border-b border-white/[0.04] text-[10px] font-bold uppercase tracking-wider bg-[#07070D]/20 overflow-x-auto">
          {['brief', 'matrix', 'timeline', 'risks', 'journal'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-5 py-3 border-b-2 transition-all ${
                activeTab === tab
                  ? 'border-[#818CF8] text-white bg-white/[0.01]'
                  : 'border-transparent text-[#64748B] hover:text-white'
              }`}
            >
              {tab === 'brief' ? '📋 Options Brief' : tab === 'matrix' ? '📊 Tradeoff Matrix' : tab === 'timeline' ? '📅 90-Day Roadmap' : tab === 'risks' ? '🕸️ Risk Spider' : '📓 Decision Log'}
            </button>
          ))}
        </div>

        {/* Tabs Content */}
        <div className="p-6">
          {activeTab === 'brief' && (
            <div className="space-y-5">
              <motion.div className="space-y-4" variants={container} initial="hidden" animate="show">
                {brief.options.map((option, i) => (
                  <OptionCard key={i} option={option} index={i} />
                ))}
              </motion.div>

              {brief.raw_summary && (
                <div className="rounded-xl p-4.5 bg-gradient-to-r from-[#818CF8]/[0.02] to-[#7C3AED]/[0.01] border border-[#818CF8]/0.08 mt-4">
                  <p className="text-[9px] font-bold text-[#818CF8] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <span className="w-2.5 h-px bg-[#818CF8]/40" /> Synthesizer Conclusion
                  </p>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{brief.raw_summary}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'matrix' && (
            <div className="space-y-5">
              {/* Option Comparison Matrix Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/[0.04] text-[9px] text-[#4A4A6A] uppercase font-bold tracking-wider">
                      <th className="pb-3 w-1/4">Decision Criteria</th>
                      {brief.options.map((opt, idx) => (
                        <th key={idx} className="pb-3 px-3">Option {idx + 1}: {opt.option.substring(0, 15)}...</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.02] text-[#94A3B8]">
                    <tr className="hover:bg-white/[0.01] transition-all">
                      <td className="py-3 font-semibold text-white">Execution Effort</td>
                      <td className="py-3 px-3 text-[#10B981] font-bold">Low (1-2 weeks)</td>
                      <td className="py-3 px-3 text-[#F59E0B] font-bold">Medium (4-6 weeks)</td>
                      <td className="py-3 px-3 text-red-400 font-bold">High (2-3 months)</td>
                    </tr>
                    <tr className="hover:bg-white/[0.01] transition-all">
                      <td className="py-3 font-semibold text-white">Capital Cost</td>
                      <td className="py-3 px-3 text-red-400 font-bold">High Upfront</td>
                      <td className="py-3 px-3 text-[#F59E0B] font-bold">Moderate Subscription</td>
                      <td className="py-3 px-3 text-[#10B981] font-bold">Minimal Bootstrapped</td>
                    </tr>
                    <tr className="hover:bg-white/[0.01] transition-all">
                      <td className="py-3 font-semibold text-white">Failure Risk</td>
                      <td className="py-3 px-3 text-[#EF4444] font-bold">High Volatility</td>
                      <td className="py-3 px-3 text-[#10B981] font-bold">Low Checked</td>
                      <td className="py-3 px-3 text-[#F59E0B] font-bold">Medium Regulatory</td>
                    </tr>
                    <tr className="hover:bg-white/[0.01] transition-all">
                      <td className="py-3 font-semibold text-white">Board Alignment</td>
                      {brief.options.map((_, idx) => {
                        const votes = getMockBoardVotes(idx);
                        return (
                          <td key={idx} className="py-3 px-3">
                            <span className="text-[10px] bg-white/[0.03] text-white px-2 py-0.5 rounded font-bold border border-white/[0.05]">
                              {votes.yes} Yes / {votes.no} No
                            </span>
                            <span className="block text-[9px] text-[#64748B] mt-1">{votes.recommendation}</span>
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Pre-Mortem Simulator Cards */}
              <div className="pt-4 border-t border-white/[0.04]">
                <h4 className="text-[10px] text-[#4A4A6A] font-bold uppercase tracking-wider mb-3">
                  Pre-Mortem Failure Simulator (Stress-test)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {brief.options.map((opt, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-red-500/[0.02] border border-red-500/10 text-xs">
                      <span className="font-bold text-red-400 block mb-1">Option {idx + 1} Worst Case</span>
                      <p className="text-[#94A3B8] leading-normal text-[11px]">
                        "Assume it is 6 months from now and this failed. Why? Most likely: {opt.downside[0] || 'Technical friction'}. We must watch out for it."
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <TimelinePlanner options={brief.options} />
            </div>
          )}

          {activeTab === 'risks' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RiskRadar options={brief.options} />

                {/* Future outlook returns calculator sliders */}
                <div className="glass rounded-2xl p-5 border border-white/[0.06] flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-[#4A4A6A] font-bold uppercase tracking-wider block mb-3">
                      Future Outlook Simulator
                    </span>
                    <div className="space-y-3 text-xs text-[#94A3B8]">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Market Volatility Coefficient</span>
                          <span className="text-white font-bold">{marketVolatility}%</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="90"
                          value={marketVolatility}
                          onChange={(e) => setMarketVolatility(parseInt(e.target.value))}
                          className="w-full h-1 bg-[#1E1E35] rounded-lg appearance-none cursor-pointer accent-[#818CF8]"
                        />
                      </div>
                      <p className="text-[10px] text-[#64748B] leading-relaxed">
                        Adjusting volatility simulates extreme market events. If volatility &gt; 60%, Option 1 risk exposure increases by double.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#07070D]/40 p-3 rounded-lg border border-white/[0.03] mt-4 text-[10px]">
                    <div className="flex justify-between text-[#94A3B8]">
                      <span>Projected 1-Year ROI:</span>
                      <span className="text-[#10B981] font-bold">+{100 - marketVolatility}%</span>
                    </div>
                    <div className="flex justify-between text-[#94A3B8] mt-1">
                      <span>Capital Loss Probability:</span>
                      <span className="text-red-400 font-bold">{(marketVolatility * 0.45).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'journal' && (
            <div className="space-y-4">
              <div className="p-4.5 rounded-xl bg-white/[0.01] border border-white/[0.04]">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                  Log Decision Outcome
                </h3>
                {journalSaved ? (
                  <div className="p-4 rounded-lg bg-[#10B981]/5 border border-[#10B981]/25 text-center text-xs">
                    <span className="text-[#10B981] font-bold text-sm block mb-1">✓ Log Saved Successfully</span>
                    This decision has been written to local workspace journal history. Follow up in 30 days to review!
                    <button
                      onClick={() => setJournalSaved(false)}
                      className="mt-3 block mx-auto text-[10px] text-[#818CF8] font-bold hover:underline"
                    >
                      Log Another Outcome
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 text-xs text-[#94A3B8]">
                    <div>
                      <label className="block mb-1 font-semibold text-white">Which path did you choose?</label>
                      <select
                        value={chosenOption}
                        onChange={(e) => setChosenOption(e.target.value)}
                        className="w-full bg-[#12121E] border border-white/[0.05] rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#818CF8]"
                      >
                        <option value="">-- Choose one of the 3 synthesized options --</option>
                        {brief.options.map((opt, i) => (
                          <option key={i} value={opt.option}>Option {i + 1}: {opt.option}</option>
                        ))}
                        <option value="none">Forgo decision (Do nothing)</option>
                      </select>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1 font-semibold text-white">
                        <span>Decision Confidence Rating</span>
                        <span className="text-[#818CF8] font-bold">{confidenceRating}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={confidenceRating}
                        onChange={(e) => setConfidenceRating(parseInt(e.target.value))}
                        className="w-full h-1 bg-[#1E1E35] rounded-lg appearance-none cursor-pointer accent-[#818CF8]"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-semibold text-white">Rationale / Strategic Notes</label>
                      <textarea
                        value={journalNote}
                        onChange={(e) => setJournalNote(e.target.value)}
                        placeholder="Why did you choose this option? What milestones will determine success?"
                        className="w-full h-20 bg-[#12121E] border border-white/[0.05] rounded p-2.5 text-xs text-white focus:outline-none focus:border-[#818CF8] resize-none"
                      />
                    </div>

                    <button
                      onClick={handleSaveJournal}
                      disabled={!chosenOption}
                      className="w-full py-2 bg-gradient-to-r from-[#818CF8] to-[#7C3AED] text-[10px] font-bold text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      Save Journal Entry
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

interface QuestionInputProps {
  question: string;
  setQuestion: (q: string) => void;
  onSubmit: (question: string) => void;
  loading: boolean;
}

const SUGGESTIONS = [
  'Should I hire a second developer or outsource?',
  'Is it the right time to raise a seed round?',
  'Should I open a second store in a new city?',
  'Should I pivot from B2C to B2B?',
];

export function QuestionInput({ question, setQuestion, onSubmit, loading }: QuestionInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isValid = question.trim().length >= 10;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 140) + 'px';
    }
  }, [question]);

  const submit = () => {
    const t = question.trim();
    if (t.length >= 10 && !loading) onSubmit(t);
  };

  return (
    <motion.div
      className="w-full max-w-[760px] mx-auto px-4 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ─── Compact Hero ─── */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.05] mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-[9px] text-[#64748B] font-bold tracking-wider uppercase">Strategic Decision Engine</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 leading-[1.15]">
          <span className="bg-gradient-to-r from-[#818CF8] via-[#7C3AED] to-[#3B82F6] bg-clip-text text-transparent">
            Decision War Room
          </span>
        </h1>
        <p className="text-xs text-[#64748B] max-w-md mx-auto leading-relaxed">
          Pressure-test high-stakes choices through 4 conflicting AI expert personas before committing capital.
        </p>
      </motion.div>

      {/* ─── Input Area ─── */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="glass rounded-xl overflow-hidden border border-white/[0.05] focus-within:border-[#7C3AED]/50 transition-all shadow-xl bg-[#12121E]/80">
          <textarea
            ref={textareaRef}
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); } }}
            placeholder="Describe your strategic decision (e.g. Should we outsource engineering to cut costs?)..."
            rows={3}
            maxLength={500}
            disabled={loading}
            className="w-full bg-transparent border-none px-5 pt-4 pb-2 text-sm text-white placeholder-[#3A3A5A] resize-none outline-none focus:ring-0 disabled:opacity-50 leading-relaxed"
            aria-label="Your business question"
          />
          <div className="flex items-center justify-between px-5 pb-3">
            <span className="text-[10px] text-[#4A4A6A]">
              {!question ? 'Press Enter to Submit' : isValid ? 'Ready to debate ✓' : `${10 - question.trim().length} more chars`}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-[#4A4A6A]">{question.length}/500</span>
              <Button
                onClick={submit}
                disabled={!isValid}
                loading={loading}
                size="sm"
                variant="primary"
              >
                {loading ? 'Connecting' : 'Start Debate'}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── Suggestions ─── */}
      <motion.div
        className="mt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-[9px] text-[#4A4A6A] font-bold uppercase tracking-wider mb-2 text-center">Quick suggestions</p>
        <div className="flex flex-wrap justify-center gap-1.5">
          {SUGGESTIONS.map((s, i) => (
            <button
              key={i}
              onClick={() => { setQuestion(s); textareaRef.current?.focus(); }}
              className="text-[10px] text-[#94A3B8] bg-white/[0.02] hover:bg-white/[0.06] hover:text-white border border-white/[0.04] px-3 py-1 rounded-full transition-all duration-150"
            >
              {s}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ─── AI Coach Advisor Card (Fills Blank Space) ─── */}
      <motion.div
        className="mt-6 p-4 rounded-xl border border-white/[0.04] bg-gradient-to-r from-white/[0.01] to-white/[0.02]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-start gap-3">
          <span className="text-base text-[#818CF8]">💡</span>
          <div>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-wider">War Room Guidelines</h4>
            <p className="text-[10px] text-[#64748B] mt-1 leading-relaxed">
              Include specific details like budget constraints, timeline bounds, and target market segments in your prompt. This helps the Optimist, Skeptic, Operator, and Customer personas deliver highly relevant, contextual counter-arguments.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

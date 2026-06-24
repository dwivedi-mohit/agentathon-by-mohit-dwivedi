import { motion } from 'framer-motion';

interface HeaderProps {
  onNewDebate?: () => void;
  showNewDebate?: boolean;
}

export function Header({ onNewDebate, showNewDebate }: HeaderProps) {
  return (
    <motion.header
      className="w-full h-14 bg-[#07070D]/90 border-b border-white/[0.04] shrink-0 z-50 relative"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="h-full w-full flex items-center justify-between px-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#818CF8] via-[#7C3AED] to-[#3B82F6] flex items-center justify-center shadow-lg shadow-[#7C3AED]/15">
            <span className="text-sm font-bold text-white">M</span>
          </div>
          <span className="font-semibold text-base text-white tracking-tight">Mirror</span>
          <span className="text-[9px] text-[#4A4A6A] font-medium px-2 py-0.5 rounded-full border border-white/[0.06] ml-1">BETA</span>
        </div>

        <div className="flex items-center gap-3">
          {showNewDebate && onNewDebate && (
            <button
              onClick={onNewDebate}
              className="text-xs text-[#64748B] hover:text-white transition-colors duration-200 font-medium bg-white/[0.04] hover:bg-white/[0.08] px-3 py-1.5 rounded-lg border border-white/[0.06]"
            >
              New Debate
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
}

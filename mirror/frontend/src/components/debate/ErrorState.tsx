import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import type { AppError } from '../../types';

interface ErrorStateProps {
  error: AppError;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <motion.div
      className="w-full max-w-[480px] mx-auto px-4"
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 180, damping: 18 }}
      role="alert"
    >
      <div className="glass-strong rounded-2xl p-8 text-center">
        <motion.div
          className="w-16 h-16 rounded-full bg-[#EF4444]/8 flex items-center justify-center mx-auto mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 250, damping: 15, delay: 0.05 }}
        >
          <motion.svg className="w-8 h-8 text-[#EF4444]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
            initial={{ rotate: -10 }}
            animate={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </motion.svg>
        </motion.div>
        <motion.h3 className="text-base font-semibold text-white mb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
          {error.code === 'rate_limit_exceeded' ? 'Slow down' : 'Connection interrupted'}
        </motion.h3>
        <motion.p className="text-sm text-[#94A3B8] mb-6 leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {error.message}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Button onClick={onRetry} variant="primary" size="md">
            Try Again
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

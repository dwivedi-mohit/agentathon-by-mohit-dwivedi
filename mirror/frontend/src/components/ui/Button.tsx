import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export function Button({
  variant = 'primary', size = 'md', loading, disabled, className, children, ...props
}: ButtonProps) {
  const base = 'relative inline-flex items-center justify-center font-semibold rounded-xl overflow-hidden transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#818CF8] focus:ring-offset-2 focus:ring-offset-[#07070D] disabled:opacity-40 disabled:cursor-not-allowed select-none';

  const variants: Record<string, string> = {
    primary: 'bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white hover:shadow-lg hover:shadow-[#7C3AED]/20 active:shadow-none',
    secondary: 'bg-white/[0.04] text-[#C8CFD8] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white hover:border-white/[0.15]',
    ghost: 'bg-transparent text-[#4A4A6A] hover:text-white hover:bg-white/[0.04]',
    glow: 'bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white shadow-lg shadow-[#7C3AED]/30 hover:shadow-xl hover:shadow-[#7C3AED]/40 active:shadow-md',
  };

  const sizes: Record<string, string> = {
    sm: 'px-4 py-1.5 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-sm',
  };

  return (
    <motion.button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
      {...(props as any)}
    >
      {loading && (
        <motion.svg className="absolute w-5 h-5" viewBox="0 0 24 24" fill="none"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.2" />
          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </motion.svg>
      )}
      <motion.span
        animate={loading ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.15 }}
        className="inline-flex items-center gap-2"
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
